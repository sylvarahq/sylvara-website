"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
  duration?: number // Optional custom duration per step
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
  heroRef: React.RefObject<HTMLElement | null>
  showControls?: boolean
  showProgressBar?: boolean
  enableKeyboardNavigation?: boolean
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 4000,
  imageHeight = "h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px]",
  heroRef,
  showControls = true,
  showProgressBar = true,
  enableKeyboardNavigation = true,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number>(0)
  
  const isInView = useInView(sectionRef, { margin: "-20%" })
  
  // Enhanced parallax with smoother transforms
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["end start", "end end"],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
    setProgress(0)
    progressRef.current = 0
  }, [features.length])

  const goToPrevious = useCallback(() => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
    setProgress(0)
    progressRef.current = 0
  }, [features.length])

  const goToFeature = useCallback((index: number) => {
    setCurrentFeature(index)
    setProgress(0)
    progressRef.current = 0
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case ' ':
          e.preventDefault()
          setIsPlaying(!isPlaying)
          break
        case 'Home':
          e.preventDefault()
          goToFeature(0)
          break
        case 'End':
          e.preventDefault()
          goToFeature(features.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isInView, isPlaying, goToNext, goToPrevious, goToFeature, features.length, enableKeyboardNavigation])

  // Auto-advance with improved timing
  useEffect(() => {
    if (!isPlaying || isHovered || !isInView) return

    const currentDuration = features[currentFeature]?.duration || autoPlayInterval
    const increment = 100 / (currentDuration / 50)

    const timer = setInterval(() => {
      progressRef.current += increment
      setProgress(progressRef.current)

      if (progressRef.current >= 100) {
        goToNext()
      }
    }, 50)

    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isInView, currentFeature, features, autoPlayInterval, goToNext])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const imageVariants = {
    enter: {
      y: 30,
      opacity: 0,
      scale: 0.95,
      rotateX: -10,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
    },
    exit: {
      y: -30,
      opacity: 0,
      scale: 1.05,
      rotateX: 10,
    }
  }

  return (
    <motion.div
      id="features"
      ref={sectionRef}
      style={{ y, scale, opacity }}
      className={cn("px-4 py-8 md:p-12 lg:p-16 overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto w-full mb-20">
        {/* Enhanced header with controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
            variants={stepVariants}
          >
            {title}
          </motion.h2>
          
          {showControls && (
            <motion.div 
              className="flex items-center gap-4"
              variants={stepVariants}
            >
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={goToNext}
                className="p-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 min-w-0">
          {/* Enhanced steps list */}
          <motion.div 
            className="order-2 lg:order-1 space-y-6"
            variants={stepVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex items-start gap-6 p-4 rounded-lg transition-all duration-300 cursor-pointer group",
                  index === currentFeature
                    ? "bg-accent/50 border-l-4 border-primary"
                    : "hover:bg-accent/20"
                )}
                onClick={() => goToFeature(index)}
                whileHover={{ x: 4 }}
                initial={{ opacity: 0.4 }}
                animate={{ 
                  opacity: index === currentFeature ? 1 : 0.6,
                  scale: index === currentFeature ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 relative overflow-hidden",
                    index === currentFeature
                      ? "bg-primary border-primary text-primary-foreground"
                      : index < currentFeature
                      ? "bg-primary/20 border-primary/40 text-primary"
                      : "bg-muted border-muted-foreground"
                  )}
                  animate={{
                    scale: index === currentFeature ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <AnimatePresence mode="wait">
                    {index < currentFeature ? (
                      <motion.span 
                        key={`check-${index}`}
                        className="text-lg font-bold"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.3, ease: "backOut" }}
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <motion.span 
                        key={`number-${index}`}
                        className="text-lg font-semibold"
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Progress ring for current step */}
                  {index === currentFeature && showProgressBar && (
                    <motion.svg 
                      className="absolute inset-0 w-full h-full -rotate-90"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${(progress / 100) * 113.1} 113.1`}
                        className="text-primary-foreground/30"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  )}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced image section */}
          <motion.div
            className={cn(
              "order-1 lg:order-2 relative w-full",
              imageHeight,
              "overflow-hidden rounded-xl shadow-2xl max-h-[25vh] sm:max-h-[30vh] md:max-h-none"
            )}
            variants={stepVariants}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-xl overflow-hidden"
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover"
                        width={1000}
                        height={500}
                        priority={index === 0}
                      />
                      
                      {/* Enhanced overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      
                      {/* Image caption */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-sm font-medium text-foreground/90 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                          {feature.title || feature.step}
                        </p>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
            
            {/* Step indicators */}
            <div className="absolute top-4 right-4 flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToFeature(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentFeature
                      ? "bg-primary w-6"
                      : "bg-primary/40 hover:bg-primary/60"
                  )}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}