import React, {useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { fetchProperties } from '../../lib/api';
import './PropertyGrid.css';

export default function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ city: "", type: "", status: "" });
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

  useEffect(() => {
    let result = [...properties];
    if (filters.city)
      result = result.filter((p) =>
        p.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    if (filters.type)
      result = result.filter((p) => p.type === filters.type);
    if (filters.status)
      result = result.filter((p) => p.status === filters.status);
    setFiltered(result);
  }, [filters, properties]);


  if (loading) return <p>Loading Properties...</p>;
  if (error) return <p style={{ color: "red"}}>{error}</p>;
  if (!properties.length) return <p>No properties found.</p>;


  return (
    <div>
      <PropertyFilters filters={filters} onChange={setFilters} />
      <div className="property-grid">
        {filtered.length > 0 ? (
          filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
}