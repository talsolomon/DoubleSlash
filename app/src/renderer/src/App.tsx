import { useState, useEffect } from 'react'
import Pill from './views/Pill'
import Panel from './views/Panel'

type View = 'pill' | 'panel'

export default function App() {
  const [view, setView] = useState<View>('pill')

  useEffect(() => {
    return window.ds.onViewSet((v) => setView(v as View))
  }, [])

  return view === 'panel' ? <Panel /> : <Pill />
}
