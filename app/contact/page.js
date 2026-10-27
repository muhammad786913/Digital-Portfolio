import ContactSection from "@/components/ContactSection";
import HireEstimator from "@/components/HireEstimator";

export const metadata = {
  title: "Contact & Hire Muhammad bin Rashid — Full Stack Web Developer",
  description: "Get in touch with Muhammad bin Rashid for full stack development, web app clones, Express/MongoDB architectures, and freelance contracts."
};

export default function ContactPage() {
  return (
    <div className="pt-20 bg-[#190B12]">
      <ContactSection />
      <HireEstimator />
    </div>
  );
}
