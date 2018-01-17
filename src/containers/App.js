import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as DungeonActionCreators from '../actions/dungeon'
import '../App.css';
import StatsPanel from '../components/StatsPanel'

class App extends Component {

  static propTypes = {
    playerHealth: PropTypes.number.isRequired,
    playerWeapon: PropTypes.string.isRequired,
    playerAttack: PropTypes.number.isRequired,
    playerXPToNextLevel: PropTypes.number.isRequired,
    currentDungeon: PropTypes.number.isRequired
  };

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if(event.key.includes("Arrow")) {
      event.preventDefault();
      this.props.move(event.key.replace("Arrow",""));
    }
  }

  render() {
    return (
      <div className="App">
        <StatsPanel 
          playerHealth={this.props.playerHealth}
          playerWeapon={this.props.playerWeapon}
          playerAttack={this.props.playerAttack}
          playerXPToNextLevel={this.props.playerXPToNextLevel}
          currentDungeon={this.props.currentDungeon}
        />
        <div className="map">
          {this.props.map.map((row, rowIndex) => {
            return(
              <div key={rowIndex} className="map-row">
                {row.map((block, colIndex) => {
                  return(
                    <span className={`block block-value-${block}`} key={colIndex} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map,
    playerHealth: state.playerHealth,
    playerWeapon: state.playerWeapon,
    playerAttack: state.playerAttack,
    playerXPToNextLevel: state.playerXPToNextLevel,
    currentDungeon: state.currentDungeon,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    attack: () => {
      dispatch(DungeonActionCreators.attack())
    },
    move: (direction) => {
      dispatch(DungeonActionCreators.move(direction))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);