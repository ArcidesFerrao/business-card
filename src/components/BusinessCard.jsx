import React, { useState } from 'react';
import FormCard from './FormCard';
import Skeleton from './skeleton/Skeleton';
import Data from './Data';
import './styles/BusinessCard.css';
import saved from "../local-json/cards.json";
import sanityClient from "../client";
import { useEffect } from 'react';


export const BusinessCard = () => {
    const [allPosts, setAllPosts] = useState(null);

    const [cardInfo, setCardInfo] = useState({
        name: "John Doe",
        company: "DevOps",
        email: "john@doe.com",
        number: "+258 871234567",
    });

    const [isShown, setIsShown] = useState(false);
    const [load, setLoad] = useState(false);

    const handleClick = () => {
        setIsShown(!isShown);
    };

    const handleSave = () => {

    };

    const handleClicked = (slug) => {
        setTimeout(() => {
            sanityClient.fetch(
                `*[slug.current == $slug]{
                    name,
                slug,
                number,
                email,
                company,
                }`,
                { slug }
            ).then((data => {
                    setCardInfo(data[0]);
                    console.log(data);
                }))
            .catch(console.error)

        }, 500);
                
        console.log(cardInfo);
    };

    useEffect(() => {

        setTimeout(() => {
            setLoad(!load);
        }, 1000);
        
        sanityClient.fetch(
            `*[_type == "author"]{
                name,
                slug,
                number,
                email,
                company,
            }`
        )
        .then((data => {
            console.log(data);
            setAllPosts(data)}))
        .catch(console.error);
        
        setTimeout(() => {
            console.log("loading");
            setLoad(isShown);
        }, 1000);

    }, [isShown])
    
    const showList = () => {
        const getList = document.querySelector(".saved-list");
        const openList = document.querySelector('.savedCards');
        const getButton = document.querySelector('.button-saved');
        const getClose = document.querySelector('.button-menu-list');
        getButton.classList.add("hide-button");
        getClose.classList.add("menu-close-show");
        getClose.classList.remove("menu-close");
        getButton.classList.remove("button-saved");
        openList.classList.add('openSaved');
        getList.classList.add('displayList');
        getList.classList.remove('saved-list');
    }

    const closeList = () => {
        const getClose = document.querySelector('.button-menu-list');
        getClose.classList.add("menu-close");
        getClose.classList.remove("menu-close-show");


        const getList = document.querySelector(".displayList");
        const openList = document.querySelector('.savedCards');
        const getButton = document.querySelector('.hide-button');
        getButton.classList.add("button-saved");
        getButton.classList.remove("hide-button");
        openList.classList.remove('openSaved');
        getList.classList.add('saved-list');
        getList.classList.remove('displayList');
    }
    
    
  return (
    <>
        <div className='card'>       
            {isShown ? (
                <>
                    {load ? (
                            <Data 
                                name={cardInfo.name}
                                email={cardInfo.email}
                                phone={cardInfo.number}
                                company={cardInfo.company}
                                load={isShown}
                            />
                        ) : ( 
                            <Skeleton />
                        )
                    }
                </>
                
                ) : (
                <FormCard
                    getShow={(isShown) => setIsShown(isShown)} 
                    getInfo={(cardInfo) => setCardInfo(cardInfo)}
                />
            )}
        </div> 

        <div className="buttonShow">
            {isShown ? ( 
                <>
                    <button 
                        onClick={handleSave} 
                        className="saved-doc" 
                        disabled
                    >Save</button>
                    
                    <button  
                        onClick={handleClick}
                    >Edit</button>
                </>
            ) : (

                <input
                    type="submit"
                    value="Submit"
                    form='cardForm'
                    
                />
            )}
        </div>
        {isShown ? ( 
            <div className="savedCards">
                <button className='menu-close button-menu-list' onClick={closeList}>
                    <span class="mdi--menu-close"></span>
                </button>

                <button className='button-saved' onClick={showList} >
                    <span class="material-symbols-light--menu-open"></span>
                </button>
                <ul className='saved-list'>
                    {allPosts && allPosts.map((card, index) => (
                        <li key={index}>
                            <button onClick={() => handleClicked(card.slug.current)} className="saved-doc"> 
                                {card.name}
                            </button>
                        </li>
                        )
                    )}
                </ul>
            </div>
        ) : <></>}

    </>
  );
}