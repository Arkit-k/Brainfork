import { LoginButton } from "@/components/login-button";
import { Button } from "@/components/ui/button";
import  { HeroHeader } from "../components/landing page/header"
import HeroSection from "@/components/landing page/hero";
import { HeroVideoDialogDemoTopInBottomOut } from "@/components/landing page/herovideo";
import Features from "@/components/landing page/feature";

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroSection/>
     <div className="md:ml-20">
      <HeroVideoDialogDemoTopInBottomOut/>
      </div>
      <Features />
    </main>
  );
}