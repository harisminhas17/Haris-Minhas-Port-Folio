import {
  Navbar,
  Hero,
  About,
  Tech,
  Experience,
  Works,
  Feedbacks,
  Contact,
} from "@/components";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative z-0 bg-primary">
      <Navbar />

      <div className="relative z-0">
        <Hero />
      </div>

      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />

      <div className="relative z-0">
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
