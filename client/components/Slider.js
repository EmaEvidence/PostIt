import React from 'react';
import img from './img/img.jpg';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';

class Slider extends React.Component {
  render() {
    return (
      <div id="myslider" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myslider" data-slide-to="0" className="active" />
          <li data-target="#myslider" data-slide-to="1" />
          <li data-target="#myslider" data-slide-to="2" />
        </ol>

        <div className="carousel-inner">
          <div className="item active">
            <img src={img} alt="Here" />
          </div>

          <div className="item">
            <img src={img1} alt="Chicago" />
          </div>

          <div className="item">
            <img src={img2} alt="Chicago" />
          </div>

          <div className="item">
            <img src={img3} alt="New York" />
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
