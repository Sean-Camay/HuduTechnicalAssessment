import { useEffect, useState } from 'react'
import { useWizard } from '../../CustomHooks/useWizard'

export const SavedWorkNotification = () => {
  const { dispatch } = useWizard()
  const [hasSavedWork, setHasSavedWork] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('wizardState')
    if (savedData) {
      setHasSavedWork(true)
    }
  }, [])

  const handleResume = () => {
    try {
      const savedState = localStorage.getItem('wizardState')
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: 'SET_STEP', payload: parsedState.step })
        if (parsedState.base)
          dispatch({ type: 'SET_BASE', payload: parsedState.base })
        if (parsedState.recordTypes)
          dispatch({ type: 'SET_RECORDS', payload: parsedState.recordTypes })
        if (parsedState.trigger)
          dispatch({ type: 'SET_TRIGGER', payload: parsedState.trigger })
        if (parsedState.action)
          dispatch({ type: 'SET_ACTION', payload: parsedState.action })
      }
    } catch (error) {
      console.error('Failed to resume saved work:', error)
    }

    setHasSavedWork(false)
  }

  const handleDiscardState = () => {
    localStorage.removeItem('wizardState')

    dispatch({ type: 'SET_STEP', payload: 1 })
    dispatch({ type: 'SET_BASE', payload: '' })
    dispatch({ type: 'SET_RECORDS', payload: [] })
    dispatch({ type: 'SET_TRIGGER', payload: '' })
    dispatch({ type: 'SET_ACTION', payload: '' })
    setHasSavedWork(false)
  }

  if (!hasSavedWork) return null

  return (
    <div className='bg-blue-50 border border-blue-200 p-4 mb-6 rounded-md'>
      <h3 className='font-medium text-blue-800 mb-2'>
        You have a saved workflow in progress
      </h3>
      <p className='text-blue-700 mb-4'>
        Would you like to resume where you left off?
      </p>
      <div className='flex gap-4'>
        <button
          onClick={handleResume}
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
        >
          Resume
        </button>
        <button
          onClick={handleDiscardState}
          className='px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-100'
        >
          Start New
        </button>
      </div>
    </div>
  )
}
