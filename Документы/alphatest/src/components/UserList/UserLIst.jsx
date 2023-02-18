import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../features/data/dataSlice";

const UserList = () => {
    const data = useSelector((state) => state.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [])

    return (
        <>
            <h2>List of Data</h2>
            
            {data.loading && <div>Loading...</div>}
            {!data.loading && data.error ? <div>Error: {data.error}</div> : null}
            {!data.loading && data.data.length ? (
                <ul>
                    {
                        data.data.map(user => (
                            <li key={user.id}>{user.name}</li>
                        ))
                    }
                </ul>
            ) : null}    
        </>
    )
}

export default UserList