import React from "react";
import classes from "./MySelect.module.css"

const MySelect = ({props, callback}) => {

    return (
        <>
            <select className={classes.select_box} onChange={callback}>
                {props.map((prop,index) => 
                    <option
                        key={index}
                        value={prop}
                    >
                        {prop == '' ? 'All' : prop}
                    </option>
                )}
            </select>
        </>
    )
}

export default MySelect;