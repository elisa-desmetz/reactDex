import { useState, useEffect } from 'react'
import supabase from '../utils/supabase'
import Card from './components/Card'
import slugify from '../utils/slugify'
import './assets/css/App.css'

function Page() {

  const pokedex = loadDex()
  const types = loadType()

  return (
    <div id="pokedexList">
      {pokedex.map((elem) => (
        <Card key={slugify(elem.name_fr)} pkmn={elem} tbTypes={types}/>
      ))}
    </div>
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
  const [tbType, setPokedex] = useState([])

  useEffect(() => {
    async function getPokedex() {
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
        setPokedex(tbType)
      }
    }

    getPokedex()
  }, [])

  // Création des variables couleur à partir de la liste des types
  const root = document.documentElement;
  tbType.forEach((type) => {
      let name = slugify(type.name);
      root.style.setProperty("--color-" + name, `rgb(${type.rgb})`);
  });

  return tbType
}