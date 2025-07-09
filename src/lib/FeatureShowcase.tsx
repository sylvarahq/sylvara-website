"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Sensing",
    description:
      "Advanced sensors monitor plant health in real-time, ensuring optimal conditions with minimal setup.",
    image: "/globe.svg",
  },
  {
    title: "Automated Care",
    description:
      "Intelligent watering and lighting adapt automatically to your plant’s needs—no manual adjustments required.",
    image: "/window.svg",
  },
  {
    title: "Insightful Analytics",
    description:
      "Receive actionable insights and notifications about your plant’s well-being, right on your device.",
    image: "/file.svg",
  },
];

export default function FeatureShowcaseNaturalScroll() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = window.innerHeight;
      const itemHeight = sectionHeight / features.length;

      const center = sectionHeight / 2;
      const offsets = Array.from({ length: features.length }, (_, i) => {
        const rowTop = sectionTop + i * itemHeight;
        return Math.abs(rowTop - center);
      });

      const newActive = offsets.indexOf(Math.min(...offsets));
      setActiveIndex(newActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Trigger once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden font-sans"
    >
      <div className="absolute inset-0 flex flex-col justify-center">
        {features.map((feature, i) => {
          const isEven = i % 2 === 0;
          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              className="h-[33.3333vh] flex items-center justify-center px-8"
            >
              <div
                className={`flex w-full max-w-6xl items-center justify-between gap-16 ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Feature Text */}
                <div
                  className={`flex-1 transition-colors duration-500 ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}
                >
                  <h2 className="text-3xl font-bold mb-2">{feature.title}</h2>
                  <p className="text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: isActive ? 1 : 0.4 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 flex justify-center"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={180}
                    height={180}
                    className="rounded-xl"
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
