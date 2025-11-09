import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertyGrid.css';

export default function PropertyGrid({ properties = [] }) {
  if (!properties.length) {
    return <p>No properties to display.</p>;
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}