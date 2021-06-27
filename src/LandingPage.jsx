import React from "react";
import Style from "./LandingPage.module.css";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <div className={Style.container}>
        <div className={Style.card}>
        <Link to="/create-room" style={{textDecoration:'none'}}>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={Style.createRoom}
            >
              Create a Room
            </Button>
          </div>
          </Link>
          <div className={Style.separator}>OR</div>
          <Link to="/join-room" style={{textDecoration:'none'}}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={Style.createRoom}
              >
                Join a Room
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
