// Field-type map for each editable collection. The admin API and panel both read
// from here so a new editable field is added in exactly one place.

export const collections = {
  projects: {
    label: "Projects",
    singular: "Project",
    table: "projects",
    sortable: true,
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "slug", required: true, from: "name" },
      { name: "year", label: "Year", type: "text" },
      { name: "summary", label: "Summary", type: "textarea", rows: 3 },
      { name: "description", label: "Full description", type: "textarea", rows: 6 },
      { name: "tags", label: "Tags", type: "list", hint: "One per line" },
      { name: "image", label: "Cover image", type: "image" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "liveUrl", label: "Live URL", type: "url", column: "live_url" },
      { name: "repoUrl", label: "Repo URL", type: "url", column: "repo_url" },
    ],
  },
  experiences: {
    label: "Experience",
    singular: "Role",
    table: "experiences",
    sortable: true,
    titleField: "company",
    fields: [
      { name: "company", label: "Company", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "period", label: "Period", type: "text", hint: "e.g. Sep 2025 — Present" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "points", label: "Highlights", type: "list", hint: "One per line" },
    ],
  },
  capabilities: {
    label: "Capabilities",
    singular: "Capability",
    table: "capabilities",
    sortable: true,
    titleField: "title",
    fields: [
      {
        name: "icon",
        label: "Icon",
        type: "select",
        options: ["Layers", "Sparkles", "Server", "Database"],
        default: "Layers",
      },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 3 },
    ],
  },
  testimonials: {
    label: "Testimonials",
    singular: "Testimonial",
    table: "testimonials",
    sortable: true,
    titleField: "name",
    fields: [
      { name: "quote", label: "Quote", type: "textarea", rows: 4, required: true },
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role / company", type: "text" },
    ],
  },
  socials: {
    label: "Social links",
    singular: "Link",
    table: "socials",
    sortable: true,
    titleField: "label",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "href", label: "URL", type: "url", required: true },
    ],
  },
  "stack-groups": {
    label: "Stack groups",
    singular: "Stack group",
    table: "stack_groups",
    sortable: true,
    titleField: "label",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "items", label: "Items", type: "list", hint: "One per line" },
    ],
  },
  "stack-logos": {
    label: "Stack logos",
    singular: "Logo",
    table: "stack_logos",
    sortable: true,
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "src", label: "Image", type: "image", required: true },
    ],
  },
};

export function getCollection(key) {
  return collections[key] ?? null;
}

export function fieldColumn(field) {
  return field.column ?? field.name;
}

export function coerceValue(field, raw) {
  if (field.type === "list") {
    if (Array.isArray(raw)) {
      return raw.map((v) => String(v).trim()).filter(Boolean);
    }
    return String(raw ?? "")
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  if (field.type === "slug") {
    return String(raw ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return String(raw ?? "").trim();
}
