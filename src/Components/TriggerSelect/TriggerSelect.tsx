import { useState } from 'react'
import { useWizard } from '../../CustomHooks/useWizard'
import { BackButton } from '../Buttons/BackButton'
import { NextButton } from '../Buttons/NextButton'
import { FinishLaterButton } from '../Buttons/FinishLater'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

interface RecordSelectorProps {
  onNext: () => void
  onPrev: () => void
}

export const TriggerSelect = ({ onNext, onPrev }: RecordSelectorProps) => {
  const { state, dispatch } = useWizard()
  const [selected, setSelected] = useState(state.trigger ?? '')

  const triggers = [
    { id: 'created', name: 'Record created', icon: <AddIcon /> },
    { id: 'updated', name: 'Record updated', icon: <EditIcon /> },
  ]

  const handleOptionSelect = (id: string) => {
    setSelected(id)
    dispatch({ type: 'SET_TRIGGER', payload: id })
  }

  const handleNext = () => {
    // Ensure the selection is in the state before proceeding
    dispatch({ type: 'SET_TRIGGER', payload: selected })
    onNext()
  }

  return (
    <div className='flex flex-col gap-5 max-w-3xl mx-auto'>
      <h2 className='text-base mb-5 text-black'>
        What should trigger this workflow?
      </h2>

      <div className='flex flex-col gap-2.5'>
        {triggers.map((trigger) => (
          <button
            key={trigger.id}
            className={`flex items-center h-9 p-4 border rounded-lg text-left cursor-pointer ${
              selected === trigger.id
                ? 'border-blue-500 bg-blue-100 border-3'
                : 'border-gray-300'
            }`}
            onClick={() => handleOptionSelect(trigger.id)}
          >
            <span className='text-2xl mr-4 min-w-[30px]'>{trigger.icon}</span>
            <span className='text-black'>{trigger.name}</span>
          </button>
        ))}
      </div>

      <div className='flex justify-end border-t border-gray-200'>
        <BackButton goBack={onPrev} />

        <FinishLaterButton />

        <NextButton onClick={handleNext} disabled={!selected} />
      </div>
    </div>
  )
}
