import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from 'react-google-maps';
import mapStyles from '../../mapStyle';
import { fetchMovie, addingToFavorites } from '../reducers/index';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';

//does the recenter work?

const defaultPosition = { lat: 40.742963, lng: -73.986683 };

const Map = compose(
  withStateHandlers(
    () => ({
      currentlySelected: null
    }),
    {
      onMarkerClicked: ({ currentlySelected }) => movieId => ({
        currentlySelected: movieId
      })
    },
    {
      removeSelected: ({ currentlySelected }) => () => ({
        currentlySelected: null
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={
      props.coords
        ? { lat: props.coords.latitude, lng: props.coords.longitude }
        : defaultPosition
    }
    defaultOptions={{ styles: mapStyles }}
  >
    <Circle
      defaultCenter={
        props.coords
          ? { lat: props.coords.latitude, lng: props.coords.longitude }
          : defaultPosition
      }
      radius={1609.34 * props.distanceFilter}
    />
    {props.coords && (
      <Marker
        key="userPosition"
        position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
      />
    )}
    {props.allMovies.map(movie => (
      <Marker
        onClick={() =>
          props
            .fetchMovie(movie.imdbId)
            .then(() => props.onMarkerClicked(movie.id))
        }
        filmTitle={movie.film}
        key={movie.id}
        position={{ lat: +movie.lat, lng: +movie.lng }}
        icon={{
          url: 'http://maps.google.com/mapfiles/kml/pal2/icon30.png'
        }}
      >
        {props.currentlySelected === movie.id && (
          <InfoWindow onCloseClick={() => props.removeSelected}>
            <div>
              <h4>
                {props.selectedMovie.Title}{' '}
                <small>
                  <i>({props.selectedMovie.Year})</i>
                </small>
              </h4>
              <img src={props.selectedMovie.Poster} height="250" width="190" />
              <p>{movie.locationDetails}</p>
              <p>
                {movie.neighborhood},<br />
                {movie.boro}
                <br />
                <a href={movie.imdbLink} target="_blank">
                  <small>IMDb Link</small>
                </a>
                <br />
                <br />
                <button
                  type="button"
                  onClick={() =>
                    props.addingToFavorites(props.favorites, movie.id)
                  }
                >
                  Add to favorites
                </button>
              </p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

const mapStateToProps = state => ({
  selectedMovie: state.omdbMovie.selectedMovie,
  favorites: state.favorites
});
const mapDispatchToProps = dispatch => ({
  fetchMovie: imdbId => dispatch(fetchMovie(imdbId)),
  addingToFavorites: (favorites, movieId) => {
    const alreadyInFavorites = favorite => {
      return favorite.movie.id === movieId;
    };
    if (favorites.some(alreadyInFavorites) === false) {
      dispatch(addingToFavorites(movieId));
    }
  }
});

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map)
);
