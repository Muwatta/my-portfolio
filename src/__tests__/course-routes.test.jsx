import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("course routes", () => {
  it("renders the courses page", async () => {
    render(
      <MemoryRouter initialEntries={["/courses"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Learn by building/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Backend Engineering Foundations/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Python Programming for Beginners/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Watch Python Programming for Beginners/i),
    ).toHaveAttribute("href", expect.stringContaining("youtube.com"));
  });

  it("renders a known course detail route", async () => {
    render(
      <MemoryRouter
        initialEntries={["/courses/backend-engineering-foundations"]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/What you will learn/i)).toBeInTheDocument();
  });
});
