import { notFound } from "next/navigation";
import { InvitationPage } from "@/components/InvitationPage";
import { getGuestByCode } from "@/lib/guests";

export const dynamic = "force-dynamic";

type InvitePageProps = {
  params: Promise<{ code: string }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params;
  const guest = getGuestByCode(code);

  if (!guest) {
    notFound();
  }

  return <InvitationPage guest={guest} />;
}
