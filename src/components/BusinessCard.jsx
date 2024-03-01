import React, { useState } from 'react';
import FormCard from './FormCard';
import Data from './Data';
import './styles/BusinessCard.css';
import Skeleton from './skeleton/Skeleton';
import { useEffect } from 'react';

export const BusinessCard = () => {
    const [cardInfo, setCardInfo] = useState({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        city: "",
    });

    const [isShown, setIsShown] = useState(false);
    const [load, setLoad] = useState(false);
    const handleClick = () => {
        setIsShown(!isShown);
    };

    useEffect(() => {
        setTimeout(() => {
            console.log("loading");
            setLoad(isShown);
        }, 1000);
    }, [isShown])
    

    
  return (
    <>
        <div className='card'>       
            {isShown ? (
                <>
                    {load ? (
                            <Data 
                                name={cardInfo.fullName}
                                email={cardInfo.email}
                                phone={cardInfo.phone}
                                company={cardInfo.company}
                                city={cardInfo.city}
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
                
                <button 
                    // style={{ display: !isShown ? 'none' : '' }} 
                    onClick={handleClick}
                >Edit</button>
            ) : (

                <input 
                    // style={{ display: isShown ? 'none' : '' }}
                    type="submit" 
                    value="Submit" 
                    form='cardForm' 
                />
            )}
        </div>


    </>
    
  );
}