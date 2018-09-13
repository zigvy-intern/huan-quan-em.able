import _ from "lodash";
import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjrTE-btIp7ZYnxkRtmckqem6RS0WiTi&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 10.794, lng: 106.678 }}>
      <Marker position={{ lat: 10.794, lng: 106.678 }} />
    </GoogleMap>
)
);


const enhance = _.identity;

const ReactGoogleMaps = () => {
  return <Map key="map" />
};

export default enhance(ReactGoogleMaps);