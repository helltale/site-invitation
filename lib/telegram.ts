import { formatPhoneDisplay, type RsvpData } from "./rsvp-schema";

function yesNoLabel(value: "yes" | "no" | undefined): string {
  if (value === "yes") return "Да";
  if (value === "no") return "Нет";
  return "—";
}

function listOrDash(items: string[] | undefined): string {
  if (!items || items.length === 0) return "—";
  return items.join(", ");
}

export function formatRsvpMessage(data: RsvpData): string {
  const lines: string[] = [
    "🎉 <b>Новый ответ RSVP</b>",
    "",
    `<b>${escapeHtml(data.familyName)}</b>`,
    escapeHtml(data.guestNames),
    formatPhoneDisplay(data.phone),
    "",
  ];

  if (data.attendance === "no") {
    lines.push("<b>Присутствие:</b> не смогут");
    return lines.join("\n");
  }

  lines.push("<b>Присутствие:</b> придут", "");
  lines.push(`<b>Алкоголь:</b> ${escapeHtml(listOrDash(data.alcohol))}`);
  lines.push(`<b>Горячее:</b> ${escapeHtml(listOrDash(data.hotFood))}`);
  lines.push(
    `<b>Творческий подарок:</b> ${escapeHtml(yesNoLabel(data.creativeGift))}`,
  );
  lines.push(`<b>Трансфер:</b> ${escapeHtml(yesNoLabel(data.transfer))}`);
  lines.push(`<b>Конкурсы:</b> ${escapeHtml(yesNoLabel(data.contests))}`);

  if (data.music) {
    lines.push(`<b>Музыка:</b> ${escapeHtml(data.music)}`);
  }
  if (data.dietary) {
    lines.push(`<b>Особенности питания:</b> ${escapeHtml(data.dietary)}`);
  }

  return lines.join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram credentials are not configured");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${body}`);
  }
}
