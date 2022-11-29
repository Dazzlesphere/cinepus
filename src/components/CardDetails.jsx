import { useState, useEffect } from 'react'

import genreList from '../data/genres'

const CardDetails = ({ item, video, videoActive, playClickHandler }) => {
    const { id, title, overview, backdrop_path, genre_ids } = item

    const printGenres = () => {
        return genre_ids.map(genre_id => {
            let genreName = null
            genreList.forEach(genre => {
                if (genre_id == genre.id) {
                    genreName = genre.name
                }
            })
            return <div key={genreName} className="genre">{genreName}</div>
        })
    }
    return (
        <div className="card-details">
            <div className="backdrop" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${backdrop_path})` }}></div>
            <div className="card-text">
                <h3 className="title">{title}</h3>
                <div className="genres">{printGenres()}</div>
                <div className="description">{overview}</div>
                { video && 
                    (<div className="buttons">
                        <button className="btn play" onClick={playClickHandler}><i className="fa-regular fa-circle-play"></i> Watch Trailer</button> 
                    </div>)
                }
            </div>
            {
                video && videoActive &&
                <div className="player">
                    <iframe src={`https://www.youtube.com/embed/${video.key}?mute=1&autoplay=1&rel=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            }
        </div>
    )
}

export default CardDetails