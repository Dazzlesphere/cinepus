import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import Card from './Card'
import CardDetails from './CardDetails'

const Cards = ({ query }) => {
    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_KEY = '227871f98477156b1c1c5507bca4a663'

    const [items, setItems] = useState([])

    const [activeIndex, setActiveIndex] = useState(-1)
    const [nextPage, setNextPage] = useState(null)
    const [detailsIndex, setDetailsIndex] = useState(-1)

    const [videoActive, setVideoActive] = useState(false)
    const [video, setVideo] = useState(null)
    const targetRef = useRef()

    const fetchItems = async (page) => {
        let fetchURL = `${BASE_URL}${query.path}`
        let separator = fetchURL.indexOf('?') >= 0 ? '&' : '?'

        page = page || 1
        fetchURL = `${fetchURL}${separator}page=${page}&api_key=${API_KEY}`
        console.log(fetchURL)
    
        const resp = await fetch(fetchURL)
        const data = await resp.json()
        if (data.results.length) {
            let results = data.results.filter(entry => {
                return (entry.title && entry.release_date && entry.poster_path)
            })

            if (page > 1) {
                results = [...items, ...results]
            }
            setItems(results)
            setNextPage(prevPage => {
                if (prevPage < data.total_pages)
                    return ++prevPage
            })
            setActiveIndex(-1)
        }
    }

    const fetchVideos = async (id) => {
        const fetchURL = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`

        const resp = await fetch(fetchURL)
        const data = await resp.json()
        
        let videoObj = null
        data.results.forEach(entry => {
            if (entry.type == 'Trailer' && entry.site == 'YouTube' && entry.official) {
                videoObj = entry
            }
        })
        setVideo(videoObj)
    }

    const handleClick = event => {
        const cardElems = event.currentTarget.parentElement.querySelectorAll('.card')
        const index = [...cardElems].indexOf(event.currentTarget)
        
        setVideoActive(false)
        setActiveIndex(index)
    }

    const playClickHandler = event => {
        event.preventDefault()
        setVideoActive(true)
    }

    const loadMore = event =>  {
        event.preventDefault()
        fetchItems(nextPage)
    }

    useEffect(() => {
        if (activeIndex >= 0 && targetRef.current) {
            fetchVideos(items[activeIndex].id)

            const itemCount = targetRef.current.children.length
            let containerWidth = targetRef.current.clientWidth

            if (itemCount) {
                let cardWidth = targetRef.current.children[0].clientWidth
                let columnCount = Math.floor(containerWidth / cardWidth)
                let activeRow = Math.ceil((activeIndex + 1) / columnCount)
                let detailsIndex = (activeRow * columnCount) - 1
                if (detailsIndex > itemCount) {
                    detailsIndex = itemCount - 1
                }
                setDetailsIndex(detailsIndex)
            }
        }
    }, [activeIndex])

    useEffect(() => {
        fetchItems()
    }, [query])

    return (
        <div className="container">
            <div className="filters">
                <h2 className="cards-title">{ query.title }</h2>
            </div>
            <div className="cards" ref={targetRef}>
                {items.map((item, index) => {
                    return (
                        <React.Fragment key={item.id}>
                            <Card key={index} item={item} clickHandler={handleClick} isActive={(index == activeIndex) ? true : false} />
                            {(activeIndex >= 0 && index == detailsIndex) && <CardDetails item={items[activeIndex]} video={video} videoActive={videoActive} playClickHandler={playClickHandler} /> }
                        </React.Fragment>
                    )
                })}
                <button className="load-more" onClick={loadMore}>Load More</button>
            </div>
        </div>
    )
}

export default Cards