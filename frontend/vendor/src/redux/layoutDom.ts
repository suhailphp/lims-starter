

/** Layout modes that drive `data-layout` on `<html>` and classes on `<body>`. */
export type AppLayoutMode = "default" | "mini" | "hoverview" | "hidden" | "full-width" | "rtl"  | "two-column";

/** Body classes owned by layout routing — removed together on reset. */
export const LAYOUT_BODY_CLASSES = [
  "mini-sidebar",
  "hidden-layout",
  "layout-rtl",
] as const;

const LAYOUT_HTML_ATTR = "data-layout";
const LAYOUT_DIR_ATTR = "dir";

const MODE_DOM: Record<
  Exclude<AppLayoutMode, "default">,
  { dataLayout: string; bodyClass: string; dir?: string }
> = {
  mini: { dataLayout: "mini", bodyClass: "mini-sidebar" },
  hoverview: { dataLayout: "hoverview", bodyClass: "mini-sidebar" },
  hidden: { dataLayout: "hidden", bodyClass: "" },
  "full-width": { dataLayout: "full-width", bodyClass: "" },
  rtl: { dataLayout: "rtl", bodyClass: "layout-rtl", dir: "rtl" },
  "two-column":{dataLayout:"",bodyClass:""}
};

export function clearDocumentLayout(): void {
  const html = document.documentElement;
  html.removeAttribute(LAYOUT_HTML_ATTR);
  html.removeAttribute(LAYOUT_DIR_ATTR);
  LAYOUT_BODY_CLASSES.forEach((cls) => document.body.classList.remove(cls));
}

export function applyDocumentLayout(mode: Exclude<AppLayoutMode, "default">): void {
  const { dataLayout, bodyClass, dir } = MODE_DOM[mode];
  const html = document.documentElement;

  html.removeAttribute(LAYOUT_HTML_ATTR);
  html.removeAttribute(LAYOUT_DIR_ATTR);
  LAYOUT_BODY_CLASSES.forEach((cls) => document.body.classList.remove(cls));

  html.setAttribute(LAYOUT_HTML_ATTR, dataLayout);
  if (dir) {
    html.setAttribute(LAYOUT_DIR_ATTR, dir);
  }
  if (bodyClass) {
    document.body.classList.add(bodyClass);
  }
    if (mode !== "two-column") {
    document.body.classList.remove("mini-sidebar");
    document.body.classList.remove("full-width");
    return; // stop here, don't add anything
  }
}
