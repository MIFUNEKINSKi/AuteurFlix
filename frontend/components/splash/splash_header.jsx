import React from "react"
import { Link } from "react-router-dom"

export default () => (
 
  <div className='splash-header'> 
    <img id="Logo"
      src={window.logoURL}
      className="img-splash" />
   
 <button>Sign In</button>
    
  {/* <Link className="signin-btn" to='/login'>Log In</Link>  */}
</div>

);
