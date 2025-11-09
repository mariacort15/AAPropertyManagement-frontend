import { useState, useMemo } from 'react';
import useFetch from '../lib/useFetch';
import PropertyCard from '../components/properties/PropertyCard';
import { apiRequest } from '../lib/apiClient';

export default function Properties() {
  const { data: properties, loading, error } = useFetch('properties/');
  const [filters, setFilters] = useState({
    city: '',
    minRent: '',
    maxRent: '',
    bedrooms: '',
    keyword: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesCity = filters.city ? p.city.toLowerCase().includes(filters.city.toLowerCase()) : true;
      const matchesMinRent = filters.minRent ? p.rent >= Number(filters.minRent) : true;
      const matchesMaxRent = filters.maxRent ? p.rent <= Number(filters.maxRent) : true;
      const matchesBedrooms = filters.bedrooms ? p.bedrooms === Number(filters.bedrooms) : true;
      const matchesKeyword = filters.keyword
        ? p.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.keyword.toLowerCase())
        : true;

      return matchesCity && matchesMinRent && matchesMaxRent && matchesBedrooms && matchesKeyword;
    });
  }, [properties, filters]);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error loading properties: {error.message}</p>;

  return (
    <section>
      <h2>Available Rentals</h2>
      <p className="text-muted mb-4">
        Use the filters below to narrow your search.
      </p>

      {/*Filter Bar */}
      <div className="p-3 border rounded bg-light mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">City</label>
            <input
              name="city"
              type="text"
              className="form-control"
              placeholder="Enter city..."
              value={filters.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Min Rent ($)</label>
            <input
              name="minRent"
              type="number"
              className="form-control"
              value={filters.minRent}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Max Rent ($)</label>
            <input
              name="maxRent"
              type="number"
              className="form-control"
              value={filters.maxRent}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Bedrooms</label>
            <input
              name="bedrooms"
              type="number"
              className="form-control"
              value={filters.bedrooms}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Keyword</label>
            <input
              name="keyword"
              type="text"
              className="form-control"
              placeholder="e.g. loft, family, condo"
              value={filters.keyword}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/*Property List */}
      {filteredProperties.length > 0 ? (
        <div className="d-flex flex-wrap gap-4">
          {filteredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <p>No properties match your search.</p>
      )}
    </section>
  );
}