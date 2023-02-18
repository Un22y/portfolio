import React, {useEffect} from "react";
import { fetchCharacters} from "./../charactersSlice";
import { fetchData } from "./../../data/dataSlice";
import { switchItem } from "../../favorites/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import CharacterItem from "../characterItem/CharacterItem";
import classes from "./CharactersList.module.css"


const CharactersList = () => {
    const dispatch = useDispatch()
    const characters = useSelector((state) => state.characters)
    const favorites = useSelector((state) => state.favorites.list)

    useEffect(() => {
        dispatch(fetchCharacters())
        dispatch(fetchData())
    }, [characters.page])

    return (
        <div className='grid_container'>
            {characters.data.map(character => 
                <CharacterItem 
                key={character.id}
                character={character}
                isFavorite={favorites.includes(character.id)}
                addFavorite = {() => dispatch(switchItem(character.id))}
                />
            )}
        </div>
    )
}

export default CharactersList