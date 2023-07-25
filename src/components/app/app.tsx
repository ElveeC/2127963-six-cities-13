import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { MainPage } from '../../pages/main-page/main-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';

import { AppRoute, AuthorizationStatus } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { Offers } from '../../types/offer-type';
import { DetailedOffer } from '../../types/offer-type';
import { Review } from '../../types/review-type';

type AppProps = {
  offersNumber: number;
  offers: Offers;
  detailedOffers: DetailedOffer[];
  reviews: Review[];
};

function App({ offersNumber, offers, detailedOffers, reviews }: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offersNumber={offersNumber} offers={offers}/>}
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage detailedOffers={detailedOffers} reviews={reviews}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesPage offers={offers}/>
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
