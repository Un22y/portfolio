import React from "react";
import classes from './Preloader.module.css' 


const Preloader = () => {
    return (
        <>
            <div className={classes.preloader_box}>
                <div className={classes.circle}></div>
            </div>
        </>
    )
}

export default Preloader;