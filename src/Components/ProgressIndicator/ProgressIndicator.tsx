import React from 'react'
import { WizardStep } from '../../store/WizardContext'

interface WizardProgressProps {
  currentStep: number
  onStepClick: (step: WizardStep) => void
}

export const ProgressIndicator = ({
  currentStep,
  onStepClick,
}: WizardProgressProps) => {
  const steps = [
    { id: 1 as WizardStep, label: 'Criteria' },
    { id: 2 as WizardStep, label: 'Trigger' },
    { id: 3 as WizardStep, label: 'Action' },
    { id: 4 as WizardStep, label: 'Review' },
  ]

  const shouldShowCheck = (stepId: number) => {
    if (stepId === 1) {
      return currentStep >= 3
    }
    return stepId < currentStep
  }

  const isStepClickable = (stepId: number) => {
    return stepId <= currentStep || stepId === currentStep + 1
  }

  return (
    <div className='mb-4 relative'>
      <div className='flex justify-between items-center relative'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <div
                className={`flex-grow h-[2px] ${
                  shouldShowCheck(index) ? 'bg-[#0f710e]' : 'bg-gray-300'
                }`}
              ></div>
            )}

            <div className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center 
                ${
                  shouldShowCheck(step.id)
                    ? 'bg-[#0f710e] border-[#0f710e]'
                    : step.id === currentStep
                    ? 'bg-gray-200 border-gray-300'
                    : 'bg-white border-gray-300'
                }
                ${
                  isStepClickable(step.id)
                    ? 'cursor-pointer hover:ring-2 hover:ring-blue-300'
                    : 'cursor-not-allowed opacity-60'
                }
                `}
                onClick={() => isStepClickable(step.id) && onStepClick(step.id)}
                role='button'
                tabIndex={isStepClickable(step.id) ? 0 : -1}
                aria-label={`Go to ${step.label} step`}
              >
                {shouldShowCheck(step.id) && (
                  <svg
                    className='w-4 h-4 text-white'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </div>
              <div
                className={`mt-2 text-sm font-medium text-gray-800 ${
                  isStepClickable(step.id)
                    ? 'cursor-pointer hover:text-blue-600'
                    : 'cursor-not-allowed opacity-60'
                }`}
                onClick={() => isStepClickable(step.id) && onStepClick(step.id)}
              >
                {step.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
