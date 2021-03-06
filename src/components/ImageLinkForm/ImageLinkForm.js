import React from 'react'
import './ImageLinkForm.css' 


function ImageLinkForm({ onInputChange, onSubmit }) {

    

    
    return(

        <div>
           <p className="p-text f3">
               This magic Brain will detect faces in your pictures. Give it a try.
           </p>
           <div className="center">
               <div className="form center pa4 br3 shadow-5">
                    <input onChange={onInputChange} 
                           className="f4 pa2 w-70 center" type="text" 
                           /> 
                    <button onClick={onSubmit} 
                            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"> 
                            Detect
                    </button>
               </div>
           </div>
        </div>
    )
}

export default ImageLinkForm