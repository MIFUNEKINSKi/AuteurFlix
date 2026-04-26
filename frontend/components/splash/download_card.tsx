import React from 'react';
import { downloadURL } from '../../assets';

const DownloadCard: React.FC = () => (
  <div className="card cards-below">
    <img src={downloadURL} className="img-splash" />
    <div className="cards-below-txt">
      <h1>Download your shows to watch offline.</h1>
      <h2>Save your favorites easily and always have something to watch.</h2>
    </div>
  </div>
);

export default DownloadCard;
