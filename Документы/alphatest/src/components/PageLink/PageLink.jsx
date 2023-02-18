import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, pageByNumber } from "../../features/characters/charactersSlice";
import classes from './PageLink.module.css'


const PageLink = ({id,current,isShow}) => {
    const dispatch = useDispatch();
    const goToPage = (e) => {
        dispatch(pageByNumber(Number(e.target.value)))
        dispatch(fetchCharacters())
    }
    
    return (
        <>
            {
                isShow ?
                <button 
                    className={current == id ? `${classes.pagelink} ${classes.pagelink_current}` : classes.pagelink} 
                    value={id} 
                    onClick={goToPage}>{id}
                </button> 
                : 
                <div className={[-3,3].includes(current - id) ? classes.dots : classes.hide}>
                    {[-3,3].includes(current - id) ? '...' : ''}
                </div>
            }
        </>
    )
}

export default PageLink;