"use client";

import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const GoogleMapComponent = () => {
  const containerStyle = {
    width: "150%",
    height: "150%",
  };

  const center = {
    lat: 46.9504023,
    lng: 7.4594791,
  };

  const mapOptions = {
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#1E2C3B",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#555555",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#333333",
          },
        ],
      },
    ],
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <LoadScript googleMapsApiKey="AIzaSyCzCq88dRONkknAExKPhiQ1scLcpS-6zoA">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={mapOptions}
          zoom={10}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
