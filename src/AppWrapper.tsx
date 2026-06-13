import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Onboarding from './components/Onboarding'
import App from './App'

const DONE_KEY = 'quotekeeper-pro_onboarded_v1'
type Phase = 'splash' | 'onboard' | 'app'

export default function AppWrapper() {
  const [phase, setPhase] = useState<Phase>('splash')
  const features = ["Save quotes with source", "Tag by theme and author", "Daily quote widget", "Export collection"]
  return (
    <>
      {phase === 'splash' && <SplashScreen onDone={()=>setPhase(localStorage.getItem(DONE_KEY)?'app':'onboard')} color1="#fb923c" color2="#f97316" emoji="💬" name="QuoteKeeper Pro" tagline="Save and organize favorite quotes"/>}
      {phase === 'onboard' && <Onboarding onDone={()=>{localStorage.setItem(DONE_KEY,'1');setPhase('app')}} color1="#fb923c" emoji="💬" name="QuoteKeeper Pro" features={features}/>}
      {phase === 'app' && <App/>}
    </>
  )
}