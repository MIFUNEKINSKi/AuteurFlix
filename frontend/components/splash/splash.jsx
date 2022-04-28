import React from "react"
import SplashHeader from "./splash_header"
import SignupFooter from "./signup_footer"
import SignupField from "./signup_field"
import KidsCard from "./kids_card"
import DownloadCard from "./download_card"
import WatchEverywhereCard from "./watch_everywher_card"
import FAQ from "./faq_card"
import EnjoyCard from "./enjoy_card"
import BottomSignupField from "./bottom_signup"



export default props => (
  <div>
  <div className="splash-main">
        <SplashHeader />
      <SignupField history={props.history}/>
  </div>
    <KidsCard /> 
     <EnjoyCard />
      <DownloadCard /> 
      <WatchEverywhereCard /> 
      <FAQ /> 
    {/* need this signup to only be email and limited text */}
    <BottomSignupField />
   <footer>
    <SignupFooter /> 
  </footer> 
 </div > 
)