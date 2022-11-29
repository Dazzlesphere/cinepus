import { useState, useEffect } from 'react'

import genreList from '../data/genres'

const Genres = ({ query, setQuery }) => {
    const [activeId, setActiveId] = useState(null)

    const clickHandler = (event) => {
        const genre_id = event.target.attributes.id.value
        const genre_name = event.target.innerText
        const newQuery = `/discover/movie?with_genres=${genre_id}`
        setActiveId(genre_id)
        setQuery({ path: newQuery, title: `Genre: ${genre_name}` })
    }

    return (
        <ul>
            {
                genreList.map((item, index) => {
                    const className = (query.path.indexOf('with_genres') >= 0 && item.id == activeId) ? 'item active' : 'item'
                    return (<li className={className} key={item.id} id={item.id} onClick={clickHandler}>{item.name}</li>)
                })
            }
        </ul>
    )
}

export default Genres