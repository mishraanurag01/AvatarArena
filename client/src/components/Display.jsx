import React from "react";
import { useLocation } from "react-router-dom";

const Display = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="one">
      <div>
        <div className="intro">
            <img src="" alt="" />
            <h1>{location.state.th.username}</h1>
            <h2>{location.state.th.name}</h2>
            <div className="country">
              <img src="" alt="" />
              <h2>{location.state.th.homeState}</h2>
              <h2>{location.state.th.country}</h2>
            </div>
        </div>
        <div className="card">
          <div className="cleft">
            <div className="line">
              <h1>Born : </h1>
              <div className="small">
                <h4>{location.state.th.dob}</h4>
              </div>
            </div>
            <div className="line">
              <h1>Game : </h1>
              <div className="small">
                <h4>{location.state.th.game}</h4>
              </div>
            </div>
            <div className="line">
              <h1>Role : </h1>
              <div className="small">
                <h4>{location.state.th.role}</h4>
              </div>
            </div>
            <div className="line">
              <h1>Status : </h1>
              <div className="small">
                <h4>{location.state.th.status}</h4>
              </div>
            </div>
            <div className="line">
              <h1>Team :</h1>
              <div className="small">
                <h4>{location.state.th.team}</h4>
              </div>
            </div>
          </div>
          <div className="cright">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. In,
              doloribus. Sequi exercitationem dolores adipisci est commodi,
              debitis eius maxime a veniam ratione atque non? Dolorem, maxime
              soluta placeat nulla quam, ipsa, ipsam non velit earum odio
              consequuntur doloremque vero aspernatur fuga dolorum ullam officia
              tenetur quis corporis ad excepturi! Non!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
