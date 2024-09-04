import { useEffect, useState } from 'react'
import { AnimatePresence } from "framer-motion"

import slugify from '../utils/slugify'
import supabase from '../utils/supabase'

import './assets/css/App.css'
import PokedexList from './components/PokedexList'
import FilterForm from './components/controller/FilterForm'

function Page() {
  const { pokedex: tbPokedex, loading: loadingDex } = loadDex(); 
  const { tbType: tbTypes, loading: loadingTypes } = loadType();
  const { tbArea: tbAreas, loading: loadingAreas } = loadArea();

  const [typeFilters, setTypeFilters] = useState(new Set());
  const [areaFilters, setAreaFilters] = useState(new Set());

  function updateTypeFilters(checked, typeFilter) {
    if (checked)
      setTypeFilters((prev) => new Set(prev).add(typeFilter));
    if (!checked)
      setTypeFilters((prev) => {
        const next = new Set(prev);
        next.delete(typeFilter);
        return next;
      });
  }

  function updateAreaFilters(checked, areaFilter) {
    if (checked)
      setAreaFilters((prev) => new Set(prev).add(areaFilter));
    if (!checked)
      setAreaFilters((prev) => {
        const next = new Set(prev);
        next.delete(areaFilter);
        return next;
      });
  }

  const filteredPokedex = tbPokedex.filter((pokemon) => {
    const pokemonTypes = new Set(Object.values(pokemon.reg_type))
    return (
      (areaFilters.size === 0 ||
        areaFilters.has(pokemon.area_id)) &&
      (typeFilters.size === 0 ||
        pokemonTypes.isSupersetOf(typeFilters)
      )
    );
  });

  if (loadingDex || loadingTypes || loadingAreas) {
    return <div>Chargement...</div>;
  }

  return (<>
    <div id="filters">
      <FilterForm tbTypes={tbTypes} tbArea={tbAreas} onTypeChange={updateTypeFilters} onAreaChange={updateAreaFilters} />
      <p>Types : {typeFilters}</p>
      <p>Zones : {areaFilters}</p>
    </div>
    <div id="pokedexList" className='filterContainer'>

      <AnimatePresence>
        <PokedexList tbPokedex={filteredPokedex} tbTypes={tbTypes} tbAreas={tbAreas} />
      </AnimatePresence>
    </div>
  </>
  )
}
export default Page


function loadDex() {
  const [pokedex, setPokedex] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokedex() {
      const { data: pokedex } = await supabase.from("pokedex")
        .select(`pokedex_id,
              region,
              forme,
              name_fr:  name->fr,
              name_en:  name->en,
              reg_type: regular->type,
              reg_galerie: regular->image,
              gen,
              reg_discovered_by,
              area_id,
              desc`
        )
        .order("pokedex_id")
        .order("region")
        .order("forme")
      //.lt("pokedex_id", 4)

      if (pokedex) {
        setPokedex(pokedex)
      }
      setLoading(false);
    }

    getPokedex()
  }, [])

  return { pokedex, loading };
}

function loadType() {
  const [tbType, setTypes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTypes() {
      const { data: tbType } = await supabase
        .from("type")
        .select(
          `name,
          icon,
          icon_mini,
          rgb,
          id_type`
        )
        .order("id_type")
        .lt("id_type", 19);

      if (tbType.length > 1) {
        setTypes(tbType)
      }
      setLoading(false);
    }

    getTypes()
  }, [])

  // Création des variables couleur à partir de la liste des types
  const root = document.documentElement;
  tbType.forEach((type) => {
    let name = slugify(type.name);
    root.style.setProperty("--color-" + name, `rgb(${type.rgb})`);
  });

  return { tbType, loading };
}

function loadArea() {
  const [tbArea, setAreas] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAreas() {
      const { data: tbArea } = await supabase
        .from("zone_cap")
        .select(
          `id,
            name,
            img`
        )
        .order("id")

      if (tbArea.length > 1) {
        setAreas(tbArea)
      }
      setLoading(false);
    }

    getAreas()
  }, [])

  return { tbArea, loading };
}