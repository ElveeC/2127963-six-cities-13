import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import { Map } from '../../components/map/map';
import { OfferList } from '../../components/offer-list/offer-list';
import { ReviewForm } from '../../components/review-form/review-form';
import { ReviewList } from '../../components/review-list/review-list';
import { Review } from '../../types/review-type';
import { Offer, DetailedOffer } from '../../types/offer-type';
import { Rating } from '../../const';
import { PageNotFound } from '../page-not-found/page-not-found';

type OfferProps = {
  detailedOffers: DetailedOffer[];
  offersNearby: Offer[];
  reviews: Review[];
}

function OfferPage({ detailedOffers, offersNearby, reviews }: OfferProps) {
  const [hoveredOffer, setHoveredOffer] = useState<Offer | undefined>(undefined);

  const handleOfferHover = (id: string | undefined) => {
    if (!id) {
      setHoveredOffer(undefined);
    }

    const currentOffer = offersNearby.find((offerNearby) => offerNearby.id === id);

    setHoveredOffer(currentOffer);
  };

  const offerToShow = useParams();
  const selectedOffer = detailedOffers.find((detailedOffer) => detailedOffer.id === offerToShow.id);

  if (!selectedOffer){
    return <PageNotFound />;
  }

  const {
    type,
    isPremium,
    title,
    isFavorite,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    city
  } = selectedOffer;

  const offerRating = rating * Rating.Percent / Rating.Divisor;
  const {name, avatarUrl, isPro} = host;

  return (
    <div className="page">
      <Helmet>
        <title>Six cities: Offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {selectedOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={type}/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">

              {isPremium &&
              <div className="place-card__mark">
                <span>Premium</span>
              </div>}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>

                {isFavorite
                  ?
                  <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                  :
                  <button className="place-card__bookmark-button button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>}

              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offerRating}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (<li className="offer__inside-item" key={good}>{good}</li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{name}</span>
                  {isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewList reviews={reviews}/>
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={city}
              offers={offersNearby}
              selectedOffer={hoveredOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferList
              offers={offersNearby}
              onOfferHover={handleOfferHover}
              isCitiesCard={false}
              isNearbyPlaceCard
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
