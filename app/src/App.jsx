import { useEffect, useState } from 'react'

import slugify from '../utils/slugify'
import supabase from '../utils/supabase'

import './assets/css/App.css'
import PokedexList from './components/PokedexList'
import FilterForm from './components/controller/FilterForm'

function Page() {
  // Chargement des tables
  const { pokedex: tbPokedex, loading: loadingDex } = loadDex();
  const { tbType: tbTypes, loading: loadingTypes } = loadType();
  const { tbArea: tbAreas, loading: loadingAreas } = loadArea();

  // Filtres
  const initialState = {
    type : new Set(),
    area : new Set(),
    generation : new Set(),
    text : '',
  }

  const [typeFilters, setTypeFilters] = useState(initialState.type);
  const [areaFilters, setAreaFilters] = useState(initialState.area);
  const [generationFilters, setGenerationFilters] = useState(initialState.generation);
  const [textSearch, setTextSearch] = useState(initialState.text)

  function resetForm (){
    setTypeFilters(initialState.type)
    setAreaFilters(initialState.area)
    setGenerationFilters(initialState.generation)
    setTextSearch(initialState.text)
  }

  /**
   * Mettre à jour le filtre sur le type.
   * 
   * @param {boolean} checked 
   * @param {number} typeFilter 
   */
  function updateTypeFilter(checked, typeFilter) {
    console.debug(checked)
    if (checked)
      setTypeFilters((prev) => new Set(prev).add(typeFilter));
    if (!checked)
      setTypeFilters((prev) => {
        const next = new Set(prev);
        next.delete(typeFilter);
        return next;
      });
  }

  /**
   * Mettre à jour le filtre sur la zone de capture.
   * 
   * @param {boolean} checked 
   * @param {number} areaFilter 
   */
  function updateAreaFilter(checked, areaFilter) {
    if (checked)
      setAreaFilters((prev) => new Set(prev).add(areaFilter));
    if (!checked)
      setAreaFilters((prev) => {
        const next = new Set(prev);
        next.delete(areaFilter);
        return next;
      });
  }

  /**
   * Mettre à jour le filtre sur la génération.
   * 
   * @param {boolean} checked 
   * @param {number} generationFilter 
   */
  function updateGenerationFilter(checked, generationFilter) {
    if (checked)
      setGenerationFilters((prev) => new Set(prev).add(generationFilter));
    if (!checked)
      setGenerationFilters((prev) => {
        const next = new Set(prev);
        next.delete(generationFilter);
        return next
      });
  }

  /**
   * Mettre à jour le filtre de recherche textuelle.
   * 
   * @param {string} value 
   */
  function updateTextSearch(value) {
    setTextSearch(value)
  }

  // Filtrer le pokedex selon les critères de recherche
  const filteredPokedex = tbPokedex.filter((pokemon) => {
    // Récupération de la liste des types du pokemon pour contrôle
    const pokemonTypes = new Set(Object.values(pokemon.reg_type))

    return (
      // Filtre sur la zone de capture
      (areaFilters.size === 0 ||
        areaFilters.has(pokemon.area_id)) &&
      // Filtre sur le type
      (typeFilters.size === 0 ||
        pokemonTypes.isSupersetOf(typeFilters)
      ) &&
      // Filtre recherche textuelle sur le nom
      ((slugify(pokemon.name_fr)).match(textSearch) || (slugify(pokemon.name_en)).match(textSearch)
      ) &&
      // Filtre sur la génération
      (generationFilters.size === 0 ||
        generationFilters.has(pokemon.gen)
      )
    );
  });

  // Calculer le nombre de résultat et générer la phrase à afficher.
  const searchResultDetail = (pokedex) => {
    if (pokedex.length === 0)
      return "Aucun résultat."
    else if (pokedex.length === 1)
      return "1 espèce recensée."
    else
      return `${pokedex.length} espèces recensées.`
  }

  // Contrôler le chargement des tables.
  if (loadingDex || loadingTypes || loadingAreas) {
    return <div>Chargement...</div>;
  }

  // Structure de la page
  return (<>
    <div id="filters">
      <FilterForm
        tables={{
          type: tbTypes,
          area: tbAreas
        }}
        reset={resetForm}
        updater={{
          type: updateTypeFilter,
          area: updateAreaFilter,
          text: updateTextSearch,
          generation: updateGenerationFilter
        }}
      />
    </div>
    <div id="searchResult">{searchResultDetail(filteredPokedex)}</div>
    <div id="pokedexList">
      <PokedexList
        tables={{
          pokedex: filteredPokedex,
          type: tbTypes,
          area: tbAreas
        }}
      />
    </div>
  </>
  )
}
export default Page

/**
 * Charger le pokedex depuis la base de données.
 * 
 * @returns Le pokedex et l'état de chargement.
 */
function loadDex() {
  const [pokedex, setPokedex] = useState([])
  const [loading, setLoading] = useState(true)

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

  return { pokedex, loading }
}

/**
 * Charger la table des types depuis la base de données.
 * 
 * @returns La table des types et l'état de chargement.
 */
function loadType() {
  const [tbType, setTypes] = useState([])
  const [loading, setLoading] = useState(true)

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

      if (tbType) {
        setTypes(tbType)
      }
      setLoading(false)
    }

    getTypes()
  }, [])

  // Création des variables couleur à partir de la liste des types
  const root = document.documentElement;
  tbType.forEach((type) => {
    let name = slugify(type.name);
    root.style.setProperty("--color-" + name, `rgb(${type.rgb})`);
  });

  return { tbType, loading }
}

/**
 * Charger les zones de capture depuis la base de données.
 * 
 * @returns Les zones de capture et l'état de chargement.
 */
function loadArea() {
  const [tbArea, setAreas] = useState([])
  const [loading, setLoading] = useState(true)

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

      if (tbArea) {
        setAreas(tbArea)
      }
      setLoading(false)
    }

    getAreas()
  }, [])

  return { tbArea, loading }
}