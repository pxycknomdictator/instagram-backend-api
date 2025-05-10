import fs from "node:fs";

import ejs from "ejs";
import mjml2html from "mjml";
import { emailLocation, verifyEmailLocation } from "../app.js";

export function mjmlToHtmlConverter(name: string, link: string) {
  const mjmlTemplate = fs.readFileSync(emailLocation, "utf-8");
  const renderedMjml = ejs.render(mjmlTemplate, { name, link });

  const { html } = mjml2html(renderedMjml);
  return html;
}

export function emailVerificationMjml2Html(code: number, link: string) {
  const mjmlTemplate = fs.readFileSync(verifyEmailLocation, "utf-8");
  const renderedMjml = ejs.render(mjmlTemplate, { code, link });

  const { html } = mjml2html(renderedMjml);
  return html;
}
