import React from 'react';
import { netflixAndChillURL } from '../../assets';

const EnjoyCard: React.FC = () => (
  <div className="card cards-below">
    <div className="cards-below-txt">
      <h1>Enjoy on your TV</h1>
      <h2>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
    </div>
    <img src={netflixAndChillURL} className="img-splash" />
  </div>
);

export default EnjoyCard;
