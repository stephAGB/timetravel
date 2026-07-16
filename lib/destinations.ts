export type DangerLevel = "Faible" | "Modéré" | "Élevé"

export type Destination = {
  id: string
  name: string
  era: string
  year: string
  image: string
  video: string
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
    id: "paris-1889",
    name: "Paris 1889",
    era: "Belle Époque",
    year: "1889 apr. J.-C.",
    image: "/destinations/paris-1889.png",
    video: "/destinations/paris1889 vid.mp4",
    tagline: "Vivez l'inauguration de la Tour Eiffel",
    danger: "Faible",
    duration: "4 jours temporels",
    priceCredits: "35 000 €",
    attractions: [
      "Ascension de la toute nouvelle Tour Eiffel",
      "Visite de la Galerie des Machines",
      "Soirée cabaret à Montmartre",
    ],
    description:
      "Plongez dans l'effervescence de la Belle Époque lors de l'Exposition Universelle de 1889. Admirez la Tour Eiffel fraîchement achevée sous les feux d'artifice, explorez les pavillons des innovations technologiques et profitez de l'atmosphère bohème de Paris au XIXe siècle.",
    highlights: [
      { label: "Climat", value: "Tempéré 18°C" },
      { label: "Langue", value: "Français" },
      { label: "Taille du groupe", value: "10 max" },
    ],
  },
  {
    id: "renaissance-florence",
    name: "Renaissance Florence",
    era: "Haute Renaissance",
    year: "1503 apr. J.-C.",
    image: "/destinations/renaissance-florence.png",
    video: "/destinations/renaissance florence vid v2.mp4",
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
    id: "cretaceous",
    name: "Le Crétacé",
    era: "Mésozoïque",
    year: "70 MA av. J.-C.",
    image: "/destinations/cretaceous.png",
    video: "/destinations/Cretacee_vid.mp4",
    tagline: "Explorez un monde de géants préhistoriques",
    danger: "Élevé",
    duration: "6 jours temporels",
    priceCredits: "95 000 €",
    attractions: [
      "Safari d'observation des Tricératops",
      "Vol en planeur avec les Ptéranodons",
      "Observation sécurisée du T-Rex",
    ],
    description:
      "Remontez le temps de 70 millions d'années pour observer une Terre sauvage et primitive. Admirez la végétation luxuriante et observez les plus grands dinosaures ayant jamais existé depuis nos bulles d'observation blindées. Une expédition palpitante pour les aventuriers chevronnés.",
    highlights: [
      { label: "Climat", value: "Chaud & Humide 32°C" },
      { label: "Sécurité", value: "Bulle blindée" },
      { label: "Taille du groupe", value: "4 max" },
    ],
  },
]
