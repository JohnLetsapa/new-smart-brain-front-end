import React from 'react'
// import './Rank.css' 


function Rank({name, rank}) {

    return(

        <div>
            <p className="white f3">
            {name}, your rank is...
            </p>           
            <p className="white f1">
            {rank}
            </p>           
        </div>
    )
}

export default Rank