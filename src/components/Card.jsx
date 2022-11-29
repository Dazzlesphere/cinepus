const Card = ({ item, clickHandler, isActive }) => {
    const getYear = releaseDate => {
        const d = new Date(releaseDate)
        return d.getFullYear()
    }
    return (
        <div className={isActive ? "card active" : "card"} onClick={clickHandler}> 
            <div className="thumb" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w300/${item.poster_path})` }}></div>
            <div className="details">
                <div className="title">{item.title}</div>
                <div className="year">{getYear(item.release_date)}</div>
            </div>
        </div>
    )
}

export default Card