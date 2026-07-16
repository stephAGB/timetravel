"use client"

import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { Agency } from "@/components/site/agency"
import { Destinations } from "@/components/site/destinations"
import { BookingForm } from "@/components/site/booking-form"
import { Chatbot } from "@/components/site/chatbot"
import { Footer } from "@/components/site/footer"
import { motion } from "framer-motion"

export default function Page() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-svh bg-background text-foreground"
    >
      <Navbar />
      <Hero />
      <Agency />
      <Destinations />
      <BookingForm />
      <Footer />
      <Chatbot />
    </motion.main>
  )
}
