import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import ProjectsPricingTransition from "@/components/Projects/ProjectsPricingTransition";
import PricingCalculator from "@/components/PricingCalculator/PricingCalculator";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import { locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Services locale={locale} />
        <ProjectsPricingTransition locale={locale} />
        <PricingCalculator locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}