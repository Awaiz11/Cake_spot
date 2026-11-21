import { Craft } from "@/components/Craft";
import { FAQ } from "@/components/FAQ";
import { FlavourTicker } from "@/components/FlavourTicker";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { InstagramStrip } from "@/components/InstagramStrip";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Nav } from "@/components/Nav";
import { OrderForm } from "@/components/OrderForm";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Specialties } from "@/components/Specialties";
import { TrustRow } from "@/components/TrustRow";
import { OrderProvider } from "@/lib/order-store";

export default function Home() {
  return (
    <OrderProvider>
      <a
        href="#gallery"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[12px] focus:uppercase focus:tracking-[0.14em] focus:text-cream"
      >
        Skip to the cakes
      </a>
      <Nav />
      <main>
        <Hero />
        <TrustRow />
        <FlavourTicker />
        <Specialties />
        <Gallery />
        <OrderForm />
        <Process />
        <Craft />
        <Reviews />
        <FAQ />
        <InstagramStrip />
      </main>
      <Footer />
      <MobileActionBar />
    </OrderProvider>
  );
}
