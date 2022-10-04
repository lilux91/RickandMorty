import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorSreen from './components/Error'
import Error from './components/Error'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'

function App() {

  //peticion para guardar una location
  const [location, setLocation] = useState()

  //para guardar informavion del input y hacer la peticion cuando se hace un submit
  const [searchInput, setSearchInput] = useState('')

  //console.log(searchInput)
 //Para guardar las sugerencias de la api
  const [suggestedList, setSuggestedList] = useState()

  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if (searchInput){
    id = searchInput
    }
  
  const URL = `https://rickandmortyapi.com/api/location/${id}`
  
  axios.get(URL)
    .then(res => {
      setHasError(false)
      setLocation(res.data)
    })
    .catch(err => setHasError(true))

  }, [searchInput])

  //console.log(location)
  const handleSubmit = e => {
  e.preventDefault()
  setSearchInput(e.target.idLocation.value)
  }

  const handleChange = e => {

    if(e.target.value === ''){
      setSuggestedList()
    } else {
      const URL= `http://rickandmortyapi.com/api/location?name=${e.target.value}`
    }


    axios.get(URL)
      .then(res => setSuggestedList(res.data.results))
      .catch(err => console.log(err)) 

  }

 //console.log(suggestedList)

  return (
    <div className="App">
      <header>
        <img className='header_title' src='/src/assets/img/rick.png' alt='title'></img>
      </header>
      <form onSubmit={handleSubmit}>
        <input
        id='idLocation'
        placeholder='Enter another number from 1 to 126' 
        type="text"
        onChange={handleChange}
        />
        <button>Search</button>
        <FilterList 
        //las sugerencias
          suggestedList={suggestedList}
          setSearchInput={setSearchInput}
        />
      </form>
    {
      hasError ?
      <ErrorSreen/>
      :

      <>
      <LocationInfo location={location}/>
        <div className='card-container'>
        {
          location?.residents.map(url => (
            <CardResident
              key={url}
              url={url}
          />
          ))
        }
      </div>
        </>
      }
      </div>
  )
}

export default App
