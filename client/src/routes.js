import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { SignUpPage } from './pages/SignUpPage';
import { AuthPage } from './pages/AuthPage';
import { PersonalChangePage } from './pages/PersonalChangePage';
import { PersonalPage } from './pages/PersonalPage';
import { VehiclePage } from './pages/VehiclePage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/personal" exact>
          <PersonalPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Route path="/personal-change" exact>
          <PersonalChangePage />
        </Route>
        <Route path="/vehicle" exact>
          <VehiclePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Route path="/main" exact>
        <MainPage />
      </Route>
      <Route path="/signup" exact>
        <SignUpPage />
      </Route>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
}
