import { describe, expect, it } from "vitest";
import { filterPublicPosts, asPublicPost } from "../lib/blog";

describe("blog publishing rules", () => {
  it("keeps draft posts out of the public list", () => {
    const result = filterPublicPosts([
      { id: 1, title: "Visible", published: true },
      { id: 2, title: "Hidden", published: false },
      { id: 3, title: "Legacy", published: undefined },
    ]);

    expect(result.map((post) => post.id)).toEqual([1, 3]);
  });

  it("preserves published state on public post payloads", () => {
    const result = asPublicPost({
      id: 7,
      title: "Draft ready",
      excerpt: "Example",
      body: "Long body",
      category: "Tech",
      date: "2025-01-01",
      image: "",
      medium_link: "",
      tags: ["react"],
      read_time: "4 min read",
      published: false,
    });

    expect(result.published).toBe(false);
  });
});
