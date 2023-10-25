import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PokemonList from "../components/pokedex/PokemonList"
import HeaderPokeball from "../components/layout/HeaderPokeball"
import { paginateData } from "../utils/pagination"

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState("")
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)


  const trainerName = useSelector((store) => store.trainerName)

  const pokemonByName = pokemons.filter((pokemon) => pokemon.name.includes(pokemonName))

  const {
    itemsInCurrentPage,
    pagesInCurrenBlock,
    lastPage
  } = paginateData(pokemonByName, currentPage)


  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim())
  }

  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  //Traer los pokemons
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=200")
      .then(({ data }) => setPokemons(data.results))
      .catch((error) => console.log(error))
  }, [])

  //Traer los tipos de pokemon
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => {
        setTypes(data.results)
      })
      .catch((error) => console.log(error))
  }, [])

  //Traer los pokemons por tipo
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}`)
        .then(({ data }) => {
          const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon)
          setPokemons(pokemonsByType)
        })
        .catch((error) => console.log(error))
    } else {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=200")
        .then(({ data }) => setPokemons(data.results))
        .catch((error) => console.log(error))
    }
  }, [currentType])

  //? Solucion bug paginas: actualiza la pagina a 1 al cambiar de pagina
  useEffect(() => {
    setCurrentPage(1)
  }, [currentType])

  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 1
    if (newCurrentPage >= 1) setCurrentPage(newCurrentPage)
  }

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1
    if (newCurrentPage <= lastPage) setCurrentPage(newCurrentPage)
  }

  return (
    <main className="">
      <HeaderPokeball />

      <section>

        <p className="m-4">
          <span className=" text-red-600 font-bold">Welcome {trainerName}, </span>
          here you can find your favorite pokemon!
        </p>

        <form
  onSubmit={handleSubmit}
  className="flex flex-wrap justify-center max-w-screen-xl mx-auto p-4 gap-4">
  <div className="w-full md:w-1/2 flex items-center">
    <input
      name="pokemonName"
      type="text"
      className="flex-grow bg-white shadow-md text-sm h-12" />
    <button className="bg-red-600 w-[60px] h-12 text-white p-2 shadow-md hover:bg-red-400 hover:text-black">Search</button>
  </div>
  <select onChange={handleChangeType} className="capitalize w-full md:w-[350px] shadow-md h-12 p-2 text-sm">
    <option value="">All pokemons</option>
    {
      types.map((type) => <option key={type.url} value={type.name}>{type.name}</option>)
    }
  </select>
</form>

      </section>

      <PokemonList pokemons={itemsInCurrentPage} />

      <ul className="flex justify-center gap-4 p-4 flex-wrap">
        {
          currentPage !== 1 && (
            <li>
              <button className="text-2xl font-extrabold" onClick={handlePreviusPage}>{"<"}</button>
            </li>)
        }
        {pagesInCurrenBlock.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`relative p-2 h-10 w-10 z-0 place-content-center font-extrabold text-white rounded-full shadow-xl shadow-red-800 ${currentPage === page ? "bg-amber-600" : "bg-red-600"}`}>
              <div className="absolute -z-10 h-5 w-5 top-[27%] left-[26%] rounded-full bg-black"></div>
              <div className="absolute -z-10 h-1 w-full top-[45%] left-0 bg-black"></div>
              <div className="absolute -z-20 h-5 w-full top-[50%] rounded-bl-full rounded-br-full left-0 bg-white"></div>
              {page}
            </button>
          </li>
        ))}

        {
          currentPage !== lastPage && (
            <li>
              <button className="text-2xl font-extrabold" onClick={handleNextPage}>{">"}</button>
            </li>)
        }
      </ul>

    </main>
  )
}
export default Pokedex