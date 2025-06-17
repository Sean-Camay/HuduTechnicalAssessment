import { Wizard } from '../../Components/Wizard/Wizard'
import { WizardProvider } from '../../Components/WizardProvider/WizardProvider'

export const MainView = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-white'>
      <WizardProvider>
        <Wizard />
      </WizardProvider>
    </div>
  )
}
