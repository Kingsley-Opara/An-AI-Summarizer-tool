import './App.css'
import Hero from "./components/Hero"
// import Demo from './components/Demo'
import Test from './components/Test'
// import Hero from '@/src/components/Hero'

function App() {
  return (
    <main className=''>
        <div className="main">
            <div className='gradient'/>
        </div>
        <div className="app">
            <Hero/>
            <Test/>
            {/* <Demo/> */}
        </div>
    </main>
  )
}

export default App
