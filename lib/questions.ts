import type { QuestionItem } from "@/types/questionnaire"

// Section headers with titles and descriptions
export const SECTION_HEADERS = {
  A: {
    title: "Belonging Intelligence",
    description: "How connected, valued, and aligned you feel with the organization",
  },
  B: {
    title: "Talent Flow (AURA Model)",
    description: "Your journey from attraction through advocacy in the organization",
  },
  C: {
    title: "Leadership Climate",
    description: "The quality of trust, support, and belonging in your team leadership",
  },
  D: {
    title: "Culture Maturity",
    description: "The clarity, consistency, and capability of organizational culture",
  },
  E: {
    title: "Well-being & Inclusion",
    description: "Your well-being, psychological safety, and inclusion in the workplace",
  },
}

// Standard Edition - 60 items
export const STANDARD_QUESTIONS: QuestionItem[] = [
  // SECTION A: BELONGING (25 items)
  // Identity Fit (5)
  { id: "A1", text: "I feel this organization reflects my personal values.", section: "A", driver: "Identity" },
  { id: "A2", text: "I see myself fitting naturally into the culture here.", section: "A", driver: "Identity" },
  { id: "A3", text: "The way we work aligns with who I am as a person.", section: "A", driver: "Identity" },
  {
    id: "A4",
    text: "I feel a sense of personal identity in being part of this organization.",
    section: "A",
    driver: "Identity",
  },
  {
    id: "A5",
    text: "This workplace feels like a place where people like me belong.",
    section: "A",
    driver: "Identity",
  },

  // Connection (5)
  { id: "A6", text: "I feel connected to the people I work with.", section: "A", driver: "Connection" },
  { id: "A7", text: "I have at least one person at work I can rely on.", section: "A", driver: "Connection" },
  { id: "A8", text: "I feel socially included in my team.", section: "A", driver: "Connection" },
  { id: "A9", text: "I have meaningful work relationships here.", section: "A", driver: "Connection" },
  { id: "A10", text: "I feel like part of a community at work.", section: "A", driver: "Connection" },

  // Contribution (5)
  { id: "A11", text: "My work has a meaningful impact on the organization.", section: "A", driver: "Contribution" },
  { id: "A12", text: "I understand how my role contributes to our goals.", section: "A", driver: "Contribution" },
  { id: "A13", text: "I feel trusted to deliver important work.", section: "A", driver: "Contribution" },
  { id: "A14", text: "My strengths are used effectively in my role.", section: "A", driver: "Contribution" },
  { id: "A15", text: "I feel significant and valued for what I contribute.", section: "A", driver: "Contribution" },

  // Appreciation (5)
  { id: "A16", text: "My work is recognized by my manager.", section: "A", driver: "Appreciation" },
  { id: "A17", text: "I feel appreciated for the effort I put in.", section: "A", driver: "Appreciation" },
  { id: "A18", text: "I receive positive feedback when I do good work.", section: "A", driver: "Appreciation" },
  { id: "A19", text: "People acknowledge the value I bring.", section: "A", driver: "Appreciation" },
  { id: "A20", text: "I feel respected by those I work with.", section: "A", driver: "Appreciation" },

  // Growth Security (5)
  { id: "A21", text: "I see opportunities for growth in this organization.", section: "A", driver: "Growth" },
  { id: "A22", text: "I am learning new things that develop my abilities.", section: "A", driver: "Growth" },
  { id: "A23", text: "I feel supported to pursue my career goals.", section: "A", driver: "Growth" },
  { id: "A24", text: "I believe I have a future here if I continue to grow.", section: "A", driver: "Growth" },
  { id: "A25", text: "This workplace invests in my development.", section: "A", driver: "Growth" },

  // SECTION B: TALENT FLOW (12 items)
  // Attraction (3)
  {
    id: "B1",
    text: "The recruitment experience gave an accurate picture of the organization.",
    section: "B",
    driver: "Attraction",
  },
  {
    id: "B2",
    text: "The culture presented during hiring matches my real experience.",
    section: "B",
    driver: "Attraction",
  },
  {
    id: "B3",
    text: "I felt welcomed and integrated when I joined the organization.",
    section: "B",
    driver: "Attraction",
  },

  // Utilization (3)
  { id: "B4", text: "My skills are being used effectively in my current role.", section: "B", driver: "Utilization" },
  { id: "B5", text: "I have the tools and clarity needed to perform well.", section: "B", driver: "Utilization" },
  { id: "B6", text: "My job responsibilities match what I was hired to do.", section: "B", driver: "Utilization" },

  // Retention (3)
  { id: "B7", text: "I feel safe and comfortable staying long-term here.", section: "B", driver: "Retention" },
  {
    id: "B8",
    text: "I would choose to remain in this organization if given the option.",
    section: "B",
    driver: "Retention",
  },
  { id: "B9", text: "Working here is sustainable for my well-being and growth.", section: "B", driver: "Retention" },

  // Advocacy (3)
  { id: "B10", text: "I speak positively about this organization to others.", section: "B", driver: "Advocacy" },
  { id: "B11", text: "I would recommend this workplace to a friend.", section: "B", driver: "Advocacy" },
  { id: "B12", text: "I feel proud to be part of this organization.", section: "B", driver: "Advocacy" },

  // SECTION C: LEADERSHIP CLIMATE (16 items)
  // Trust (4)
  { id: "C1", text: "I trust my manager to make fair decisions.", section: "C", driver: "Trust" },
  { id: "C2", text: "My manager communicates honestly and transparently.", section: "C", driver: "Trust" },
  { id: "C3", text: "I feel safe raising issues with my manager.", section: "C", driver: "Trust" },
  { id: "C4", text: "I believe my manager acts with integrity.", section: "C", driver: "Trust" },

  // Support (4)
  { id: "C5", text: "My manager cares about my well-being.", section: "C", driver: "Support" },
  { id: "C6", text: "My manager provides guidance when needed.", section: "C", driver: "Support" },
  { id: "C7", text: "I feel supported when facing challenges at work.", section: "C", driver: "Support" },
  { id: "C8", text: "My manager listens to my concerns.", section: "C", driver: "Support" },

  // Performance (4)
  { id: "C9", text: "My manager sets clear expectations.", section: "C", driver: "Performance" },
  { id: "C10", text: "I receive constructive feedback to improve performance.", section: "C", driver: "Performance" },
  { id: "C11", text: "My manager holds people accountable fairly.", section: "C", driver: "Performance" },
  { id: "C12", text: "My team is encouraged to maintain high standards.", section: "C", driver: "Performance" },

  // Belonging Climate (4)
  {
    id: "C13",
    text: "My manager helps create a sense of belonging in the team.",
    section: "C",
    driver: "BelongingClimate",
  },
  {
    id: "C14",
    text: "People feel respected and valued under my manager's leadership.",
    section: "C",
    driver: "BelongingClimate",
  },
  {
    id: "C15",
    text: "My manager encourages open and inclusive conversations.",
    section: "C",
    driver: "BelongingClimate",
  },
  { id: "C16", text: "My manager treats everyone with dignity.", section: "C", driver: "BelongingClimate" },

  // SECTION D: CULTURE MATURITY (7 items)
  // Clarity (2)
  { id: "D1", text: "The organization's values and expectations are clear.", section: "D", driver: "Clarity" },
  {
    id: "D2",
    text: "People here understand what good behavior and performance look like.",
    section: "D",
    driver: "Clarity",
  },

  // Consistency (2)
  { id: "D3", text: "Leaders apply rules and expectations consistently.", section: "D", driver: "Consistency" },
  { id: "D4", text: "The culture feels stable and predictable.", section: "D", driver: "Consistency" },

  // Capability (2)
  { id: "D5", text: "We have systems and processes that support how we work.", section: "D", driver: "Capability" },
  { id: "D6", text: "Our workplace is well-structured for effective performance.", section: "D", driver: "Capability" },

  // Community (1)
  {
    id: "D7",
    text: "This organization feels like a community where people belong.",
    section: "D",
    driver: "Community",
  },
]

