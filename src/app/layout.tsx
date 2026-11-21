import { Inter, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EnquiryProvider } from "@/components/enquiry/enquiry-provider";
import { ProjectEnquiryPanel } from "@/components/enquiry/project-enquiry-panel";
import { ThemeSync } from "@/components/theme/theme-sync";
import { defaultMetadata } from "@/lib/metadata";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/*
  Display serif, used only for the italic half of the homepage hero headline
  and that section's "Interactive demo" caption. Instrument Serif ships a
  single 400 weight, so the weight is explicit; only the italic face is
  loaded because that is the only cut the design uses.
*/
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `suppressHydrationWarning`: the theme script below sets `data-theme`,
    // `data-theme-preference` and `color-scheme` on <html> before React
    // hydrates; the DOM is the source of truth for those (src/lib/theme.ts).
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the saved or system appearance during parsing, before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className="flex min-h-full flex-col bg-paper text-paper-foreground"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only rounded-full bg-button px-5 py-2.5 text-sm font-medium text-button-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to main content
        </a>
        <ThemeSync />
        <EnquiryProvider>
          <AnnouncementBar />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <ProjectEnquiryPanel />
        </EnquiryProvider>
      </body>
    </html>
  );
}
