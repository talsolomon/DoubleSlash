import { Demo } from './sections/Demo'
import { Layers } from './sections/Layers'
import { GetIt } from './sections/GetIt'
import { Signal } from './sections/Signal'

export default function App() {
  return (
    <main className="bg-black">
      <Demo />
      <Layers />
      <GetIt />
      <Signal />
    </main>
  )
}
