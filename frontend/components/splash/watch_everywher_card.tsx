import React from 'react';
import { watchEverywhereURL } from '../../assets';

const WatchEverywhereCard: React.FC = () => (
  <div className="card cards-below">
    <div className="cards-below-txt">
      <h1>Watch everywhere.</h1>
      <h2>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</h2>
    </div>
    <img src={watchEverywhereURL} className="img-splash" />
  </div>
);

export default WatchEverywhereCard;
