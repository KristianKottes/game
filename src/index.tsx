import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, BrowserRouter, RouteProps, Route } from 'react-router-dom';

import { AuthGuard, RouteGuard } from './components';
import { GamePage, HomePage, SignIn, SignUp } from './pages';
import { AuthProvider } from './providers';
import reportWebVitals from './reportWebVitals';

import './index.css';

const routes: RouteProps[] = [
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
];

const protectedRoutes: RouteProps[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  { path: '/game/:gameId', element: <GamePage /> },
];

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route element={<RouteGuard />}>
              {protectedRoutes.map((props) => (
                <Route key={props.path} {...props} />
              ))}
            </Route>
            {routes.map((props) => (
              <Route key={props.path} {...props} />
            ))}
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
