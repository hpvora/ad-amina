import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Component } from "react";
import { GOOGLE_API_KEY } from "../Configration/configration";

export class MapNew extends Component {
  state = {
    showingInfoWindow: false, 
    activeMarker: {}, 
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({ 
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    return (
      <Map
        google={this.props.google}
        style={{ width: "100%", height: "100%", position: "relative" }}
        className={"map"}
        zoom={14}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233,
        }}
        onClick={this.onMarkerClick}
      >
        <Marker
          title={"The marker`s title will appear as a tooltip."}
          name={"SOMA"}
          position={{ lat: 37.778519, lng: -122.40564 }}
          onClick={this.onMarkerClick}
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
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(MapNew);
