import React, { useState, useMemo } from "react";
import useFetch from "../lib/useFetch";
import PropertyCard from "../components/properties/PropertyCard";
import "./Properties.css";

export default function Properties() {
  const { data: properties, loading, error } = useFetch("/properties/");
  const [filters, setFilters] = useState({
    city: "",
    minRent: "",
    maxRent: "",
    bedrooms: "",
    keyword: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesCity = filters.city
        ? p.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;
      const matchesMinRent = filters.minRent
        ? p.rent >= Number(filters.minRent)
        : true;
      const matchesMaxRent = filters.maxRent
        ? p.rent <= Number(filters.maxRent)
        : true;
      const matchesBedrooms = filters.bedrooms
        ? p.bedrooms === Number(filters.bedrooms)
        : true;
      const matchesKeyword = filters.keyword
        ? p.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.keyword.toLowerCase())
        : true;

      return (
        matchesCity &&
        matchesMinRent &&
        matchesMaxRent &&
        matchesBedrooms &&
        matchesKeyword
      );
    });
  }, [properties, filters]);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error loading properties: {error.message}</p>;

  return (
    <>
      {/*Hero Section (Bakersfield intro) */}
      <section className="bakersfield-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h2 className="hero-subtitle">BAKERSFIELD</h2>
            <h1 className="hero-title">HOMES FOR RENT</h1>
            <p className="hero-tagline">FIND YOUR PERFECT HOME</p>

            <a href="/apply" className="hero-button">
              APPLY ONLINE →
            </a>

            <p className="hero-description">
              Welcome to <strong>AA Property Management</strong> — proudly
              serving Bakersfield and nearby areas. Explore our curated list of
              rental homes, condos, and apartments managed with care. Whether
              you’re relocating or searching for a new home, we’ll help you find
              your perfect rental property! 
            </p>
          </div>
        </div>
      </section>

      {/*Filter Section */}
      <section className="filters-section container mt-5">
        <h2 className="text-center mb-4">Available Rentals</h2>
        <p className="text-muted text-center mb-4">
          Use the filters below to narrow your search and find your ideal home.
        </p>

        <div className="filter-bar p-3 border rounded bg-light mb-5">
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
                placeholder="e.g. downtown, family, condo"
                value={filters.keyword}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/*Property Listings */}
        <div className="property-list container">
          {filteredProperties.length > 0 ? (
            <div className="d-flex flex-wrap gap-4 justify-content-center">
              {filteredProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">
              No properties match your search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}