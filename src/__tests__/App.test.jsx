import { describe, it, expect } from "vitest";
import { projects, featuredProjects } from "../data/projects";
import { ctaNavigation } from "../data/navigation";

const SUPPORTED_CATEGORIES = ["Backend", "Full Stack", "Frontend", "AI + IoT", "EdTech"];

describe("Portfolio application data contract", () => {
  it("runs the test suite successfully", () => {
    expect(true).toBe(true);
  });

  it("routes to the internal /resume page, not a missing PDF", () => {
    expect(ctaNavigation.secondary.href).toBe("/resume");
    expect(ctaNavigation.secondary.name).toBe("View Resume");
  });

  it("featured projects link to real source code", () => {
    featuredProjects.forEach((project) => {
      expect(project.github).toBeTruthy();
    });
  });

  it("every project live URL is absolute http(s)", () => {
    projects.forEach((project) => {
      if (project.live) expect(project.live).toMatch(/^https?:\/\//);
    });
  });

  it("uses only supported, canonical project categories", () => {
    projects.forEach((project) => {
      expect(SUPPORTED_CATEGORIES).toContain(project.category);
    });
    expect(projects.some((p) => p.category === "AI + IoT")).toBe(true);
  });
});