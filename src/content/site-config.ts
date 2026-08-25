export const siteConfig = {
  name: "Kipeo Digital",
  tagline:
    "Websites, software and digital systems for businesses working and growing online.",
  description:
    "Kipeo Digital is a team-led software and digital-product studio in Nairobi, building websites, web apps and business systems for clients working and growing online worldwide.",
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
