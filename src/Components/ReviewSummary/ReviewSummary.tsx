import { useWizard } from '../../CustomHooks/useWizard'
import { WizardStep } from '../../store/WizardContext'
import { BackButton } from '../Buttons/BackButton'
import EditIcon from '@mui/icons-material/Edit'
import { FinishLaterButton } from '../Buttons/FinishLater'

interface ActionSelectorProps {
  onPrev: () => void
  onEdit: (step: WizardStep) => void
}

export const ReviewSummary = ({ onPrev, onEdit }: ActionSelectorProps) => {
  const { state } = useWizard()

  const formatRecordTypeName = (id: string): string => {
    return id
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
  }

  return (
    <div className='flex flex-col gap-5 max-w-3xl'>
      <h2 className='text-base text-black'>
        Review your workflow below. Click a step to make edits if needed.
      </h2>

      <div className='p-4 border border-gray-200 rounded-lg bg-gray-50'>
        <p className='mb-3 text-sm'>
          When any of the following record types are created, add a(n){' '}
          {state.action}.
        </p>

        <div className='mb-3'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='font-medium'>Selected Record Types:</h3>
            <button
              onClick={() => onEdit(2)}
              className='text-blue-500 flex items-center text-sm'
            >
              <EditIcon fontSize='small' className='mr-1' />
              Edit
            </button>
          </div>

          <ul className='list-disc pl-5 space-y-1'>
            {state.recordTypes.map((recordType) => (
              <li key={recordType} className='text-gray-700'>
                {formatRecordTypeName(recordType)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='flex justify-between items-center border-t border-gray-200'>
        <BackButton goBack={onPrev} />

        <FinishLaterButton />

        <button className='h-9 w-20 mt-5 rounded text-white bg-[#1849a9] cursor-pointer text-sm'>
          Save Draft
        </button>
      </div>
    </div>
  )
}
