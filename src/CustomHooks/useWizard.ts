import { useContext } from 'react'
import { WizardContext } from '../store/WizardContext'

export const useWizard = () => useContext(WizardContext)
