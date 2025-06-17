interface BackButtonProps {
  goBack: () => void
}

export const BackButton = ({ goBack }: BackButtonProps) => {
  return (
    <button
      className='py-2.5 rounded text-[#1849a9] underline cursor-pointer'
      onClick={goBack}
    >
      ← Back
    </button>
  )
}
