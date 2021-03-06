import React from "react";
import Messenger from "./Messenger.jsx";
import LandingPage from "./LandingPage";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom.jsx";
import { Route, Switch } from "react-router-dom";
import { HashRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path='/join-room' component={JoinRoom} />
          <Route exact path='/create-room' component={CreateRoom} />
          <Route exact path='/messenger/:roomName/:userName/:pickcolor' component={Messenger}/>
          <Route path='/' component={LandingPage} />
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
