import React from "react";
import classes from "./MyInput.module.css"

const MyInput = ({callback, label}) => {

    return (
        <>
            <div className={classes.input_box}>
                    <input className={classes.my_input} placeholder=' ' type="text" onChange={callback}/>
                    <label className={classes.input_label} htmlFor="">{label}</label>
            </div>
        </>
    )
}

export default MyInput;