import fs from "node:fs";

import ejs from "ejs";
import mjml2html from "mjml";
import { emailLocation } from "../app.js";

export function mjmlToHtmlConverter(name: string, link: string) {
  const mjmlTemplate = fs.readFileSync(emailLocation, "utf-8");
  const renderedMjml = ejs.render(mjmlTemplate, { name, link });

  const { html } = mjml2html(renderedMjml);
  return html;
}
