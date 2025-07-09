"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/lib/Navbar";
import Footer from "@/lib/Footer";
import InitialOffering from "@/lib/InitialOffering";
import JoinWaitlistShowcase from "@/lib/JoinWaitlistShowcase";
import FeatureShowcase from "@/lib/FeatureShowcase";
import { FeatureSteps } from "@/components/blocks/feature-section"

const features = [
  { 
    step: 'Step 1', 
    title: 'Autonomous Plant Care',
    content: 'Charge the device, fill the water tank and set aside for months.', 
    image: 'https://res.cloudinary.com/dppdu4sip/image/upload/v1752065080/Slide_1_a1t0ub.png' 
  },
  { 
    step: 'Step 2',
    title: 'Environmental Insights',
    content: "Monitor and track your plants' habitat and identify potential shortcomings.",
    image: 'https://res.cloudinary.com/dppdu4sip/image/upload/v1752065226/Prototype_v5_v5ssex_myoz5z.png'
  },
  { 
    step: 'Step 3',
    title: 'Centralised Control',
    content: 'Monitor the status and health of all your Sylvara units from one App.',
    image: 'https://res.cloudinary.com/dppdu4sip/image/upload/v1752065103/Prototype_v5_v5_indoorBWAHAH_hbcqms.png'
  },
]

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      <Navbar heroRef={heroRef} />
      {/* Hero Section */}
      <motion.section
  id="hero"
  ref={heroRef}
  style={{ opacity: heroOpacity }}
  className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
>
  {/* Video Background */}
  <video
    className="absolute w-full h-full object-cover filter brightness-[0.35] saturate-110"
    src="/movie.mp4"
    autoPlay
    loop
    muted
    playsInline
  />
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10" />
  
  {/* Subtle Pattern Overlay */}
  <div className="absolute inset-0 opacity-[0.03] z-15" 
       style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
       }} />
  
  {/* Hero content */}
  <div className="relative z-20 text-center px-6 pt-24 pb-12 max-w-5xl mx-auto">
    {/* Badge */}
    {/* <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
      className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6 shadow-lg"
    >
      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
      Smart Plant Care Revolution
    </motion.div> */}

    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight"
    >
      Meet{" "}
      <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
        Sylvara
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      className="text-lg md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed font-light"
    >
      What if your plants could take care of themselves? {" "}
      <br className="hidden md:block" />
      With <span className="text-green-300 font-medium">Sylvara</span>, they can.
     
      {/* Sylvara makes it real. */}
    </motion.p>
    
    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
    >
      <a
        href="#features"
        className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 hover:from-green-500 hover:to-emerald-500"
      >
        <span className="relative z-10">Explore Features</span>
        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </a>
      
      <a
        href="#waitlist"
        className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
      >
        <span>Join Waitlist</span>
        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </motion.div>

    </div>

  {/* Scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
  >
    <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer"
         onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}>
      <span className="text-xs mb-2 font-medium">Scroll to explore</span>
      <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </motion.div>
</motion.section>

      {/* Main content */}
      

      <FeatureSteps
        features={features}
        title="Our initial prototype"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
        heroRef={heroRef}
  />



      <JoinWaitlistShowcase />
      

      <Footer />
    </div>
  );
}
