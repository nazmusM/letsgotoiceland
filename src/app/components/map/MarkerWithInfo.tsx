import React, { useState } from "react";
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps";

type Position = {
  lat: number;
  lng: number;
};

export const MarkerWithInfowindow = ({
  info,
  position,
}: {
  info: string;
  position: Position;
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useMarkerRef();

  return (
    <>
      <Marker
        ref={markerRef}
        onClick={() => setInfowindowOpen(!infowindowOpen)}
        position={position}
        title={"Marker that opens an Infowindow when clicked."}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <span className="text-smBase font-medium md:text-mdBase">{info}</span>
        </InfoWindow>
      )}
    </>
  );
};
