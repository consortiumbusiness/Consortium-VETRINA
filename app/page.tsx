import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Lavori } from "@/components/lavori";
import { Prodotti } from "@/components/prodotti";
import { OnboardingForm } from "@/components/onboarding-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Lavori />
      <Prodotti />
      <OnboardingForm />
      <Footer />
    </main>
  );
}
