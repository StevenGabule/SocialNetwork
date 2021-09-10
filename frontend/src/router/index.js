import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from "../page/Home";
import SignUp from "../page/SignUp";
import SignIn from "../page/SignIn";

function IndexRouter() {
  return (
    <div>
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/sign-up'} exact component={SignUp} />
        <Route path={'/sign-in'} exact component={SignIn} />
      </Switch>
    </div>
  )
}

export default IndexRouter;
