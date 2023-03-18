import React, { useState, useEffect } from 'react';

import "../styles/styles.scss";

import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';

import illustration from "../../banner_cities.json";
import illustrationTwo from "../../section_two.json";

export default function Home () {
  const [illustrationData, setIllustrationData] = useState([]);

  useEffect(() => {
    setIllustrationData(illustration);
  }, []);

  return (
    <div className="Home">
      <Header />
      <Banner />
      <main>
        <section>
          <h2>Explore nearby</h2>

          <div>
            {illustrationData && illustrationData.map(({ id, img, distance, location }) => (
              <SmallCard
                key={id}
                img={img}
                distance={distance}
                location={location} />
            ))}
          </div>
        </section>
        <section>
          <h2>Live Anywhere</h2>
          <div>
          {illustrationTwo && illustrationTwo.map(({ id, img, title}) => (
            <MediumCard 
                key={id}
                img={img}
                title={title}/>
          ))}
          </div>
        </section>
      </main>
    </div>
  );
}