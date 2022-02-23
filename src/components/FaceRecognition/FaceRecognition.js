import React from 'react'
import './FaceRecognition.css'


function FaceRecognition({image, box}) {

    return(

        <div className='center ma img-container'>
           <div className='absolute mt2'>
                <img id="inputimage" src={image} alt="image"/>
                <div className="bounding-box"
                     style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol }}
                ></div>
           </div>
        </div>
    )
}

export default FaceRecognition