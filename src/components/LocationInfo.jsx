import React from 'react'

const LocationInfo = ({location}) => {
  
 //console.log(location)

  return(
    <article>
    <h2>{location?.name}</h2>
    <ul>
        
    <li><span>Type:</span>{location?.type}</li>
    <li><span>Dimension: </span>{location?.dimension}</li>
    <li><span>Population: </span>{location?.residents.lenght}</li>
    </ul>

    </article>
  )

}
export default LocationInfo