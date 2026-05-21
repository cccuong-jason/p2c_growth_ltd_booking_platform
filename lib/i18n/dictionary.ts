export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      physiotherapy: "Physiotherapy",
      contact: "Contact",
      admin: "Admin"
    },
    home: {
      eyebrow: "Healthcare coordination + SaaS delivery",
      title: "Booking infrastructure for high-trust service teams.",
      subtitle:
        "P2C Growth builds modern booking systems, CRM workflows, and partner coordination platforms, starting with a UK physiotherapy request engine for multilingual communities."
    }
  }
};

export type Locale = keyof typeof dictionary;
export const defaultLocale: Locale = "en";

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionary[locale];
}
