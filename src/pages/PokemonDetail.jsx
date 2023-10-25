import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPokeball from "../components/layout/HeaderPokeball";
import { bgByType } from "../constants/pokemon";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const { pokemonId } = useParams();
  const types = pokemon?.types.map((type) => type.type.name).join(" / ");
  const fisrtType = pokemon?.types[0].type.name;
  
  const getPorcentageStat = (statValue) => {
    const MAX_STAT_VALUE = 255;
    const porcentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1);
    return `${porcentStat}%`;
  };
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }) => setPokemon(data))
      .catch((error) => console.log(error));
  }, [pokemonId]);
  useEffect(() => {
    if (pokemon) {
      const abilityUrls = pokemon.abilities.map((ability) => ability.ability.url);
      Promise.all(
        abilityUrls.map((url) =>
          axios.get(url).then(({ data }) => data.name)
        )
      )
        .then((abilityNames) => setAbilities(abilityNames))
        .catch((error) => console.log(error));
    }
  }, [pokemon]);
  return (
    <main className="py-10 text-center capitalize items-center justify-center ">
      <HeaderPokeball />
      <article className="relative max-w-[500px] mx-auto p-1 items-center justify-center rounded-xl -z-50 bg-gradient-to-r from-red-700 via-yellow-500 to-lime-500">
        <div className="w-[99-5%] h-[99%] p-4 rounded-lg -z-50 bg-gradient-to-r from-red-50 via-emerald-50 to-yellow-50 grid gap-2">
          <header>
            <div className="absolute -z-5 h-2 w-2 top-[20%] left-[50%] rounded-full  shadow-[0_3px_60px_70px_rgba(0,0,0,0.5)] shadow-yellow-500 animate-rotarrr"></div>
            <div className="absolute -z-5 h-2 w-2 top-[20%] left-[50%] rounded-full  shadow-[0_3px_60px_90px_rgba(255,0,0,0.5)] animate-rotar"></div>
            <img className="relative w-[60%] mx-auto mb-4 z-50" src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
          </header>
          <h2 className="font-bold text-red-950">#{pokemon?.id}</h2>
          <div className="grid grid-cols-[auto_1fr_auto] items-center justify-center gap-2">
            <div className="h-[1px] w-[100px] bg-gradient-to-l from-orange-700 via-yellow-400 to-red-600 "></div>
            <h2 className="font-extrabold text-2xl text-red-950 mb-4">{pokemon?.name}</h2>
            <div className="h-[1px] w-[100px] bg-gradient-to-l from-orange-700 via-yellow-400 to-red-600 "></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-4">
              <h3 className="w-full h-[20px] text-center text-red-950 text-md break-words font-semibold">Types</h3>

              <span className={`text-sm text-zinc-500 ${bgByType[fisrtType]}`}>{types}</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <h3 className="w-full h-[20px] text-center text-red-950 text-md break-words font-semibold">Abilities</h3>
              <ul className="flex flex-row gap-6 justify-center text-sm ">
                {abilities.map((ability, index) => (
                  <li className="text-zinc-500" key={index}>{ability}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Stats */}
          <section>
            <div className="grid grid-cols-[auto_1fr] items-center justify-center gap-2 mb-4">
              <h3 className="text-start font-extrabold text-xl text-red-950">Stats</h3>
              <div className="h-[1px] w-full bg-gradient-to-l from-orange-700 via-yellow-400 to-red-600 "></div>
            </div>
            <ul className="grid gap-4">
              {pokemon?.stats.map((stat) => (
                <li className="capitalize" key={stat.stat.name}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-red-800">{stat.stat.name}</h4>
                    <span className="text-xs font-bold text-red-800">{stat.base_stat}/255</span>
                  </div>
                  {/* Total bar */}
                  <div className="bg-red-200 rounded-md h-6">
                    {/* Bar progress stat */}
                    <div style={{ width: getPorcentageStat(stat.base_stat) }} className={` bg-gradient-to-r from-yellow-300 via-yellow-500 to-red-700 h-full`}></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
};
export default PokemonDetail;