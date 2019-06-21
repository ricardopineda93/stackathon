import React, { Component } from 'react';
import Map from './Map';
import { connect } from 'react-redux';
import { fetchAllMovies } from '../reducers/allMoviesReducer';
import './rootStyle.css';
if (process.env.NODE_ENV !== 'production') require('../../secrets');

class Root extends Component {
  componentDidMount() {
    this.props.fetchAllMovies();
  }
  render() {
    const allMovies = this.props.allMovies;
    return (
      <div id="container">
        <header>
          <h1 className="first">nyscene.</h1>
          <h1 className="second">nyscene.</h1>
          <h1 className="third">nyscene.</h1>
        </header>
        <main>
          <aside>
            <div className="panel" id="options-panel">
              <div>
                <h2>Filter</h2>
                <select id="distance-option">
                  <option>By Distance</option>
                </select>
                <button id="distance-btn" className="options-btn">
                  +
                </button>
              </div>
              <div>
                <h2>Filter</h2>
                <select id="borough-choices">
                  <option>By Borough</option>
                </select>
                <button id="borough-add" className="options-btn">
                  +
                </button>
              </div>
              <div>
                <h2>Filter</h2>
                <select id="neighborhood-choices">
                  <option>By Neighborhood</option>
                </select>
                <button id="neighborhood-add" className="options-btn">
                  +
                </button>
              </div>
            </div>
            <div className="panel" id="itinerary">
              <div>
                <h2>My Locations</h2>
                <ul className="list-group" id="selected-locations-list" />
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
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allMovies: state.allMovies.allMovies,
  selectedMovie: state.omdbMovie.selectedMovie
});

const mapDispatchToProps = dispatch => ({
  fetchAllMovies: () => dispatch(fetchAllMovies())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
