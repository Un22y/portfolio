import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { changePage } from "../../features/characters/charactersSlice";
import classes from './NavButtons.module.css'

const NavButtons = ({pages}) => {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.characters)
    
    const switchPage = (e) => {
        dispatch(changePage(e.target.value));
    }

    return (
        <div className={classes.navbuttons_box}>
            <button className={classes.navbutton_button} value={'-'} disabled={characters.page == 1} onClick={switchPage}>prev page</button>
            <button className={classes.navbutton_button} value={'+'} disabled={characters.page == pages} onClick={switchPage}>next page</button>
        </div>
    )
}

export default NavButtons;