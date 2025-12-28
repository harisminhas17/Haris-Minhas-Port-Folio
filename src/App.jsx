import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Navbar, Hero } from "./components";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Lazy load components for better performance
const About = lazy(() => import("./components/About").then(module => ({ default: module.default })));
const Experience = lazy(() => import("./components/Experience").then(module => ({ default: module.default })));
const Tech = lazy(() => import("./components/Tech").then(module => ({ default: module.default })));
const Works = lazy(() => import("./components/Works").then(module => ({ default: module.default })));
const Feedbacks = lazy(() => import("./components/Feedbacks").then(module => ({ default: module.default })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.default })));

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar />

        <div className='relative z-0'>
          <Hero />
        </div>
        
        <Suspense fallback={<Loader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={null}>
          <Tech />
        </Suspense>
        
        <Suspense fallback={null}>
          <Works />
        </Suspense>
        
        <Suspense fallback={null}>
          <Feedbacks />
        </Suspense>
        
        <div className='relative z-0'>
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
