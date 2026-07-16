import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { Agency } from "@/components/site/agency"
import { Destinations } from "@/components/site/destinations"
import { BookingForm } from "@/components/site/booking-form"
import { Chatbot } from "@/components/site/chatbot"
import { Footer } from "@/components/site/footer"

export default function Page() {
  return (
    <main className="relative min-h-svh bg-background text-foreground">
      <Navbar />
      <Hero />
      <Agency />
      <Destinations />
      <BookingForm />
      <Footer />
      <Chatbot />
    </main>
  )
}
