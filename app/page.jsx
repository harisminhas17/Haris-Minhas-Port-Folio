import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Capabilities from "@/components/site/Capabilities";
import Work from "@/components/site/Work";
import Experience from "@/components/site/Experience";
import Stack from "@/components/site/Stack";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

import { getSiteContent } from "@/lib/content-repo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { content } = await getSiteContent();

  return (
    <main className="relative">
      <Navbar content={content} />
      <Hero content={content} />
      <About content={content} />
      <Capabilities content={content} />
      <Work content={content} />
      <Experience content={content} />
      <Stack content={content} />
      <Testimonials content={content} />
      <Contact content={content} />
      <Footer content={content} />
    </main>
  );
}
