import { useState } from 'react'
import { useWizard } from '../../CustomHooks/useWizard'

export const FinishLaterButton = () => {
  const { state } = useWizard()
  const [isSaved, setIsSaved] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSaveForLater = () => {
    localStorage.setItem('wizardState', JSON.stringify(state))

    setIsSaved(true)
    setShowFeedback(true)

    setTimeout(() => {
      setShowFeedback(false)
    }, 3000)

    console.log('Workflow saved for later completion')
  }

  return (
    <div className='relative'>
      <button
        className='text-[#1849a9] cursor-pointer font-medium'
        onClick={handleSaveForLater}
        aria-label='Save and finish later'
      >
        Save and Finish Later
      </button>

      {showFeedback && (
        <div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md whitespace-nowrap'>
          {isSaved ? 'Progress saved successfully!' : 'Error saving progress'}
        </div>
      )}
    </div>
  )
}
