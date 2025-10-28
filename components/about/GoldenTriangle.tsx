"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "@/lib/motion-variants";
import { MapPin, Star, Camera, Crown } from "lucide-react";
import Image from "next/image";

export default function GoldenTriangleSection() {
  const cities = [
    { name: "Delhi", icon: "🏛️", color: "from-red-500 to-orange-500" },
    { name: "Agra", icon: "🕌", color: "from-blue-500 to-cyan-500" },
    { name: "Jaipur", icon: "👑", color: "from-pink-500 to-purple-500" },
  ];

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.03, x: 0 }}
        transition={{ duration: 2 }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
            >
              <Crown className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">
                Special Focus
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
              Our Special Focus — The{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                Golden Triangle
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Content Column */}
            <motion.div
              variants={slideInLeft}
              className="flex flex-col space-y-8"
            >
              <div className="space-y-6 flex-grow">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Golden Triangle — Delhi, Agra, and Jaipur — represents the
                  heart of India's tourism experience, covering some of the
                  nation's most iconic World Heritage Sites such as the Taj
                  Mahal, Qutub Minar, Amber Fort, and Red Fort in Agra.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  At IndiaTourManager.com, we specialize in offering the best
                  professional guides for this region. Whether you're exploring
                  Delhi's Mughal architecture, Agra's timeless love story, or
                  Jaipur's royal heritage — our guides ensure you experience
                  these wonders with comfort, clarity, and cultural depth.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  variants={scaleIn}
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="bg-gradient-to-br from-orange-500/10 to-pink-500/5 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mb-2">
                    3
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Iconic Cities
                  </div>
                </motion.div>

                <motion.div
                  variants={scaleIn}
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="bg-gradient-to-br from-pink-500/10 to-orange-500/5 rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-600 bg-clip-text text-transparent mb-2">
                    ∞
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Experiences
                  </div>
                </motion.div>
              </div>

              {/* Cities showcase */}
              <motion.div
                variants={fadeInUp}
                custom={2}
                className="grid grid-cols-3 gap-3"
              >
                {cities.map((city, index) => (
                  <motion.div
                    key={city.name}
                    whileHover={{
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="text-center p-4 rounded-xl bg-background/60 backdrop-blur-sm border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-3xl mb-2">{city.icon}</div>
                    <div className="text-sm font-semibold text-foreground">
                      {city.name}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Visual Column */}
            <motion.div
              variants={slideInRight}
              className="relative flex flex-col"
            >
              {/* Main visual container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-grow rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-pink-500/10 shadow-2xl relative group"
              >
                <Image
                  src="/3.jpg"
                  alt="Golden Triangle destinations - Delhi, Agra, Jaipur"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Overlay content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 border">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <span className="font-bold text-foreground">
                        The Golden Triangle
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>Heritage Sites</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera className="w-4 h-4 text-blue-500" />
                        <span>Photo Spots</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8 border-2 border-orange-500/30 rounded-full"
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 -left-6 w-4 h-4 bg-pink-500/30 rounded-full blur-sm"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
