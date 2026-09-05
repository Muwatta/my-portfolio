import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../lib/firebase", () => ({
  db: {},
  isFirebaseConfigured: true,
}));

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    collection: vi.fn(() => ({})),
    doc: vi.fn(() => ({})),
    getDoc: vi.fn(() => Promise.reject(new Error("Firestore read failed"))),
    getDocs: vi.fn(() => Promise.reject(new Error("Firestore read failed"))),
    query: vi.fn(() => ({})),
    where: vi.fn(() => ({})),
    serverTimestamp: vi.fn(() => new Date().toISOString()),
    setDoc: vi.fn(() => Promise.resolve()),
    deleteDoc: vi.fn(() => Promise.resolve()),
  };
});

import { fetchProjects } from "../lib/projects";

describe("portfolio project fallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("falls back to the legacy project list when Firestore rejects", async () => {
    const projects = await fetchProjects();

    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty("id");
    expect(projects[0]).toHaveProperty("title");
  });
});
