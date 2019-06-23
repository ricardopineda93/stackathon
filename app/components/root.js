import React, { Component } from 'react';
import Map from './Map';
import { connect } from 'react-redux';
import {
  fetchAllMovies,
  removingFromFavorites,
  settingSelectedFavorite,
  fetchMovie
} from '../reducers/index';
import './rootStyle.css';
if (process.env.NODE_ENV !== 'production') require('../../secrets');
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure();

const notifyRemovedFavorite = (movieTitle, location) =>
  toast.warning(
    `✌️✌️Removed "${movieTitle}" in ${location} from your favorites!`,
    {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );

class Root extends Component {
  constructor() {
    super();
    this.state = {
      distanceFilter: 0.5,
      selectedBoro: 'All Boroughs'
    };
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onBoroSelectorChange = this.onBoroSelectorChange.bind(this);
  }

  onSliderChange = e => {
    this.setState({
      distanceFilter: e.target.value
    });
  };

  onBoroSelectorChange = e => {
    this.setState({
      selectedBoro: e.target.value
    });
  };

  onSelectingFavorite = async favorite => {
    await this.props.fetchMovie(favorite.movie.imdbId);
    this.props.settingSelectedFavorite(favorite);
  };

  render() {
    const allMovies = this.props.allMovies;
    const favorites = this.props.favorites;

    return (
      <div id="container">
        <main>
          <aside>
            <div className="panel" id="options-panel">
              <div>
                <h2>Radius: {this.state.distanceFilter} mile(s)</h2>
                <input
                  type="range"
                  id="distance-option"
                  name="distance-option"
                  list="tickmarks"
                  min="0.5"
                  max="2.5"
                  step="0.5"
                  value={this.state.distanceFilter}
                  onChange={e => this.onSliderChange(e)}
                />
                <datalist id="tickmarks">
                  <option value="0.5" />
                  <option value="1.0" />
                  <option value="1.5" />
                  <option value="2.0" />
                  <option value="2.5" />
                </datalist>
                {/* <button id="distance-btn" type="button" className="options-btn">
                  +
                </button> */}
              </div>
              <div>
                <h2>Filter By Borough:</h2>
                <select
                  id="borough-choices"
                  defaultValue={this.state.selectedBoro}
                  onChange={e => {
                    this.onBoroSelectorChange(e);
                  }}
                >
                  <option>All Boroughs</option>
                  <option>Manhattan</option>
                  <option>Queens</option>
                  <option>Brooklyn</option>
                  <option>The Bronx</option>
                  <option>Staten Island</option>
                </select>
                <button id="borough-add" type="button" className="options-btn">
                  +
                </button>
              </div>
              {/* <div>
                <h2>Filter</h2>
                <select id="neighborhood-choices">
                  <option>By Neighborhood</option>
                </select>
                <button
                  id="neighborhood-add"
                  type="button"
                  className="options-btn"
                >
                  +
                </button>
              </div> */}
            </div>
            <div className="panel" id="itinerary">
              <div>
                <h2>My Favorites:</h2>
                <ul className="list-group" id="selected-locations-list">
                  {favorites.map(favorite => (
                    <li key={favorite.id}>
                      <button
                        type="button"
                        className="rmv-fvt-btn"
                        onClick={() =>
                          this.props.removingFromFavorites(favorite)
                        }
                      >
                        x
                      </button>
                      <a
                        id={favorite.movie.id}
                        onClick={() => this.onSelectingFavorite(favorite)}
                      >
                        "{favorite.movie.film}" / {favorite.movie.neighborhood}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
          <div id="map-container">
            <Map
              allMovies={allMovies}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                process.env.GOOGLE_API_KEY
              }&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              distanceFilter={this.state.distanceFilter}
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allMovies: state.allMovies.allMovies,
  favorites: state.favorites.allFavorites,
  selectedFavorite: state.favorites.selectedFavorite
});

const mapDispatchToProps = dispatch => ({
  fetchAllMovies: () => dispatch(fetchAllMovies()),
  removingFromFavorites: favorite => {
    dispatch(removingFromFavorites(favorite.id));
    notifyRemovedFavorite(favorite.movie.film, favorite.movie.neighborhood);
  },
  settingSelectedFavorite: favorite => {
    dispatch(settingSelectedFavorite(favorite));
  },
  fetchMovie: imdbId => {
    dispatch(fetchMovie(imdbId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
