import Genres from './Genres'

function FilterMenu({ query, setQuery }) {
    return (
        <div className="filter-menu">
            <div className="title">Genres</div>
            <Genres query={query} setQuery={setQuery} />
        </div>
    )
}

export default FilterMenu