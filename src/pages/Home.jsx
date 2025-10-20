import React from 'react'
import Banner from './Banner';
import HotJobs from './HotJobs';
import CategorySection from './CategorySection';
import TopRecruiters from './TopRecruiters';
import SubscriptionSection from './SubscriptionSection';


const Home = () => {
  return (
    <div>

     <Banner></Banner>
     <CategorySection></CategorySection>
     <HotJobs></HotJobs>
     <TopRecruiters></TopRecruiters>
     <SubscriptionSection></SubscriptionSection>



    </div>
  )
}

export default Home;
