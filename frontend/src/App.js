import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotIndex";
import SpotDetails from "./components/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotIndex} />
          <Route exact path="/spots/:id" component={SpotDetails} />
        </Switch>
      )}
    </>
  );
}

export default App;
