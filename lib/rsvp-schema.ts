import { z } from "zod";

const phoneRegex = /^\+7\d{10}$/;

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+7${digits}`;
  }
  return raw.trim();
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 11) return phone;
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
}

const yesNo = z.enum(["yes", "no"]);

export const rsvpSchema = z
  .object({
    familyName: z.string().trim().optional(),
    guestNames: z.string().trim().optional(),
    inviteCode: z.string().trim().optional(),
    attendingCount: z.coerce.number().int().min(1).optional(),
    phone: z
      .string()
      .trim()
      .min(1, "Укажите телефон")
      .transform(normalizePhone)
      .refine((v) => phoneRegex.test(v), "Введите корректный номер (+7 и 10 цифр)"),
    attendance: yesNo,
    alcohol: z.array(z.string()).optional(),
    hotFood: z.array(z.string()).optional(),
    creativeGift: yesNo.optional(),
    transfer: yesNo.optional(),
    contests: yesNo.optional(),
    music: z.string().trim().optional(),
    dietary: z.string().trim().optional(),
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.inviteCode) {
      if (!data.familyName?.length) {
        ctx.addIssue({
          code: "custom",
          message: "Укажите фамилию",
          path: ["familyName"],
        });
      }
      if (!data.guestNames?.length) {
        ctx.addIssue({
          code: "custom",
          message: "Укажите имя",
          path: ["guestNames"],
        });
      }
    }
  });

export type RsvpInput = z.input<typeof rsvpSchema>;
export type RsvpData = z.output<typeof rsvpSchema>;

export type RsvpPayload = RsvpData & {
  familyName: string;
  guestNames: string;
  invitedCount?: number;
};
