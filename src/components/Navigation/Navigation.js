import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from "./brain.svg"
import './Navigation.css'

function Navigation({onRouteChange, isSignedIn}) {
    return(
        <nav style={{display:'flex', justifyContent:'space-between'}}>

            <div className="ma4 mt0">
                    <Tilt>
                        <div className="Logo">
                        <img alt="logo" src={brain} />
                        </div>
                    </Tilt> 
            </div>

            <>
            {isSignedIn
            ?   <p onClick={ () => onRouteChange('signout') } 
                    className="f3 link dim black underline pa3 pointer" 
                    >
                    Sign Out
                </p>

            :   ( <>
                    <p onClick={ () => onRouteChange('signIn') } 
                    className="register f3 link dim black underline pa3 pointer" 
                    >
                    Sign In
                    </p>
                    
                    <p onClick={ () => onRouteChange('register') } 
                    className="f3 link dim black underline pa3 pointer" 
                    >
                    Register
                    </p>
                </>
                ) 
            }
            </>
            
        </nav>
    )
}

export default Navigation