import { NextResponse } from "next/server";
import { and, gt, sql } from "drizzle-orm";
import { db } from "@/db";
import { cakeInquiries } from "@/db/schema";

export const runtime = "nodejs";

function clean(value: unknown, max = 2000) {
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const fullName = clean(body.fullName, 120);
  const phone = clean(body.phone, 40);

  if (!fullName || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and WhatsApp number are required" },
      { status: 422 },
    );
  }

  try {
    const [row] = await db
      .insert(cakeInquiries)
      .values({
        fullName,
        phone,
        occasion: clean(body.occasion, 80),
        size: clean(body.size, 120),
        flavour: clean(body.flavour, 160),
        requiredDate: clean(body.requiredDate, 40),
        message: clean(body.message, 2000),
        deliveryMode: clean(body.deliveryMode, 40),
        deliveryArea: clean(body.deliveryArea, 160),
        referenceFileName: clean(body.referenceFileName, 200),
        styleReferenced: clean(body.styleReferenced, 160),
        sentToWhatsapp: Boolean(body.sentToWhatsapp),
      })
      .returning({ id: cakeInquiries.id });

    return NextResponse.json({ ok: true, id: row?.id ?? null });
  } catch {
    // Never block a customer over a database hiccup — WhatsApp is the source of truth.
    return NextResponse.json({ ok: true, queued: false });
  }
}

export async function GET() {
  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [row] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(cakeInquiries)
      .where(and(gt(cakeInquiries.createdAt, weekAgo)));
    return NextResponse.json({ ok: true, last7Days: Number(row?.count ?? 0) });
  } catch {
    return NextResponse.json({ ok: true, last7Days: 0 });
  }
}
