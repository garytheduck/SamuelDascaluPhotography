import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

interface Payload {
  name?: string;
  email?: string;
  projectType?: string;
  date?: string;
  location?: string;
  message?: string;
  honey?: string;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — silent success
  if (body.honey) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, projectType, date, location, message } = body;
  if (!name || !email || !projectType || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Graceful degradation during dev / preview before key is added.
    console.warn("[contact] RESEND_API_KEY not set — skipping send, logging only.");
    console.log({ name, email, projectType, date, location, message });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM ?? "Samuel Dascalu Site <noreply@samueldascaluphotography.ro>";
  const to = process.env.CONTACT_TO ?? site.contactEmail;

  const html = `
    <h2>New enquiry from samueldascaluphotography.ro</h2>
    <p><strong>Name:</strong> ${escape(name)}</p>
    <p><strong>Email:</strong> ${escape(email)}</p>
    <p><strong>Project type:</strong> ${escape(projectType)}</p>
    <p><strong>Date:</strong> ${escape(date ?? "—")}</p>
    <p><strong>Location:</strong> ${escape(location ?? "—")}</p>
    <hr />
    <p style="white-space:pre-wrap;">${escape(message)}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry · ${projectType} · ${name}`,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Email service rejected the message. Please email me directly." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
