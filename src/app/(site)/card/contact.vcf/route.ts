import { person, siteUrl } from "@/redesign/site";

// The contact file behind "Save contact". Built once at build time from site.ts.
export const dynamic = "force-static";

export function GET() {
  const [first, ...rest] = person.name.split(" ");
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${person.name}`,
    `N:${rest.join(" ")};${first};;;`,
    `TITLE:${person.title}`,
    `EMAIL;TYPE=INTERNET:${person.email}`,
    `URL:${siteUrl}`,
    `URL:${person.linkedin}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      // Inline, so iOS opens its "Add contact" sheet instead of saving a file.
      "Content-Disposition": 'inline; filename="sterling-kelly.vcf"',
    },
  });
}
