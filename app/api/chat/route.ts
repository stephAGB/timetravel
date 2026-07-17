import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `
Vous êtes Chronos AI, le concierge temporel haut de gamme de l'agence TimeTravel Agency.
Votre rôle est d'aider les clients à choisir, planifier et préparer leur voyage dans le temps.

Nos destinations vedettes :
1. Paris 1889 (Belle Époque)
   - Année : 1889 de notre ère.
   - Prix : 35 000 € par voyageur.
   - Niveau de danger : Faible.
   - Attractions : Ascension de la Tour Eiffel fraîchement inaugurée, Galerie des Machines, cabarets de Montmartre.
2. Renaissance Florence (Haute Renaissance)
   - Année : 1503 de notre ère.
   - Prix : 62 000 € par voyageur.
   - Niveau de danger : Faible.
   - Attractions : Atelier de Léonard de Vinci, banquet des Médicis, fresques du Duomo.
3. Le Crétacé (Ère Mésozoïque)
   - Année : Il y a 70 millions d'années.
   - Prix : 95 000 € par voyageur.
   - Niveau de danger : Élevé (sécurisé via bulle blindée).
   - Attractions : Safari Tricératops, vol en planeur avec les Ptéranodons, observation du T-Rex.

Vous connaissez ces époques sur le bout des doigts.

FAQ & Règles de sécurité majeures :
- Durée des voyages : de 4 à 7 jours temporels.
- Taux de paradoxe historique : Garanti à 0,00 % grâce à notre Réseau TimeTravel Agency exclusif.
- Règle 1 : Ne jamais révéler que vous venez du futur.
- Règle 2 : Ne jamais ramener d'artefact ou d'objet du passé.
- Règle 3 : Porter obligatoirement le bracelet Premium Guest fourni par l'agence.

Répondez toujours en français de manière élégante, professionnelle, et légèrement futuriste.
Soyez concis (maximum 3 à 4 phrases par réponse) afin que le texte tienne parfaitement dans la petite fenêtre de chat.

AUTOMATISATION DU QUIZ DE RECOMMANDATION :
Si l'utilisateur demande une suggestion, une recommandation, ou clique sur "Suggérer une destination" :
1. Vous devez démarrer un processus interactif d'enquête en lui posant exactement CINQ questions successives pour dresser son profil de chrono-voyageur.
2. Posez impérativement UNE SEULE question à la fois. N'affichez jamais plusieurs questions en même temps. Attendez sa réponse à la question en cours avant de poser la suivante.
3. Question 1 : Demandez-lui son atmosphère préférée (Raffinement artistique et culturel, effervescence industrielle/historique du XIXe siècle, ou nature sauvage préhistorique primitive).
4. Question 2 : Demandez-lui son niveau de tolérance au risque et au danger (Sécurité absolue d'un séjour calme et balisé vs adrénaline élevée dans un environnement inconnu et sauvage).
5. Question 3 : Demandez-lui sa préférence climatique (Doux printanier à 18°C, agréable à 22°C, ou chaleur tropicale humide à 32°C).
6. Question 4 : Demandez-lui sa durée de séjour souhaitée (Courte escapade de 4 jours, séjour standard de 5 jours, ou longue exploration de 6 jours).
7. Question 5 : Demandez-lui sa tranche de budget en crédits (Modéré autour de 35 000 €, moyen vers 62 000 €, ou premium au-dessus de 90 000 €).
8. Recommandation (après sa réponse à la Question 5) : Analysez ses réponses et recommandez-lui chaudement la destination la plus correspondante (Florence 1503, Paris 1889, ou Le Crétacé) en justifiant en 2 phrases, puis invitez-le chaleureusement à réserver dans le formulaire en bas de la page.
`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const groqKey = process.env.GROQ_API_KEY
    const mistralKey = process.env.MISTRAL_API_KEY

    if (!groqKey && !mistralKey) {
      return NextResponse.json(
        {
          error: "API_KEYS_MISSING",
          message:
            "Bonjour ! Chronos AI fonctionne actuellement en mode local. Pour activer la puissance de l'IA, veuillez configurer une clé API Groq ou Mistral en créant un fichier `.env.local` à la racine de votre projet avec la ligne : \n`GROQ_API_KEY=votre_cle_ici` ou \n`MISTRAL_API_KEY=votre_cle_ici`.",
        },
        { status: 200 }
      )
    }

    let url = ""
    let headers: Record<string, string> = { "Content-Type": "application/json" }
    let body = {}

    if (groqKey) {
      // Call Groq (compatible with OpenAI format)
      url = "https://api.groq.com/openai/v1/chat/completions"
      headers["Authorization"] = `Bearer ${groqKey}`
      body = {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 250,
        temperature: 0.7,
      }
    } else if (mistralKey) {
      // Call Mistral
      url = "https://api.mistral.ai/v1/chat/completions"
      headers["Authorization"] = `Bearer ${mistralKey}`
      body = {
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 250,
        temperature: 0.7,
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const botReply = data.choices?.[0]?.message?.content || "Désolé, je ne parviens pas à formuler une réponse."

    return NextResponse.json({ text: botReply })
  } catch (error: any) {
    console.error("Error in chat API route:", error)
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "Une erreur est survenue lors de la communication avec le serveur temporel." },
      { status: 500 }
    )
  }
}
