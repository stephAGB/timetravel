"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Send, Sparkles, X, MessageCircle } from "lucide-react"

type Message = { role: "bot" | "user"; text: string }

const quickReplies = ["Suggérer une destination", "Règles de sécurité", "FAQ"]

const cannedResponses: Record<string, string> = {
  "Suggérer une destination":
    "Pour un premier voyage, je recommande la Renaissance italienne (1503) — une timeline à faible danger avec un art à couper le souffle et une cuisine d'exception. Envie d'audace ? Néo-Tokyo 2150, c'est pure adrénaline.",
  "Règles de sécurité":
    "Trois règles d'or : ne jamais révéler que vous venez du futur, ne jamais retirer d'artefacts de la timeline, et toujours porter votre bracelet Réseau Chronos. Respectez-les et votre taux de paradoxe reste à 0,00 %.",
  FAQ: "Questions fréquentes : les voyages durent de 4 à 7 jours temporels. Le paiement se fait en euros (€). Le retour est garanti par notre ancre de réseau. Posez-moi toutes vos questions !",
}

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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open, loading])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { role: "user", text: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      // Map to API format
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
          text: "Connexion impossible avec le réseau temporel. Veuillez vérifier votre clé API et réessayer.",
        },
      ])
    } finally {
      setLoading(false)
    }
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
            <p className="font-mono text-[0.7rem] text-muted-foreground">Temporal concierge · online</p>
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
          {quickReplies.map((q) => (
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
