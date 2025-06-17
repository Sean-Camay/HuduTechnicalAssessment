import { useReducer } from 'react'
import { reducer, WizardContext, initialState } from '../../store/WizardContext'

interface WizardProviderProps {
  children: React.ReactNode
}

export const WizardProvider = ({ children }: WizardProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  )
}
