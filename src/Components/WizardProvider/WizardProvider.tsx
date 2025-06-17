import { useReducer } from 'react'
import {
  reducer,
  WizardContext,
  initialState,
  WizardState,
} from '../../store/WizardContext'

interface WizardProviderProps {
  children: React.ReactNode
}

export const WizardProvider = ({ children }: WizardProviderProps) => {
  const loadInitialState = (): WizardState => {
    try {
      const savedState = localStorage.getItem('wizardState')

      if (savedState) {
        return JSON.parse(savedState)
      }
    } catch (error) {
      console.error('Failed to load initial state from localStorage:', error)
    }
    return initialState
  }

  const [state, dispatch] = useReducer(reducer, loadInitialState())

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  )
}
