import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { IntroF22 } from "@/components/intro-f22";
import { Services } from "@/components/services";
import { Lavori } from "@/components/lavori";
import { Prodotti } from "@/components/prodotti";
import { OnboardingForm } from "@/components/onboarding-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <IntroF22>
        <Hero />
      </IntroF22>
      <Services />
      <Lavori />
      <Prodotti />
      <OnboardingForm />
      <Footer />
    </main>
  );
}
