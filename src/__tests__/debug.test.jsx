import { expect, it } from "vitest";
import { writeFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

const log = (s) => writeFileSync("/tmp/opencode/debug2.txt", s + "\n", { flag: "a" });

it("debug home", async () => {
  writeFileSync("/tmp/opencode/debug2.txt", "");
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );
  const started = Date.now();
  try {
    await screen.findByText("Available for projects", {}, { timeout: 8000 });
    log(`HERO LOADED after ${Date.now() - started}ms`);
  } catch (e) {
    log(`HERO NOT FOUND after ${Date.now() - started}ms`);
  }
  const h1s = Array.from(document.querySelectorAll("h1"));
  log(`h1 count: ${h1s.length}`);
  h1s.forEach((h, i) => log(`h1[${i}] text=${JSON.stringify(h.textContent)} role=${h.getAttribute("role")}`));
  const main = document.querySelector("main");
  log(`main children: ${main ? main.childElementCount : "none"}`);
  log(`spinner: ${Boolean(document.querySelector(".animate-spin"))}`);
  expect(true).toBe(true);
}, 20000);