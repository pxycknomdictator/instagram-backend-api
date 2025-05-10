import { Resend } from "resend";
import { configs } from "../constant.js";

const resend = new Resend(configs.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  htmlContent: string;
  subject: string;
}

export async function sendEmail({ to, htmlContent, subject }: SendEmailProps) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to,
    subject,
    html: htmlContent,
  });

  if (error) {
    console.error("Failed to send email", error);
    throw new Error(`Failed to send email to ${to}`);
  }

  return data;
}
