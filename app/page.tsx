import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { CaseHistory } from "@/components/case-history";
import { OnboardingForm } from "@/components/onboarding-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <CaseHistory />
      <OnboardingForm />
      <Footer />
    </main>
  );
}
