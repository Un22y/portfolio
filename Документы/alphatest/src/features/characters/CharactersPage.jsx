import '../../App.css';
import React, {useState} from "react";
import { useSelector } from "react-redux";
import Preloader from "../../components/UI/Preloader/Preloader";
import { CSSTransition } from "react-transition-group";
import CharactersList from "./CharactersList/CharactersList";
import NavButtons from "./../../components/NavButtons/NavButtons"
import PageList from './../../components/PageList/PageList';


const CharacterPage = () => {
    const characters = useSelector((state) => state.characters)
    const [showPreloader, setShowPreloader] = useState(true)
    const info = useSelector((state) => state.data)
    
    return (
        <>
            <div className='App'>
                {!characters.loading && characters.error ? <div>Error: {characters.error}</div> : null}
                {characters.loading ?
                    <CSSTransition
                        in={showPreloader}
                        timeout={2000}
                        classNames='preloader'
                        mountOnEnter
                        unmountOnExit
                    >
                        <Preloader/>
                    </CSSTransition>
                    :
                    <div className='navigation'>
                        <NavButtons
                            pages={info.data.pages}
                        />
                        <PageList 
                            count={info.data.pages}
                        />
                    </div>
                }
                <CSSTransition
                    in={!characters.loading && characters.data.length !== 0}
                    timeout={1000}
                    classNames="list"
                    mountOnEnter
                    unmountOnExit
                    onEnter={() => setShowPreloader(false)}
                    onExited={() => setShowPreloader(true)}
                >
                    <CharactersList/>   
                </CSSTransition>
            </div>
        </>
    )
}

export default CharacterPage

