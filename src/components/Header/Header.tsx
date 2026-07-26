import LogoSquare from "./LogoSquare";
import FloatingMenu from "./FloatingMenu";
import LanguageToggle from "./LanguageToggle";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Header({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].header;

  const items = [
    { label: t.about, href: `/${locale}#about` },
    { label: t.services, href: `/${locale}#services` },
    { label: t.projects, href: `/${locale}#projects` },
    { label: t.contact, href: `/${locale}#contact` },
  ];

  return (
    <>
      <LogoSquare locale={locale} />
      <LanguageToggle locale={locale} />
      <FloatingMenu items={items} menuLabel={t.menuLabel} />
    </>
  );
}