import { useState } from 'react'
import { useWizard } from '../../CustomHooks/useWizard'
import StoreIcon from '@mui/icons-material/Store'
import DescriptionIcon from '@mui/icons-material/Description'
import LanguageIcon from '@mui/icons-material/Language'
import EventIcon from '@mui/icons-material/Event'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import { NextButton } from '../Buttons/NextButton'

interface WorkflowSelectorProps {
  onNext: () => void
}

export const WorkflowSelector = ({ onNext }: WorkflowSelectorProps) => {
  const { state, dispatch } = useWizard()

  const [selected, setSelected] = useState(state.base ?? '')

  const options = [
    { id: 'Company', icon: <StoreIcon /> },
    { id: 'Record', icon: <DescriptionIcon /> },
    { id: 'Website', icon: <LanguageIcon /> },
    { id: 'Expiration', icon: <EventIcon /> },
    { id: 'User', icon: <PersonIcon /> },
    { id: 'Group', icon: <GroupIcon /> },
    { id: 'Integration', icon: <ElectricalServicesIcon /> },
  ]

  const handleOptionSelect = (optionId: string) => {
    console.log('Selected option:', optionId)
    setSelected(optionId)
    dispatch({ type: 'SET_BASE', payload: optionId })
  }

  return (
    <div className='flex flex-col gap-5 max-w-3xl'>
      <p className='text-base mb-1 text-black'>
        What will this workflow be based on?
      </p>

      <div className='flex flex-col gap-2.5'>
        {options.map((option) => (
          <button
            key={option.id}
            className={`flex items-center h-9 p-4 border rounded-lg transition-all duration-200 text-left cursor-pointer ${
              selected === option.id
                ? 'border-blue-500 bg-blue-200 border-4 hover:bg-blue-200'
                : 'border-gray-300'
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <span className='text-2xl mr-4 min-w-[30px]'>{option.icon}</span>
            <span className='text-black'>{option.id}</span>
          </button>
        ))}
      </div>

      <div className='flex justify-end border-t border-gray-200'>
        <NextButton onClick={onNext} disabled={!selected} />
      </div>
    </div>
  )
}
