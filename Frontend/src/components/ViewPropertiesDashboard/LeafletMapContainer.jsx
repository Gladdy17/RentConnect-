import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { getImageURL } from '../../helpers/getImageURL';
import "leaflet/dist/leaflet.css";

import { LocationPin } from '../../JS/LocationPin';

function LeafletMapContainer({ listings, geoLocation, onMarkerClick }) {
    

    return (
        <MapContainer
            className="Leaflet_map"
            style={{ height: "800px" }}
            center={[53, -110]}
            zoom={3}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            />

            {listings.map((listing, index) => {
                // Ensure latitude and longitude exist before rendering the marker
                if (listing.latitude && listing.longitude) {
                    return (
                        <Marker
                            key={index}
                            position={[listing.latitude, listing.longitude]}
                            icon={LocationPin}
                        >
                            <Popup>
                                <img
                                    onClick={() => {
                                        onMarkerClick(listing.id)}}
                                    cursor="pointer"
                                    src={getImageURL(listing.property_types)}
                                    alt={listing.title}
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <div>
                                    <strong>{listing.title}</strong>
                                    <br />
                                    {listing.description}
                                    <br />
                                    ${listing.fees}
                                </div>
                            </Popup>
                        </Marker>
                    );
                }
                return null; // Return null if latitude or longitude is missing
            })}
            <Marker 
                position={[geoLocation.latitude, geoLocation.longitude]}
            />
        </MapContainer>
    );
}

export default LeafletMapContainer