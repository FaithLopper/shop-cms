import React, { useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapGoogle = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const getInitVal = () => {
    const { getter } = props;
    const lat = parseFloat(getter("latitude"));
    const lng = parseFloat(getter("longitude"));

    return {
      lat: lat ? lat : 13.068776734357721, //init val, local vvn
      lng: lng ? lng : 108.62462668273137,
    };
  };

  const [cordinate, setCordinate] = useState(getInitVal());

  const setNewVal = (ev) => {
    const { setter, onValueChange } = props;
    const newCordinate = {
      lat: ev.latLng.lat(),
      lng: ev.latLng.lng(),
    };
    onValueChange();
    setCordinate(newCordinate); // set state use for marker
    setter("latitude", newCordinate.lat); // set form ref
    setter("longitude", newCordinate.lng); // set form ref
  };

  return (
    <>
      <GoogleMap
        onClick={(ev) => setNewVal(ev)}
        defaultCenter={cordinate}
        defaultZoom={3}
      >
        {props.isMarkerShown && (
          <Marker position={cordinate} onClick={props.onMarkerClick} />
        )}
      </GoogleMap>
    </>
  );
});

export default MapGoogle;
