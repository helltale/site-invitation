import { NextResponse } from "next/server";
import { getGuestByCode } from "@/lib/guests";
import { rsvpSchema, type RsvpPayload } from "@/lib/rsvp-schema";
import { formatRsvpMessage, sendTelegramMessage } from "@/lib/telegram";

function resolveRsvpPayload(
  data: ReturnType<typeof rsvpSchema.parse>,
): RsvpPayload | { error: string; status: number } {
  if (data.inviteCode) {
    const guest = getGuestByCode(data.inviteCode);
    if (!guest) {
      return { error: "Приглашение не найдено", status: 400 };
    }

    if (
      data.attendingCount !== undefined &&
      data.attendingCount > guest.guestCount
    ) {
      return {
        error: `Количество гостей не может превышать ${guest.guestCount}`,
        status: 422,
      };
    }

    return {
      ...data,
      familyName: guest.familyName,
      guestNames: guest.guestNames,
      inviteCode: guest.code,
      invitedCount: guest.guestCount,
    };
  }

  if (!data.familyName || !data.guestNames) {
    return { error: "Проверьте заполнение формы", status: 422 };
  }

  return {
    ...data,
    familyName: data.familyName,
    guestNames: data.guestNames,
  };
}

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

  const payload = resolveRsvpPayload(parsed.data);
  if ("error" in payload) {
    return NextResponse.json(
      { error: payload.error },
      { status: payload.status },
    );
  }

  try {
    const message = formatRsvpMessage(payload);
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
