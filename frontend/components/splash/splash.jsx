import React from "react"
import SplashHeader from "./splash_header"
import SignupFooter from "./signup_footer"
import SignupField from "./signup_field"


export default props => (
  <div className="splash-main">
        <SplashHeader />
    <SignupField />
  
   <footer>
    <SignupFooter /> 
  </footer> 
  </div>
)