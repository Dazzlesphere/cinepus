import { useState } from 'react'

function Header({ setQuery }) {
  const [searchVal, setSearchVal] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchVal.length) {
      const newQuery = `/search/movie?query=${searchVal}`
      setQuery({ path: newQuery, title: `Search Results: ${searchVal}` })
    }
  }

  return (
    <div className="header">
        <div className="logo"><h1>CinePass</h1></div>
        <form className="search" onSubmit={handleSubmit}>
            <button type="submit" className="btn search"><i className="fa-solid fa-magnifying-glass" /></button>
            <input 
              type="text" 
              placeholder="Search for Movies" 
              className="input"
              onChange={(e) => setSearchVal(e.target.value)}
            />
        </form>
    </div>
  )
}

export default Header