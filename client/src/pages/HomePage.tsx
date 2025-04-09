import React from "react"
import HomepageHeader from "../components/HomepageHeader/HomepageHeader.tsx"
import HomepageFooter from "../components/HomepageFooter/HomepageFooter.tsx"
import '../css/HomePage.css'
const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <HomepageHeader />
      <img className="main-img" src={require('../components/assets/image/homepage_image.png')} alt="Homepage" />
      <HomepageFooter />
    </div>
  )
}

export default HomePage