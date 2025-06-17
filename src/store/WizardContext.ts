// wizard/WizardContext.tsx
import { createContext } from 'react'

export type WizardStep = 1 | 2 | 3 | 4 | 5

export interface WizardState {
  step: WizardStep
  base: string | null
  recordTypes: string[]
  trigger: string | null
  action: string | null
}

type Action =
  | { type: 'SET_STEP'; payload: WizardStep }
  | { type: 'SET_BASE'; payload: string }
  | { type: 'SET_RECORDS'; payload: string[] }
  | { type: 'SET_TRIGGER'; payload: string }
  | { type: 'SET_ACTION'; payload: string }

export const initialState: WizardState = {
  step: 1,
  base: null,
  recordTypes: [],
  trigger: null,
  action: null,
}

export const reducer = (s: WizardState, a: Action): WizardState => {
  switch (a.type) {
    case 'SET_STEP':
      return { ...s, step: a.payload }
    case 'SET_BASE':
      return { ...s, base: a.payload }
    case 'SET_RECORDS':
      return { ...s, recordTypes: a.payload }
    case 'SET_TRIGGER':
      return { ...s, trigger: a.payload }
    case 'SET_ACTION':
      return { ...s, action: a.payload }
    default:
      return s
  }
}

export const WizardContext = createContext<{
  state: WizardState
  dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => null })
