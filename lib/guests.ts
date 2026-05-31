import guestsData from "@/data/guests.json";

export type Salutation = "plural" | "female" | "male";

export type GuestRecord = {
  familyName: string;
  guestNames: string;
  guestCount: number;
  salutation: Salutation;
};

export type Guest = GuestRecord & {
  code: string;
};

const guests = guestsData as Record<string, GuestRecord>;

export function getGuestByCode(code: string): Guest | null {
  const normalized = code.trim().toLowerCase();
  const record = guests[normalized];
  if (!record) return null;
  return { code: normalized, ...record };
}

export function getAllGuests(): Guest[] {
  return Object.entries(guests).map(([code, record]) => ({
    code,
    ...record,
  }));
}

const salutationPrefix: Record<Salutation, string> = {
  plural: "Дорогие",
  female: "Дорогая",
  male: "Дорогой",
};

export function formatGreeting(guest: Guest): string {
  return `${salutationPrefix[guest.salutation]} ${guest.guestNames}`;
}

export function buildInviteUrl(baseUrl: string, code: string): string {
  const base = baseUrl.replace(/\/$/, "");
  return `${base}/i/${code}`;
}
