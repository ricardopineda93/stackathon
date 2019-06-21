import React, { useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import mapStyles from '../../mapStyle';

const Map = props => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 40.742963, lng: -73.986683 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {props.allMovies.map(movie => (
        <Marker
          onClick={() => setSelectedMovie(movie)}
          filmTitle={movie.film}
          key={movie.id}
          imdbId={movie.imdbId}
          year={movie.year}
          locationDetails={movie.locationDetails}
          neighborhood={movie.neighborhood}
          boro={movie.boro}
          position={{ lat: +movie.lat, lng: +movie.lng }}
          icon={{
            url: 'http://maps.google.com/mapfiles/kml/pal2/icon30.png'
          }}
        />
      ))}
      {selectedMovie && (
        <InfoWindow
          position={{ lat: +selectedMovie.lat, lng: +selectedMovie.lng }}
          onCloseClick={() => setSelectedMovie(null)}
        >
          <div>
            <h4>{selectedMovie.film}</h4>
            <small>{selectedMovie.year}</small>
            <p>{selectedMovie.neighborhood}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export const WrappedMap = withScriptjs(withGoogleMap(Map));
