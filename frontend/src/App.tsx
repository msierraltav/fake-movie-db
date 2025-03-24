import { useState } from 'react'
import './App.css'
import Search from './components/search/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Fake Movie DB</h1>
        <p> Saarch your favorite movie by : actor, year , genre or title </p>
      </header>
      <section>
        <Search/>
      </section>
    </>
  )
}

export default App
