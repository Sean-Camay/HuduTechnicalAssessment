import { Wizard } from '../../Components/Wizard/Wizard'
import { WizardProvider } from '../../Components/WizardProvider/WizardProvider'
import { SavedWorkNotification } from '../../Components/Notifications/SavedWork'

export const MainView = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-white'>
      <WizardProvider>
        <SavedWorkNotification />
        <Wizard />
      </WizardProvider>
    </div>
  )
}
