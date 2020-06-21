import React from 'react'

function TvSeries(props) {
    const { title, overview, poster_path, popularity, tags } = props.tvSeries

    return (
        <div style={{
            margin: "1rem",
            padding: "2rem",
            border: "solid black 2px"
        }}>
            <div>Title: {title}</div>  
            <div>Overview: "{overview}"</div>  
            <div>Image: {poster_path}</div>  
            <div>Popularity: {popularity}</div>  
            <div>Genre: {tags}</div>  
        </div>
    )
}

export default TvSeries
