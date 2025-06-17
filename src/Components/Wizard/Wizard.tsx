// import { Step } from '@mui/material'
import { useWizard } from '../../CustomHooks/useWizard'
import { WizardStep } from '../../store/WizardContext'
import { WorkflowSelector } from '../WorkflowSelector/WorkflowSelector'
import { RecordSelector } from '../RecordSelector/RecordSelector'
import { TriggerSelect } from '../TriggerSelect/TriggerSelect'
import { ActionSelector } from '../ActionSelector/ActionSelector'
import { ReviewSummary } from '../ReviewSummary/ReviewSummary'
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator'
import CloseIcon from '@mui/icons-material/Close'

export const Wizard = () => {
  const { state, dispatch } = useWizard()

  const nextStep = () =>
    dispatch({
      type: 'SET_STEP',
      payload: (state.step + 1) as WizardStep,
    })
  const prevStep = () =>
    dispatch({ type: 'SET_STEP', payload: (state.step - 1) as WizardStep })
  const goToStep = (step: WizardStep) =>
    dispatch({ type: 'SET_STEP', payload: step })

  const renderCurrentStep = () => {
    switch (state.step) {
      case 1:
        return <WorkflowSelector onNext={nextStep} />
      case 2:
        return <RecordSelector onNext={nextStep} onPrev={prevStep} />
      case 3:
        return <TriggerSelect onNext={nextStep} onPrev={prevStep} />
      case 4:
        return <ActionSelector onNext={nextStep} onPrev={prevStep} />
      case 5:
        return <ReviewSummary onPrev={prevStep} onEdit={goToStep} />
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col w-96'>
      <div className='flex flex-row justify-between'>
        <p className='mb-4'>New Workflow</p>
        <CloseIcon />
      </div>
      <ProgressIndicator currentStep={state.step} onStepClick={goToStep} />
      {renderCurrentStep()}
    </div>
  )
}
