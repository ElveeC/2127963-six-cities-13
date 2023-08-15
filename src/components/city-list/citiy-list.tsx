import {Link} from 'react-router-dom';
import { MouseEvent } from 'react';
import cn from 'classnames';

//import { useAppDispatch/*, useAppSelector*/ } from '../../hooks';
//import { selectCity } from '../../store/action';
import { CITIES } from '../../const';

type CityListProps = {
  selectedCity: string;
  onCityClick: (evt: MouseEvent<HTMLElement>) => void;
}

function CityList ({ selectedCity, onCityClick }: CityListProps) {
  /*const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);

  const handleCityClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (!evt.currentTarget.textContent) {
      return;
    }
    dispatch(selectCity(evt.currentTarget.textContent));
  };*/

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <Link className={cn(
            'locations__item-link',
            'tabs__item',
            {'tabs__item--active': city === selectedCity}
          )} to="#" onClick={onCityClick}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>

  );
}

export { CityList };
