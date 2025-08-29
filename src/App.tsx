/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
import { Fragment, createElement } from 'react';
import { Outlet, Route, Router, Routes } from 'react-router';
import { history, type RouteType } from './routes';

interface INestedRoute {
  route: RouteType;
}
const NestedRoute: React.FC<INestedRoute> = ({ route }) => {
  const { path, Component, Layout, SelfLayout, children } = route;
  const RouteComponent = createElement(SelfLayout ?? Fragment, null, createElement(Component));
  return (
    <Route path={path} element={Layout}>
      {children.map(nestedRoute => (
        <NestedRoute key={nestedRoute.path} route={nestedRoute} />
      ))}
    </Route>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="react-webpack-base" location={history.location} navigator={history}>
      <Routes>
        <Route path="/" element={<div>hello world</div>} />
        <Route path="/auth">
          <Route
            path="forgot"
            element={
              <div>
                forgot one <Outlet />
              </div>
            }
            Component={() => <div>hello forgot</div>}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
