import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import HireDrawer from "@/components/HireDrawer";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";
import Toast from "@/components/Toast";
import PortfolioAgent from "@/components/PortfolioAgent";

export const metadata = {
  metadataBase: new URL('https://muhammadbinrashid.dev'),
  title: "Muhammad bin Rashid — Full Stack Web Developer (Next.js, Express & MongoDB)",
  description: "Portfolio of Muhammad bin Rashid, a Full Stack Web Developer with 1 year experience delivering web apps, client solutions, and agency clones using JavaScript, Next.js, Express.js, MongoDB, Tailwind CSS, and GSAP animations.",
  keywords: [
    "Muhammad bin Rashid",
    "Full Stack Web Developer",
    "Next.js Developer Pakistan",
    "Express MongoDB Developer",
    "GSAP Animation",
    "Tailwind CSS Expert",
    "Freelance Web Developer",
    "Digital Impact clone",
    "Matias portfolio clone"
  ],
  authors: [{ name: "Muhammad bin Rashid" }],
  creator: "Muhammad bin Rashid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadbinrashid.dev",
    title: "Muhammad bin Rashid — Full Stack Web Developer",
    description: "1+ Year Experience delivering full stack web applications, client solutions, and database-backed platforms with Next.js, Express & MongoDB.",
    siteName: "Muhammad bin Rashid Portfolio",
    images: [
      {
        url: "/images/developer-portrait.jpg",
        width: 1200,
        height: 1200,
        alt: "Muhammad bin Rashid - Full Stack Web Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad bin Rashid — Full Stack Web Developer",
    description: "Full Stack Developer building Next.js, Express & MongoDB web applications with GSAP animations.",
    images: ["/images/developer-portrait.jpg"]
  }
};

export default function RootLayout({ children }) {
  // Structured JSON-LD Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad bin Rashid",
    "jobTitle": "Full Stack Web Developer",
    "email": "muhammadrashid786114786@gmail.com",
    "telephone": "+9212345678901",
    "description": "Full Stack Web Developer specializing in Next.js, React, Express.js, MongoDB, Tailwind CSS, and GSAP animations with 1 year client experience.",
    "knowsAbout": [
      "JavaScript",
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "GSAP Animations",
      "REST APIs"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#190B12] text-[#FFF1F4] min-h-screen flex flex-col selection:bg-[#A8325E] selection:text-[#FFF1F4]">
        <PortfolioProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <ProjectModal />
          <HireDrawer />
          <ScheduleMeetingModal />
          <Toast />
          <PortfolioAgent />
          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
