import PokemonCard from "./PokemonCard"

const PokemonList = ({ pokemons }) => {
    return (
        <section className="grid grid-cols-[repeat(auto-fit,_minmax(261px,_1fr))] justify-center gap-10 max-w-[1000px] mx-auto py-10 pl-12">
            {
                pokemons.map((pokemon) => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
    )
}
export default PokemonList