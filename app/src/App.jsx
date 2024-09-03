import { useEffect, useState } from 'react'

import slugify from '../utils/slugify'
import supabase from '../utils/supabase'

import './assets/css/App.css'
import PokedexList from './components/PokedexList'
import FilterForm from './components/controller/FilterForm'

function Page() {

  const tbPokedex = loadDex()
  const tbTypes = loadType()
  const tbAreas = loadArea()

  return (<>
    <div id="filters">
      <FilterForm tbTypes={tbTypes} tbArea={tbAreas} />
    </div>
    <div id="pokedexList" className='filterContainer'>
        <PokedexList tbPokedex={tbPokedex} tbTypes={tbTypes} tbAreas={tbAreas}/>
    </div>
    </>
  )
}
export default Page



function loadDex(){
  const [pokedex, setPokedex] = useState([])

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

      if (pokedex.length > 1) {
        setPokedex(pokedex)
      }
    }

    getPokedex()
  }, [])

  return pokedex
}

function loadType() {
  const [tbType, setTypes] = useState([])

  useEffect(() => {
    async function getTypes() {
      const { data: tbType } = await supabase
      .from("type")
      .select(
          `name,
          icon,
          icon_mini,
          rgb`
      )
      .order("id_type")
      .lt("id_type", 19);

      if (tbType.length > 1) {
        setTypes(tbType)
      }
    }

    getTypes()
  }, [])

  // Création des variables couleur à partir de la liste des types
  const root = document.documentElement;
  tbType.forEach((type) => {
      let name = slugify(type.name);
      root.style.setProperty("--color-" + name, `rgb(${type.rgb})`);
  });

  return tbType
}

function loadArea(){
  const [tbArea, setAreas] = useState([])

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
      }
  
      getAreas()
    }, [])

    return tbArea
}