import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";
import { formatRsvpMessage, sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректный запрос" },
      { status: 400 },
    );
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as { website?: string }).website === "string" &&
    (body as { website: string }).website.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Проверьте заполнение формы", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const message = formatRsvpMessage(parsed.data);
    await sendTelegramMessage(message);
  } catch (error) {
    console.error("RSVP submit failed:", error);
    return NextResponse.json(
      {
        error:
          "Не удалось отправить ответ. Попробуйте позже или свяжитесь с нами в Telegram.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
