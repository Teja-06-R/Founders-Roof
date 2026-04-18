import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import About from "./components/About";
import WhoShouldJoin from "./components/WhoShouldJoin";
import UpcomingEvent from "./components/UpcomingEvent";
import RegistrationForm from "./components/RegistrationForm";
import Testimonials from "./components/Testimonials";
import InstagramSection from "./components/InstagramSection";
import Founder from "./components/Founder";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import WhatsAppFloating from "./components/WhatsAppFloating";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <About />
      <WhoShouldJoin />
      <UpcomingEvent />
      <RegistrationForm />
      <Testimonials />
      <InstagramSection />
      <Founder />
      <CTABanner />
      <Footer />
      <WhatsAppFloating />
    </>
  );
}

export default App;
