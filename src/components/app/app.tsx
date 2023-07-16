import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Main } from '../../pages/main/main';
import { Offer } from '../../pages/offer/offer';
import { Login } from '../../pages/login/login';
import { Favorites } from '../../pages/favorites/favorites';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PrivateRoute } from '../private-route/private-route';

type AppProps = {
  offersNumber: number;
  userName: string;
  favoritesNumber: number;
}

function App({ offersNumber, userName, favoritesNumber }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Main offersNumber={offersNumber} userName={userName} favoritesNumber={favoritesNumber} />}
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element={<Offer />}
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export { App };
