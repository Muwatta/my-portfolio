import { describe, it, expect } from "vitest";
import { parseArchitecture } from "../features/portfolio/architecture";

describe("parseArchitecture", () => {
  it("splits a flow into ordered nodes", () => {
    const nodes = parseArchitecture(
      "Camera → OpenCV (detection) → ML Model (classification) → Python backend",
    );
    expect(nodes.map((n) => n.label)).toEqual([
      "Camera",
      "OpenCV (detection)",
      "ML Model (classification)",
      "Python backend",
    ]);
  });

  it("attaches pipe-separated services as extras on their node", () => {
    const nodes = parseArchitecture(
      "React → Django REST API → PostgreSQL | Redis (caching)",
    );
    expect(nodes.map((n) => n.label)).toEqual([
      "React",
      "Django REST API",
      "PostgreSQL",
    ]);
    expect(nodes[2].extras).toEqual(["Redis (caching)"]);
  });

  it("returns an empty array for empty or null input", () => {
    expect(parseArchitecture("")).toEqual([]);
    expect(parseArchitecture(undefined)).toEqual([]);
  });
});