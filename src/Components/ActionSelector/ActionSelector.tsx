import { useState } from 'react'
import { useWizard } from '../../CustomHooks/useWizard'
import { BackButton } from '../Buttons/BackButton'
import { NextButton } from '../Buttons/NextButton'
import FlagIcon from '@mui/icons-material/Flag'
import EmailIcon from '@mui/icons-material/Email'
import WebhookIcon from '@mui/icons-material/Webhook'
import { FinishLaterButton } from '../Buttons/FinishLater'

interface ActionSelectorProps {
  onNext: () => void
  onPrev: () => void
}

export const ActionSelector = ({ onNext, onPrev }: ActionSelectorProps) => {
  const { state, dispatch } = useWizard()
  const [selected, setSelected] = useState(state.action ?? '')

  const actions = [
    { id: 'flag', name: 'Add flag', icon: <FlagIcon /> },
    { id: 'email', name: 'Send email', icon: <EmailIcon /> },
    { id: 'webhook', name: 'Send webhook', icon: <WebhookIcon /> },
  ]

  const handleOptionSelect = (id: string) => {
    setSelected(id)
    dispatch({ type: 'SET_ACTION', payload: id })
  }

  const handleNext = () => {
    dispatch({ type: 'SET_ACTION', payload: selected })
    onNext()
  }

  return (
    <div className='flex flex-col gap-5 max-w-3xl'>
      <h2 className='text-base mb-1 text-black'>
        What should happen once the workflow begins?
      </h2>

      <p className='text-black text-sm'>
        Select at least 1 action to continue. You Can add additional actions
        later
      </p>

      <div className='flex flex-col gap-2.5'>
        {actions.map((action) => (
          <button
            key={action.id}
            className={`flex items-center h-9 p-4 border rounded-lg text-left cursor-pointer ${
              selected === action.id
                ? 'border-blue-500 bg-blue-100 border-3 hover:bg-blue-200'
                : 'border-gray-300'
            }`}
            onClick={() => handleOptionSelect(action.id)}
          >
            <span className='text-2xl mr-4 min-w-[30px]'>{action.icon}</span>
            <span className='text-black'>{action.name}</span>
          </button>
        ))}
      </div>

      <div className='flex justify-between border-t border-gray-200'>
        <BackButton goBack={onPrev} />

        <FinishLaterButton />

        <NextButton onClick={handleNext} disabled={!selected} />
      </div>
    </div>
  )
}
