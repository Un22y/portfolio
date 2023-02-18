import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteLink } from "../../api/postage";
import Preloader from "../../components/UI/Preloader/Preloader";
import CharacterItem from "../characters/characterItem/CharacterItem";
import { fetchFavorites, switchItem } from "./favoritesSlice";

const FavoritesList = ({list}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites)
    useEffect(() => {
        dispatch(fetchFavorites());
        console.log(favoriteLink.href)
    },[list])

    return (
        <>
            <h2>Favorite characters:</h2>
            {favorites.loading && <Preloader/>}
            
            {!favorites.loading && favorites.error ? <div>Error: {favorites.error}</div> : null}
            {!favorites.loading && favoriteLink.href !== 'https://rickandmortyapi.com/api/character/'  ?
                <div className="grid_container">
                    {favorites.data.map(character =>
                        <CharacterItem
                            key={character.id}
                            character={character}
                            isFavorite={list.includes(character.id)}
                            addFavorite={() => dispatch(switchItem(character.id))}
                        />
                    )}
                </div>
                :
                <div>U dont love anyone!</div>
            }
        </>
    )
}

export default FavoritesList