import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import About from "./components/About";
import WhoShouldJoin from "./components/WhoShouldJoin";
import UpcomingEvent from "./components/UpcomingEvent";
import RegistrationForm from "./components/RegistrationForm";
import Testimonials from "./components/Testimonials";
import Founder from "./components/Founder";
import Footer from "./components/Footer";
import WhatsAppFloating from "./components/WhatsAppFloating";
import Admin from "./admin/Admin";

function Home() {
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
      <Founder />
      <Footer />
      <WhatsAppFloating />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}


export default App;
