"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Send, Sparkles, X, MessageCircle } from "lucide-react"

type Message = { role: "bot" | "user"; text: string }

const DEFAULT_QUICK_REPLIES = ["Suggérer une destination", "Règles de sécurité", "FAQ"]

const QUIZ_QUESTIONS = [
  {
    question: "Question 1 : Quelle atmosphère vous attire le plus ?",
    options: ["Art & Renaissance", "Révolution Industrielle", "Exploration Préhistorique"],
  },
  {
    question: "Question 2 : Quel est votre rapport au risque et au danger ?",
    options: ["Sécurité absolue (Risque faible)", "Grande aventure (Risque élevé)"],
  },
  {
    question: "Question 3 : Quelle est votre température idéale ?",
    options: ["Doux printanier (18°C)", "Agréable méditerranéen (22°C)", "Chaleur tropicale (32°C)"],
  },
  {
    question: "Question 4 : Combien de jours temporels souhaitez-vous partir ?",
    options: ["Escapade de 4 jours", "Séjour standard de 5 jours", "Exploration de 6 jours"],
  },
  {
    question: "Question 5 : Quel budget en crédits souhaitez-vous allouer ?",
    options: ["Modéré (35 000 €)", "Moyen (62 000 €)", "Premium (95 000 €)"],
  },
]

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Salutations, voyageur. Je suis Chronos AI, votre concierge temporel. Comment puis-je vous aider à planifier votre voyage à travers les époques ?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [quizStep, setQuizStep] = useState<number>(0)
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open, loading])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setInput("")

    // 1. If in the middle of a quiz, run the frontend state machine
    if (quizStep > 0 && quizStep <= 5) {
      const userMessage: Message = { role: "user", text: trimmed }
      const newAnswers = [...quizAnswers, trimmed]
      setQuizAnswers(newAnswers)

      const nextStep = quizStep + 1

      if (nextStep <= 5) {
        setMessages((m) => [
          ...m,
          userMessage,
          { role: "bot", text: QUIZ_QUESTIONS[nextStep - 1].question }
        ])
        setQuizStep(nextStep)
      } else {
        // Quiz finished! Compile and send to Groq API
        setMessages((m) => [...m, userMessage])
        setLoading(true)

        try {
          const compiledPrompt = `Voici mon profil de chrono-voyageur :
1. Atmosphère : ${newAnswers[0]}
2. Rapport au risque : ${newAnswers[1]}
3. Climat : ${newAnswers[2]}
4. Durée du séjour : ${newAnswers[3]}
5. Budget : ${newAnswers[4]}

Recommande-moi la meilleure destination de l'agence parmi Paris 1889, Florence 1503 et Le Crétacé en m'expliquant pourquoi en 2 phrases, et invite-moi à réserver.`

          const apiMessages = [
            ...messages
              .filter((m) => m.role === "bot" && m.text.includes("Salutations"))
              .map((m) => ({
                role: "assistant" as const,
                content: m.text,
              })),
            { role: "user" as const, content: compiledPrompt }
          ]

          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: apiMessages }),
          })

          if (!res.ok) throw new Error("API request failed")

          const data = await res.json()
          
          if (data.error === "API_KEYS_MISSING") {
            setMessages((m) => [...m, { role: "bot", text: data.message }])
          } else {
            setMessages((m) => [
              ...m,
              {
                role: "bot",
                text: data.text || "Désolé, je ne parviens pas à formuler une recommandation.",
              },
            ])
          }
        } catch (err) {
          console.error(err)
          setMessages((m) => [
            ...m,
            {
              role: "bot",
              text: "Connexion impossible avec le réseau temporel. Veuillez réessayer.",
            },
          ])
        } finally {
          setLoading(false)
          setQuizStep(0)
          setQuizAnswers([])
        }
      }
      return
    }

    // 2. Start the quiz if requested
    if (
      trimmed === "Suggérer une destination" || 
      trimmed.toLowerCase().includes("suggérer") || 
      trimmed.toLowerCase().includes("recommander") || 
      trimmed.toLowerCase().includes("quiz")
    ) {
      setQuizStep(1)
      setQuizAnswers([])
      setMessages((m) => [
        ...m,
        { role: "user", text: trimmed },
        { role: "bot", text: "Super ! Démarrons notre questionnaire pour trouver votre époque idéale.\n\n" + QUIZ_QUESTIONS[0].question }
      ])
      return
    }

    // 3. Default fallback messaging (normal conversation)
    const userMessage: Message = { role: "user", text: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const apiMessages = updatedMessages.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) throw new Error("API request failed")

      const data = await res.json()
      
      if (data.error === "API_KEYS_MISSING") {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text: data.message,
          },
        ])
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text: data.text || "Désolé, je ne parviens pas à formuler une réponse.",
          },
        ])
      }
    } catch (err) {
      console.error(err)
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Connexion impossible avec le réseau temporel. Veuillez réessayer.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Get dynamic options depending on the current quiz step
  let displayOptions = DEFAULT_QUICK_REPLIES
  if (quizStep > 0 && quizStep <= 5 && !loading) {
    displayOptions = QUIZ_QUESTIONS[quizStep - 1].options
  }

  return (
    <>
      {/* launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open Chronos AI assistant"}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 neon-border"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-background bg-accent" />
        )}
      </button>

      {/* panel */}
      <div
        className={`fixed bottom-24 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: "min(32rem, 70svh)" }}
        aria-hidden={!open}
      >
        {/* header */}
        <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-4 py-3">
          <span className="relative grid size-10 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
            <Bot className="size-5" />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-[oklch(0.75_0.16_150)]" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Chronos AI</p>
            <p className="font-mono text-[0.7rem] text-muted-foreground">Concierge temporel · openai/gpt-oss-120b</p>
          </div>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm border border-border bg-secondary/60 text-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-secondary/60 px-3.5 py-2.5 text-sm text-muted-foreground animate-pulse">
                Chronos AI réfléchit...
              </div>
            </div>
          )}
        </div>

        {/* quick replies */}
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {displayOptions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={loading}
              className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
            >
              <Sparkles className="size-3" />
              {q}
            </button>
          ))}
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask Chronos AI…"
            className="min-w-0 flex-1 rounded-xl border border-border bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
            disabled={!input.trim() || loading}
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </>
  )
}
