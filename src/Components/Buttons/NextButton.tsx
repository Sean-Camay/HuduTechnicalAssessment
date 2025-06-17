import React from 'react'

interface NextButtonProps {
  onClick: () => void
  disabled?: boolean
  label?: string
  showBackButton?: boolean
  onBack?: () => void
  backLabel?: string
}

export const NextButton: React.FC<NextButtonProps> = ({
  onClick,
  disabled = false,
  label = 'Next',
  showBackButton = false,
  onBack,
  backLabel = 'Back',
}) => {
  return (
    <div className='flex justify-between mt-5'>
      {showBackButton ? (
        <button
          className='px-5 py-2.5 h-9 w-14 rounded text-blue-500 underline'
          onClick={onBack}
        >
          ← {backLabel}
        </button>
      ) : (
        <div />
      )}

      <button
        className={`h-9 w-14 rounded cursor-pointer text-white ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#1849a9] hover:bg-[#1849a9]'
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}
