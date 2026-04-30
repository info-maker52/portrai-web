import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Booking form handler.
 * Posts here from `components/booking/BookingForm.tsx`.
 *
 * Reads SMTP config from env (see .env.example). Expects Gmail Workspace
 * App Password in `SMTP_PASSWORD`.
 *
 * In production, every successful submit emails `SMTP_TO`.
 * If SMTP isn't configured (e.g. preview deploys without secrets), the route
 * logs the payload server-side and returns 200 — useful for design QA without
 * spamming Reijo's inbox.
 */

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  eventLocation?: string;
  guestCount?: string;
  message?: string;
  /** Honeypot — bots fill this; humans don't see it. */
  website?: string;
};

const REQUIRED: Array<keyof Payload> = ["name", "email", "message"];

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot spam trap
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Required-field validation
  const missing = REQUIRED.filter((k) => !body[k] || body[k]!.trim().length === 0);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missing },
      { status: 400 },
    );
  }

  // Basic email shape check
  const email = body.email!.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const subject = `New booking enquiry — ${body.name}${body.eventType ? ` (${body.eventType})` : ""}`;
  const text = formatPlainText(body);
  const html = formatHtml(body);

  // If SMTP isn't configured yet, just log the payload and acknowledge.
  // Avoids preview-deploy crashes before Reijo provides the App Password.
  const password = process.env.SMTP_PASSWORD;
  if (!password) {
    console.log("[booking] SMTP not configured — payload received:", body);
    return NextResponse.json({
      ok: true,
      mode: "logged",
      note: "SMTP_PASSWORD not set; payload logged to server only.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER ?? "info@portrai.ee",
        pass: password,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? "PortrAI <info@portrai.ee>",
      to: process.env.SMTP_TO ?? "info@portrai.ee",
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true, mode: "sent" });
  } catch (err) {
    console.error("[booking] SMTP send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Try again later." },
      { status: 500 },
    );
  }
}

function formatPlainText(b: Payload) {
  return [
    `Name: ${b.name ?? ""}`,
    `Email: ${b.email ?? ""}`,
    `Phone: ${b.phone ?? "—"}`,
    `Event type: ${b.eventType ?? "—"}`,
    `Event date: ${b.eventDate ?? "—"}`,
    `Event location: ${b.eventLocation ?? "—"}`,
    `Guest count: ${b.guestCount ?? "—"}`,
    "",
    "Message:",
    b.message ?? "",
  ].join("\n");
}

function formatHtml(b: Payload) {
  const esc = (s = "") =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  return `<!doctype html>
<html><body style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.6;">
  <h2>New booking enquiry</h2>
  <ul>
    <li><strong>Name:</strong> ${esc(b.name)}</li>
    <li><strong>Email:</strong> <a href="mailto:${esc(b.email)}">${esc(b.email)}</a></li>
    <li><strong>Phone:</strong> ${esc(b.phone ?? "—")}</li>
    <li><strong>Event type:</strong> ${esc(b.eventType ?? "—")}</li>
    <li><strong>Date:</strong> ${esc(b.eventDate ?? "—")}</li>
    <li><strong>Location:</strong> ${esc(b.eventLocation ?? "—")}</li>
    <li><strong>Guest count:</strong> ${esc(b.guestCount ?? "—")}</li>
  </ul>
  <h3>Message</h3>
  <p>${esc(b.message ?? "")}</p>
</body></html>`;
}
