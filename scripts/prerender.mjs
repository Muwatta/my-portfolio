import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createServer } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));
const projectDir = dirname(rootDir);
const distDir = join(projectDir, "dist");

const publicRoutes = [
  {
    path: "/",
    title:
      "Muwatta | Abdullahi Musliudeen — Software Engineer, Technology Educator & Builder",
    description:
      "Portfolio of Abdullahi Musliudeen, a Nigerian software engineer, technology educator, and builder working across backend systems, React, embedded systems, AI, and IoT.",
  },
  {
    path: "/portfolio",
    title: "Portfolio",
    description: "Selected software projects by Abdullahi Musliudeen.",
  },
  {
    path: "/skills",
    title: "Skills",
    description: "Technical skills and tools used by Abdullahi Musliudeen.",
  },
  {
    path: "/about",
    title: "About",
    description: "About Abdullahi Musliudeen and his engineering work.",
  },
  {
    path: "/blog",
    title: "Blog",
    description:
      "Writing about software engineering, education, and technology.",
  },
  {
    path: "/contact",
    title: "Contact",
    description: "Get in touch with Abdullahi Musliudeen.",
  },
  {
    path: "/courses",
    title: "Courses",
    description:
      "Teaching and backend engineering courses from Abdullahi Musliudeen.",
  },
  {
    path: "/now",
    title: "Now",
    description: "What Abdullahi Musliudeen is working on now.",
  },
  {
    path: "/engineering-experience",
    title: "Engineering Experience",
    description:
      "Engineering experience and systems work by Abdullahi Musliudeen.",
  },
  {
    path: "/resume",
    title: "Resume",
    description: "Resume of Abdullahi Musliudeen.",
  },
];

const stripRouteSensitiveHead = (html) =>
  html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\s*<meta[^>]*data-rh="true"[^>]*\/?>/gi, "")
    .replace(/\s*<link[^>]*data-rh="true"[^>]*\/?>/gi, "")
    .replace(
      /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi,
      "",
    );

const renderRoute = async (HelmetProvider, Seo, route) => {
  const helmetContext = {};
  renderToStaticMarkup(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(
        StaticRouter,
        { location: route.path },
        React.createElement(Seo, {
          title: route.title,
          description: route.description,
          path: route.path,
        }),
      ),
    ),
  );

  const { helmet } = helmetContext;
  return [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");
};

const routeOutputPath = (route) =>
  route.path === "/"
    ? join(distDir, "index.html")
    : join(distDir, route.path.slice(1), "index.html");

const vite = await createServer({
  root: projectDir,
  server: { middlewareMode: true },
  appType: "custom",
  ssr: { noExternal: ["react-helmet-async"] },
});

try {
  const [{ default: Seo }, { courses }, { HelmetProvider }] = await Promise.all(
    [
      vite.ssrLoadModule("/src/components/seo/Seo.jsx"),
      vite.ssrLoadModule("/src/data/courses.js"),
      vite.ssrLoadModule("/node_modules/react-helmet-async/lib/index.esm.js"),
    ],
  );
  const template = await readFile(join(distDir, "index.html"), "utf8");
  const courseRoutes = courses.map((course) => ({
    path: `/courses/${course.slug}`,
    title: course.title,
    description: course.description,
  }));
  const routes = [...publicRoutes, ...courseRoutes];

  for (const route of routes) {
    if (route.path === "/") continue;

    const head = await renderRoute(HelmetProvider, Seo, route);
    const page = stripRouteSensitiveHead(template).replace(
      "</head>",
      `    ${head}\n  </head>`,
    );
    const outputPath = routeOutputPath(route);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, page);
  }

  console.log(`Prerendered ${routes.length} routes.`);
} finally {
  await vite.close();
}
