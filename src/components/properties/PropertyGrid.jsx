import React, {useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { fetchProperties } from '../../lib/api';
import './PropertyGrid.css';

export default function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        console.error(err);
        setError("Could not load properties.");
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  if (loading) return <p>Loading Properties...</p>;
  if (error) return <p style={{ color: "red"}}>{error}</p>;
  if (!properties.length) return <p>No properties found.</p>;


  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}