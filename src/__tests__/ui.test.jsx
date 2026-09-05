import { beforeAll, beforeEach, describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { projects } from "../data/projects";

const renderApp = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );

describe("Portfolio UI (browser rendering)", () => {
  beforeAll(async () => {
    await Promise.all([
      import("../pages/Home"),
      import("../pages/Portfolio"),
      import("../pages/ProjectDetail"),
      import("../pages/NotFound"),
    ]);
  });

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  });

  it("renders the homepage with identity and navigation", async () => {
    renderApp(["/"]);
    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /Abdullahi Musliudeen/i,
      }),
    ).toBeInTheDocument();
    const logoLinks = await screen.findAllByRole("link", {
      name: /Muwatta home/i,
    });
    expect(logoLinks.length).toBeGreaterThan(0);
    const workLinks = await screen.findAllByRole("link", { name: /Work/i });
    expect(workLinks.length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /About/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /Writing/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /Let's Talk/i }).length,
    ).toBeGreaterThan(0);
  });

  it("toggles the theme from dark to light and back", async () => {
    renderApp(["/"]);
    const toggles = await screen.findAllByRole("button", {
      name: "Toggle theme",
    });
    expect(toggles.length).toBeGreaterThan(0);
    expect(document.documentElement.className).toContain("dark");
    fireEvent.click(toggles[0]);
    await waitFor(() =>
      expect(document.documentElement.className).not.toContain("dark"),
    );
    fireEvent.click(toggles[0]);
    await waitFor(() =>
      expect(document.documentElement.className).toContain("dark"),
    );
  });

  it("renders the portfolio grid with a case study link per project", async () => {
    renderApp(["/portfolio"]);
    expect(
      await screen.findByRole("heading", { name: /Everything I've Built/i }),
    ).toBeInTheDocument();
    const caseStudyLinks = await screen.findAllByRole("link", {
      name: /case study/i,
    });
    expect(caseStudyLinks.length).toBeGreaterThanOrEqual(projects.length);
  });

  it("loads a project case study with content sections", async () => {
    renderApp(["/portfolio/ssc-cooperative"]);
    expect(
      await screen.findByRole("heading", {
        name: /SSC Cooperative — Member & Loan Management/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "The Problem" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Solution" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Engineering" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Architecture" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tech Stack" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Outcome" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View Source Code/i }),
    ).toHaveAttribute(
      "href",
      "https://github.com/Muwatta/ssc-cooperative-system",
    );
  });

  it("renders a case study for a project without an image", async () => {
    renderApp(["/portfolio/shopcore"]);
    expect(
      await screen.findByRole("heading", {
        name: /ShopCore — E-commerce REST Backend/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Architecture" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View Source Code/i }),
    ).toHaveAttribute("href", "https://github.com/muwatta/ShopCore");
  });

  it("shows a not-found state for unknown project ids", async () => {
    renderApp(["/portfolio/not-a-real-project"]);
    expect(
      await screen.findByRole("heading", { name: /Project not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to Portfolio/i }),
    ).toBeInTheDocument();
  });

  it("shows the 404 page for unknown routes", async () => {
    renderApp(["/nowhere"]);
    expect(await screen.findByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Back to Home/i }),
    ).toBeInTheDocument();
  });

  it("navigates from a portfolio card into its case study", async () => {
    renderApp(["/portfolio"]);
    const caseStudyLinks = await screen.findAllByRole("link", {
      name: "Case Study",
    });
    expect(caseStudyLinks.length).toBeGreaterThan(0);
    fireEvent.click(caseStudyLinks[0]);
    expect(
      await screen.findByRole("heading", { name: /ATE Management System/i }),
    ).toBeInTheDocument();
  });
});
