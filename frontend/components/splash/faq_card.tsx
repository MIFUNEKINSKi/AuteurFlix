import React from 'react';
import { faqURL } from '../../assets';

const FAQ: React.FC = () => (
  <div className="card cards-below">
    <div className="cards-below-txt">
      <h1>FAQ</h1>
      <img src={faqURL} className="img-splash" />
    </div>
  </div>
);

export default FAQ;
