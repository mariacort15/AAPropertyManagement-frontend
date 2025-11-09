import { Link } from 'react-router-dom';
import React from "react";
import "./PropertyCard.css";

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img
        src={property.image || "/placeholder.jpg"}
        alt={property.name}
        className="property-image"
      />
      <div className="property-details">
        <h3>{property.name}</h3>
        <p>{property.address}</p>
        <p>{property.city}, {property.state}</p>
        <p><strong>Status:</strong> {property.status}</p>
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Price:</strong> ${property.price || "N/A"}</p>
      </div>
    </div>
  );
}