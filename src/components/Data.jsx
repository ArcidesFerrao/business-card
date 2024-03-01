import React from 'react'

import './styles/Data.css';

export default function Data(props) {
    const msg = "";
    
    const copytoClipboard = async (data) => {
        try {
            await navigator.clipboard.writeText(data);
            msg='Text copied to clipboard';
            alert(msg, data);
        } catch (error) {
            msg='Error copying to clipboard';
            alert(msg, error);
        }
    };
  
    return (
        <>
                <div className='data'>
                    <div className='title'>
                        <span className='companyIcon'></span>
                        <div className="subtitle">
                            <h1>{props.company}</h1>
                            <h2>{props.name}</h2>
                        </div>
                    </div>
                    
                    <div className='contact'>
                        <span className='phoneIcon'></span>
                        <h3 onClick={copytoClipboard} >{props.phone}</h3>
                    </div>

                    <div className='email'>
                        <span className="mailIcon"></span>
                        <h3><a href='mailto:{props.email}' >{props.email}</a></h3>
                    </div>
                </div>
        </>
        
    );
}
