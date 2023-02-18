import React from "react";
import { useSelector } from "react-redux";
import PageLink from "../PageLink/PageLink";
import classes from "./PageList.module.css"

const PageList = ({count}) => {
    const current = useSelector(state => state.characters.page)
    return (
        <>
            <div className={classes.pagelist}>
            {   
                [...Array(count)].map((item, index) => 
                            <PageLink 
                                isShow={[-2,-1,0,1,2].includes(current - (index+1)) || [1,2].includes(index+1) || [count,count-1].includes(index+1)} 
                                current={current}
                                key={index+1} 
                                id={1+index}
                            />
                )
            }
            </div>
        </>
    )
}

export default PageList;