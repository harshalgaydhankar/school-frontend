import React from 'react';
import Box from '../Box/box';

export default (props) =>{
    return (
        <div className="list">
            <h1>{props.header}</h1>
            { 
                props.items.map((obj)=>{
                    return(                
                        <Box click={props.click} key={obj.id} css={obj.css} text={obj.text} id={obj.id}/>
                    )
                })
            }
      
        </div>
    );
}

