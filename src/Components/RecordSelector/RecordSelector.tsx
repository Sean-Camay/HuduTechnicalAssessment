import { useState } from 'react'
import { useWizard } from '../../CustomHooks/useWizard'
import KeyIcon from '@mui/icons-material/Key'
import ArticleIcon from '@mui/icons-material/Article'
import CheckIcon from '@mui/icons-material/Check'
import LanguageIcon from '@mui/icons-material/Language'
import ArtTrackIcon from '@mui/icons-material/ArtTrack'
import CellTowerIcon from '@mui/icons-material/CellTower'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import { Checkbox } from '@mui/material'
import { BackButton } from '../Buttons/BackButton'
import { NextButton } from '../Buttons/NextButton'

interface RecordSelectorProps {
  onNext: () => void
  onPrev: () => void
}

export const RecordSelector = ({ onNext, onPrev }: RecordSelectorProps) => {
  const { state, dispatch } = useWizard()
  const [selected, setSelected] = useState<string[]>(state.recordTypes)

  const recordTypes = [
    {
      id: 'password',
      icon: <KeyIcon />,
      name: 'Password',
    },
    {
      id: 'companyKBArticle',
      icon: <ArticleIcon />,
      name: 'Company KB Article',
    },
    {
      id: 'centralKBArticle',
      icon: <ArticleIcon />,
      name: 'Central KB Article',
    },
    {
      id: 'process',
      icon: <CheckIcon />,
      name: 'Process',
    },
    {
      id: 'website',
      icon: <LanguageIcon />,
      name: 'Website',
    },
    {
      id: 'rack',
      icon: <ArtTrackIcon />,
      name: 'Rack',
    },
    {
      id: 'network',
      icon: <CellTowerIcon />,
      name: 'Network',
    },
    {
      id: 'asset',
      icon: <PanoramaFishEyeIcon />,
      name: 'Asset',
    },
  ]

  const isAllSelected = selected.length === recordTypes.length

  const isSomeSelected = selected.length > 0 && !isAllSelected

  const handleOptionSelect = (recordId: string) => {
    const newSelected = selected.includes(recordId)
      ? selected.filter((id) => id !== recordId)
      : [...selected, recordId]

    setSelected(newSelected)
    dispatch({ type: 'SET_RECORDS', payload: newSelected })
  }

  const handleSelectAll = () => {
    let newSelected: string[]
    if (isAllSelected) {
      newSelected = []
    } else {
      newSelected = recordTypes.map((record) => record.id)
    }
    setSelected(newSelected)
    dispatch({ type: 'SET_RECORDS', payload: newSelected })
  }

  return (
    <div className='flex flex-col gap-5 max-w-3xl'>
      <h2 className='text-base mb-5'>
        Which record type(s) should be included
      </h2>

      <div className='flex flex-col gap-2.5 text-black'>
        {recordTypes.map((record) => (
          <button
            key={record.id}
            className={`flex items-center h-9 p-4 border rounded-lg text-left cursor-pointer ${
              selected.includes(record.id)
                ? 'border-blue-500 bg-blue-100 border-3'
                : 'border-gray-300'
            }`}
            onClick={() => handleOptionSelect(record.id)}
          >
            <span className='text-2xl mr-4 min-w-[30px]'>{record.icon}</span>
            <span className='text-base'>{record.name}</span>
          </button>
        ))}
        <div className='flex items-center'>
          <Checkbox
            checked={isAllSelected}
            indeterminate={isSomeSelected}
            onChange={handleSelectAll}
            color='primary'
          />
          <span className='ml-2 font-medium'>Select All</span>
        </div>
      </div>

      <div className='flex justify-between items-center border-t border-gray-200'>
        <BackButton goBack={onPrev} />
        <NextButton onClick={onNext} disabled={selected.length === 0} />
      </div>
    </div>
  )
}
