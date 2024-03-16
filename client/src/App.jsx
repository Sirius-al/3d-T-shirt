import Home from './pages/Home'
import Customizer from './pages/Customizer'
import Canvas from './canvas/Index'

function App() {

  return (
    <main className='transition-all app ease'>
      {/* <h1 className="m-8 text-5xl font-bold text-center">ThreeJs</h1> */}
      {/* <br /> */}
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App
