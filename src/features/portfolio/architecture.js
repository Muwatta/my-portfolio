export const parseArchitecture = (architecture = "") =>
  architecture
    .split("→")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const [label, ...extras] = segment
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);
      return { label: label || "", extras: extras || [] };
    });