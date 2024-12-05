import React from "react"
import HomepageHeader from "../components/HomepageHeader/HomepageHeader.tsx"
import HomepageFooter from "../components/HomepageFooter/HomepageFooter.tsx"
const HomePage: React.FC = () => {
  return (
    <div>
      <HomepageHeader />
      <img style={{width: '100%', height: '742px'}} src={require('../components/assets/image/homepage_image.png')} alt="Homepage" />
      <HomepageFooter />
    </div>
  )
}

export default HomePage