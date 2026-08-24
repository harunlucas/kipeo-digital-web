export const siteConfig = {
  name: "Kipeo Digital",
  shortName: "Kipeo",
  tagline:
    "Websites, software and digital systems for businesses working and growing online.",
  description:
    "Kipeo Digital builds websites, web applications and business systems for companies working and growing online. Free consultation and a written proposal before development.",
  url: "https://kipeo.harunlucas.com",
  email: "kipeo@harunlucas.com",
  phone: "+254 797 610 755",
  phoneHref: "tel:+254797610755",
  whatsappHref: "https://wa.me/254797610755",
  whatsappLabel: "Message on WhatsApp",
  location: "Nairobi, Kenya",
  serviceArea: "Working remotely worldwide",
  originStory:
    "Kipeo draws from a Kiswahili word associated with a peak or apex — a reminder to keep improving the standard of every project.",
} as const;

export type SiteConfig = typeof siteConfig;
