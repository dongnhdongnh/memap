import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import {
  Map, InfoWindow, Marker, MarkerWithLabel
  , GoogleApiWrapper
} from 'google-maps-react';
import CurrentLocation from './Map'
import ListExe from './ListExe'
import Item from './ListExe';
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},      // Shows the InfoWindow to the selected place upon a marker
    listSchool: [
      {
        name: "Vinschool",
        position: { lat: 20.8, lng: 105.8 }
      },
      {
        name: "Vinschool2",
        position: { lat: 20.8, lng: 105.8 }
      }
    ]
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log("Click markee");
  }


  onClose = props => {

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapClicked = (props) => {
    alert("Click ");
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
    console.log("click map");
    alert("Click ");
  };

  render() {

    const elements = ['one', 'two', 'three'];

    return (
      <div>
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
          zoom={20}
          onClick={() => console.log('click')}
        >

          {this.state.listSchool.map(listitem => (
            <Marker onClick={this.onMarkerClick}
              icon={{
                url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Eucalyp-Deus_High_School.png",
                anchor: new this.props.google.maps.Point(32, 32),
                scaledSize: new this.props.google.maps.Size(64, 64)
              }}
              name={listitem.name} position={listitem.position} />
          ))}

          {/* <MarkerWithLabel
            label={{
              text: "SOMA",
              fontWeight: "bold",
              labelAnchor: new this.props.google.maps.Point(1000, -2000)
            }}
            position={{
              lat: 26.259,
              lng: -80.27,
            }}
          /> */}

          <Marker
            onClick={this.onMarkerClick}
            label={{
              text: "SOMA",
              fontWeight: "bold",
              labelAnchor: new this.props.google.maps.Point(1000, -2000)
            }}
            labelAnchor={new this.props.google.maps.Point(1000, -2000)}
            title={'School'}
            icon={{
              url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Eucalyp-Deus_High_School.png",
              anchor: new this.props.google.maps.Point(0, 0),
              scaledSize: new this.props.google.maps.Size(64, 64)
            }}
            name={'Current Location'}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>

        <ListExe />
        <button onClick={this.inc}>Click to update</button>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCbbF2wFL6aJz-SJAEBxemjk6dbjryNgwk'
})(MapContainer)