// Enterprise Edition - 80 items (Standard + 20 additional)
export const ENTERPRISE_QUESTIONS: QuestionItem[] = [
  ...STANDARD_QUESTIONS,

  // SECTION A Extended: ADVANCED BELONGING (5 new)
  {
    id: "A26",
    text: "I feel psychologically safe expressing my authentic self at work.",
    section: "A",
    driver: "Advanced",
  },
  { id: "A27", text: "I rarely feel isolated or excluded in this workplace.", section: "A", driver: "Advanced" },
  {
    id: "A28",
    text: "My opinions are taken seriously, regardless of my role or level.",
    section: "A",
    driver: "Advanced",
  },
  {
    id: "A29",
    text: "I feel a sense of ownership toward the success of this workplace.",
    section: "A",
    driver: "Advanced",
  },
  {
    id: "A30",
    text: "The culture makes it easy for new people to integrate and feel they belong.",
    section: "A",
    driver: "Advanced",
  },

  // SECTION C Extended: EXTENDED LEADERSHIP (5 new)
  { id: "C17", text: "My manager's actions consistently match their words.", section: "C", driver: "Integrity" },
  {
    id: "C18",
    text: "My manager prevents or addresses toxic behaviors in the team.",
    section: "C",
    driver: "Integrity",
  },
  { id: "C19", text: "My manager handles conflicts fairly and calmly.", section: "C", driver: "Integrity" },
  {
    id: "C20",
    text: "My manager demonstrates emotional intelligence in difficult situations.",
    section: "C",
    driver: "Integrity",
  },
  {
    id: "C21",
    text: "My team's experience is consistent regardless of who is watching.",
    section: "C",
    driver: "Integrity",
  },

  // SECTION E: WELL-BEING & INCLUSION (10 new)
  // Well-being (5)
  { id: "E1", text: "My workload is manageable.", section: "E", driver: "WellBeing" },
  { id: "E2", text: "I rarely feel emotionally exhausted by my work.", section: "E", driver: "WellBeing" },
  { id: "E3", text: "I have time to recover between intense work periods.", section: "E", driver: "WellBeing" },
  { id: "E4", text: "I feel the organization genuinely supports my well-being.", section: "E", driver: "WellBeing" },
  {
    id: "E5",
    text: "I can raise concerns about stress without fear of negative consequences.",
    section: "E",
    driver: "WellBeing",
  },

  // Inclusion & Identity Safety (6)
  { id: "E6", text: "I feel respected regardless of my background or identity.", section: "E", driver: "Inclusion" },
  { id: "E7", text: "People like me have equal opportunities to grow here.", section: "E", driver: "Inclusion" },
  { id: "E8", text: "I feel safe sharing my perspective in meetings.", section: "E", driver: "Inclusion" },
  { id: "E9", text: "Decisions are made fairly, without favoritism.", section: "E", driver: "Inclusion" },
  { id: "E10", text: "The culture allows diverse people to thrive.", section: "E", driver: "Inclusion" },
  {
    id: "E11",
    text: "I never worry that aspects of my identity will limit my opportunities.",
    section: "E",
    driver: "Inclusion",
  },
]
