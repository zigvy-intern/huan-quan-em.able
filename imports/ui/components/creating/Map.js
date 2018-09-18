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

const Search = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMji00ugSeio8e2S86CP4GwvsTHuMEhRY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, marginBottom: `15px` }} />,
    mapElement: <div style={{ height: `90%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 10.794227, lng: 106.6780713
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
    <div className="flex-column">
      <div className="info-wrapper flex-row align space-between">
        <div className="flex-row align">
          <div className="info light">Address:</div>
          <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP}
            onPlacesChanged={props.onPlacesChanged}
          >
            <input 
              type="text"
              placeholder="Search places"
              className="detail bold"
              style={{ width: `100%` }}
            />
          </StandaloneSearchBox>        
        </div>				
        <button><img className="send-btn" src="/icons/send.svg" alt="send" /></button>
      </div>      
      <div>
        <GoogleMap
          ref={props.onMapMounted}
          defaultZoom={16} 
          center={props.center}
          onBoundsChanged={props.onBoundsChanged}
        >      
          {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position} />
          )}
        </GoogleMap>
      </div>
    </div>
);

const enhance = _.identity;

const ReactGoogleMaps = () => {
  return (
    <div>       
      <Search key="search" />
    </div>
  )
};

export default enhance(ReactGoogleMaps);