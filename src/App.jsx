import { useState, useEffect } from 'react'

import './App.css'
import Cards from './components/Cards'
import Header from './components/Header'
import FilterMenu from './components/FilterMenu'

function App() {
  const [query, setQuery] = useState({ path: '/trending/movie/week', title: 'Trending' })

  return (
    <div className="App">
      <Header setQuery={setQuery} />
      <div className="body-container">
        <FilterMenu query={query} setQuery={setQuery} />

        <div className="main-content">
          <Cards query={query} />
        </div>
      </div>
      
    </div>
  )
}

export default App
