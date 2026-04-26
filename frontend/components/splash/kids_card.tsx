import React from 'react';
import { kidsIntroURL } from '../../assets';

const KidsCard: React.FC = () => (
  <div className="card cards-below">
    <img src={kidsIntroURL} className="img-splash" />
    <div className="cards-below-txt">
      <h1>Create profiles for your family.</h1>
      <h2>Send gramma and grampa on adventures with their favorite movies from their era!</h2>
    </div>
  </div>
);

export default KidsCard;
