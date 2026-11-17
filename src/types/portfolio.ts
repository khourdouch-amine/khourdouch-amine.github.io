export type ExperienceLevel =
  | 'mastered'
  | 'advanced'
  | 'practiced'
  | 'theoretical'
  | 'exploratory'
  | 'reference'

export interface Discipline {
  id: string
  number: string
  title: string
  titleFr: string
  category: string
  summary: string
  summaryFr: string
  competencies: string[]
  competenciesFr: string[]
  tools: string[]
  methods: string[]
  standards: string[]
}

export interface SkillEvidence {
  name: string
  disciplineId: string
  level: ExperienceLevel
  evidence?: string
}

export type ProjectStatus =
  | 'completed'
  | 'prototype'
  | 'study'
  | 'research-direction'

export interface ProjectMetric {
  label: string
  value: string
  context: string
}

export interface Project {
  id: string
  number: string
  title: string
  titleFr: string
  subtitle: string
  subtitleFr: string
  year: string
  status: ProjectStatus
  statusLabel: string
  statusLabelFr: string
  summary: string
  summaryFr: string
  problem: string
  problemFr: string
  objectives: string[]
  objectivesFr: string[]
  disciplines: string[]
  methods: string[]
  tools: string[]
  metrics: ProjectMetric[]
  limitations: string[]
  limitationsFr: string[]
  futureWork: string[]
  futureWorkFr: string[]
  links: {
    label: string
    url: string
  }[]
}
