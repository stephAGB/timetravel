export type DangerLevel = "Faible" | "Modéré" | "Élevé"

export type Destination = {
  id: string
  name: string
  era: string
  year: string
  image: string
  tagline: string
  danger: DangerLevel
  duration: string
  priceCredits: string
  attractions: string[]
  description: string
  highlights: { label: string; value: string }[]
}

export const destinations: Destination[] = [
  {
    id: "ancient-egypt",
    name: "Égypte antique",
    era: "Ancien Empire",
    year: "2560 av. J.-C.",
    image: "/destinations/ancient-egypt.png",
    tagline: "Assistez à l'édification des pyramides",
    danger: "Modéré",
    duration: "7 jours temporels",
    priceCredits: "48 000 €",
    attractions: [
      "Construction de la Grande Pyramide",
      "Croisière sur la barque royale du Nil",
      "Cérémonie de dévoilement du Sphinx",
    ],
    description:
      "Posez le pied sur le plateau de Gizeh à l'apogée de la Quatrième Dynastie. Regardez les blocs de calcaire s'élever en lévitation, dînez avec les grands prêtres et naviguez sur le Nil sous un ciel épargné par la lumière moderne. Nos chrono-guides gèrent tous les protocoles de langue et de protection thermique.",
    highlights: [
      { label: "Climat", value: "Aride 38°C" },
      { label: "Langue", value: "Égyptien ancien" },
      { label: "Taille du groupe", value: "6 max" },
    ],
  },
  {
    id: "italian-renaissance",
    name: "Renaissance italienne",
    era: "Haute Renaissance",
    year: "1503 apr. J.-C.",
    image: "/destinations/italian-renaissance.png",
    tagline: "Dînez avec De Vinci à Florence",
    danger: "Faible",
    duration: "5 jours temporels",
    priceCredits: "62 000 €",
    attractions: [
      "Visite de l'atelier de De Vinci",
      "Banquet de gala des Médicis",
      "Aperçu des fresques du Duomo",
    ],
    description:
      "Flânez dans les rues pavées de Florence pendant la renaissance créative de l'humanité. Profitez d'une audience privée dans l'atelier de Léonard, assistez à un bal masqué des Médicis et regardez naître des chefs-d'œuvre. La timeline la plus sûre et la plus raffinée de notre catalogue.",
    highlights: [
      { label: "Climat", value: "Doux 22°C" },
      { label: "Langue", value: "Italien toscan" },
      { label: "Taille du groupe", value: "8 max" },
    ],
  },
  {
    id: "neo-tokyo",
    name: "Néo-Tokyo",
    era: "Post-Singularité",
    year: "2150 apr. J.-C.",
    image: "/destinations/neo-tokyo.png",
    tagline: "Parcourez les voies néon de demain",
    danger: "Élevé",
    duration: "4 jours temporels",
    priceCredits: "91 000 €",
    attractions: [
      "Course de voies aériennes antigravité",
      "Dégustation de cuisine synthétique",
      "Vie nocturne du quartier sentient",
    ],
    description:
      "Plongez dans une mégapole battue par la pluie où l'IA et l'humanité ont fusionné. Faites la course en capsules antigravité sur les voies néon, goûtez à la cuisine synthétique moléculaire et explorez des quartiers dotés de leur propre conscience. Recommandé aux voyageurs temporels expérimentés uniquement.",
    highlights: [
      { label: "Climat", value: "Humide 19°C" },
      { label: "Langue", value: "Néo-Nihongo" },
      { label: "Taille du groupe", value: "4 max" },
    ],
  },
]
