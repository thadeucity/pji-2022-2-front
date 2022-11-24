type CountingTypes = 'reps' | 'kilometers' | 'minutes';

type CountingTypesLabels = Record<CountingTypes, {
  longLabel: string
  shortLabel: string
  suffix: string
}>;

export const EXERCISES_TYPES_LABELS: CountingTypesLabels = {
  reps: {
    longLabel: 'Repetições',
    shortLabel: 'Rep',
    suffix: '',
  },
  minutes: {
    longLabel: 'Minutos',
    shortLabel: 'Min',
    suffix: 'min',
  },
  kilometers: {
    longLabel: 'Quilômetros',
    shortLabel: 'Km',
    suffix: 'km',
  }
}

export const AVAILABLE_EXERCISES: Record<string, {label: string, type: CountingTypes}> = {
  push_ups: { label: 'Flexões', type: 'reps' },
  pull_ups: { label: 'Barra Fixa', type: 'reps' },
  burpees: { label: 'Burp', type: 'reps' },
  sit_ups: { label: 'Abdominais', type: 'reps' },
  running: { label: 'Corrida', type: 'kilometers' },
  rope: { label: 'Corda', type: 'minutes' },
  squats: { label: 'Agachamentos', type: 'reps' },
  leg_lifts: { label: 'Elevação de perna', type: 'reps' },
  swimming: { label: 'Natação', type: 'minutes' },
  climbing: { label: 'Escalador', type: 'reps' },
}

export const AVAILABLE_EXERCISES_ARRAY = Object.entries(AVAILABLE_EXERCISES)
  .map(([key, val]) => ({ 
    value: key, typeLabel: EXERCISES_TYPES_LABELS[val.type] || '', ...val 
  }))

export const EXERCISES_POINTS_MULTIPLIER = {
  push_ups: 15,
  pull_ups: 30,
  burpees: 10,
  sit_ups: 8,
  running: 2,
  rope: 15,
  squats: 9,
  leg_lifts: 7,
  swimming: 15,
  climbing: 5,
}