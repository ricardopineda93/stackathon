import React, { Component } from 'react';
import Map from './Map';
import { connect } from 'react-redux';
import { fetchAllMovies, removingFromFavorites } from '../reducers/index';
import './rootStyle.css';
if (process.env.NODE_ENV !== 'production') require('../../secrets');

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
                <h2>Filter By Borough</h2>
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
              <div>
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
              </div>
            </div>
            <div className="panel" id="itinerary">
              <div>
                <h2>My Locations</h2>
                <ul className="list-group" id="selected-locations-list">
                  {favorites.map(favorite => (
                    <li key={favorite.id}>
                      {favorite.movie.film}{' '}
                      <button
                        type="button"
                        className="rmv-fvt-btn"
                        onClick={() =>
                          this.props.removingFromFavorites(favorite.id)
                        }
                      >
                        x
                      </button>
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
  selectedMovie: state.omdbMovie.selectedMovie,
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  fetchAllMovies: () => dispatch(fetchAllMovies()),
  removingFromFavorites: id => dispatch(removingFromFavorites(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
