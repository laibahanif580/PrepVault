import LandingNavbar from "@/components/landing/LandingNavbar";
import Hero from "../../components/landing/Hero";
import Features from "@/components/landing/Features";
import LandingFooter from "@/components/landing/LandingFooter";
function Landing() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Features />
      <LandingFooter />
    </>
  );
}

export default Landing;