import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

const guestsPath = resolve(process.cwd(), "data/guests.json");
const outputPath = resolve(process.cwd(), "invites.csv");

/** @type {Record<string, { familyName: string; guestNames: string }>} */
const guests = JSON.parse(readFileSync(guestsPath, "utf8"));

const entries = Object.entries(guests);

if (entries.length === 0) {
  console.error("No guests found in data/guests.json");
  process.exit(1);
}

function escapeCsv(value) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function buildInviteUrl(code) {
  return `${baseUrl}/i/${code}`;
}

const rows = [
  ["code", "familyName", "guestNames", "link"],
  ...entries.map(([code, guest]) => [
    code,
    guest.familyName,
    guest.guestNames,
    buildInviteUrl(code),
  ]),
];

const csv = rows
  .map((row) => row.map((cell) => escapeCsv(cell)).join(","))
  .join("\n");

writeFileSync(outputPath, `${csv}\n`, "utf8");

console.log(`Generated ${entries.length} invite links:`);
console.log(`  ${outputPath}`);
console.log(`  Base URL: ${baseUrl}`);

for (const [code] of entries) {
  console.log(`  ${code} → ${buildInviteUrl(code)}`);
}
