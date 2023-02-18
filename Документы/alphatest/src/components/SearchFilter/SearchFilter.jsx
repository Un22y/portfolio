import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { addGender, addName, addStatus, fetchCharacters } from "../../features/characters/charactersSlice";
import { fetchData } from "../../features/data/dataSlice";
import MyInput from "../MyInput/MyInput";
import MySelect from "../MySelect/MySelect";
import classes from "./SearchFilter.module.css"

const SearchFilter = () => {
    const dispatch = useDispatch()
    const [status,setStatus] = useState('');
    const [gender,setGender] = useState('');
    const [name,setName] = useState('');
    
    const changeStatus = (e) => {
        setStatus(e.target.value)
    }
    const changeGender = (e) => {
        setGender(e.target.value)
    }
    const changeName = (e) => {
        setName(e.target.value)
    } 
    useEffect(() => {
        dispatch(addStatus(status))
        dispatch(addGender(gender))
        dispatch(addName(name))
        dispatch(fetchCharacters())
        dispatch(fetchData())
    },[status,gender,name])
    // +79094044238 Карен
    
    return (
        <div className={classes.filter_box}>
            <MySelect callback={changeStatus} props={['','alive','dead','unknown']}/>
            <MySelect callback={changeGender} props={['','female','male','genderless','unknown']}/>
            <MyInput callback={changeName} label={'Search by name'}/>
        </div>
    )
}

export default SearchFilter