import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgByType, borderByType } from "../../constants/pokemon";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const types = pokemon?.types.map((type) => type.type.name).join(" / ");

  useEffect(() => {
    if(pokemonUrl)
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((error) => console.log(error));
  }, []);

  const fisrtType = pokemon?.types[0].type.name

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`capitalize bg-slate-50 border-8 rounded-lg w-[261px] h-[383px] z-50 ${borderByType[fisrtType]}`}
    >
      <header className={`w-full h-[60%] text-center p-0 mb-0 -z-50`}>
        <div
          className={`${bgByType[fisrtType]} relative w-full h-1/2`}
        ></div>
        <div className="relative -top-20">
          <div className="bg-transparent">
          <div className="absolute -z-5 h-1 w-1 top-[25%] left-[45%] rounded-full bg-green-400/90 border-green-400 shadow-[0_3px_60px_50px_rgba(0,255,179,0.5)] 
          shadow-yellow-200"></div>
            <img
              className="mx-auto w-[50%] animate-fn1"
              src={pokemon ? pokemon.sprites.other["official-artwork"].front_default : "/images/mirey.png"}
              alt=""
            />
          </div>
          <h3 className="font-bold text-xl text-red-950">{pokemon?.name}</h3>
          <span className=" text-sm">{types}</span>
          <h5 className=" text-xs text-slate-500">type</h5>
          <div className="mt-2 mx-auto h-[1px] w-[90%] bg-gradient-to-br from-violet-950 via-yellow-400 to-red-950"></div>
        </div>

      </header>

        <ul className="mt-4 mx-auto text-center p-2 grid grid-cols-2 text-sm gap-4">
          {pokemon?.stats.slice(0, 4).map((stat) => (
            <li className={`grid gap-1`} key={stat.stat.name}>
              <h6 className="text-xs text-zinc-500">{stat.stat.name}</h6>
              <span className="font-bold text-xl text-red-950">{stat.base_stat}</span>
            </li>
          ))}
        </ul>

    </Link>
  );
};
export default PokemonCard;
