import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { projects, featuredProjects, getProjectById } from "../data/projects";
import { ctaNavigation } from "../data/navigation";

const SUPPORTED_CATEGORIES = [
  "Backend",
  "Full Stack",
  "Frontend",
  "AI + IoT",
  "EdTech",
];

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
      expect(project.github).toMatch(/^https:\/\/github\.com\//);
    });
  });

  it("every project has unique ids and required fields", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(projects.length);
    projects.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.github).toMatch(/^https?:\/\//);
      expect(project.tech.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
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

  it("never references placeholder URLs or lorem text", () => {
    projects.forEach((project) => {
      expect(project.github).not.toMatch(
        /example\.com|your-|username|replace|lorem/i,
      );
      if (project.live) {
        expect(project.live).not.toMatch(/example\.com|your-|username/i);
      }
      if (project.image) {
        expect(project.image).not.toMatch(
          /placeholder|example\.com|via\.placeholder|430x230/i,
        );
      }
      if (project.problem) {
        expect(project.problem).not.toMatch(/lorem/i);
      }
    });
  });

  it("uses valid project images (http(s) or local path)", () => {
    projects.forEach((project) => {
      if (project.image) {
        expect(project.image).toMatch(/^(https?:\/\/|\/images\/)/);
      }
    });
  });

  it("getProjectById resolves every project id", () => {
    projects.forEach((project) => {
      expect(getProjectById(project.id)).toBe(project);
    });
    expect(getProjectById("does-not-exist")).toBeUndefined();
  });

  it("every case study route is listed in the sitemap", () => {
    const sitemap = readFileSync(
      join(process.cwd(), "public", "sitemap.xml"),
      "utf-8",
    );
    projects.forEach((project) => {
      expect(sitemap).toContain(`/portfolio/${project.id}`);
    });
  });
});