import HeroBanner from "../components/layout/HeroBanner";
import React from 'react';
import PropertyList from '../components/PropertyList';
import useFetch from "../lib/useFetch";

export default function Home() {
  const { data: properties, error, loading } = useFetch("properties/");

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error loading properties.</p>;

  return (
    <section className="text-center">
      <h1>Welcome to AA Property Management</h1>
      <p className="lead">Reliable property management that delivers peace of mind for owners and exceptional living experiences for tenants.</p>

      <div className="mt-4">
        <img
          src="https://images.unsplash.com/photo-1572120360610-d971b9b78825"
          alt="Managed property"
          className="img-fluid rounded shadow"
          style={{ maxWidth: "80%" }}
        />
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <h4>Full-Service Management</h4>
          <p>We handle marketing, tenant placement, rent collection, and maintenance coordination with 24/7 support.</p>
        </div>
        <div className="col-md-4">
          <h4>Owner Transparency</h4>
          <p>Through your Owner Portal, access statements, work orders, and property insights anytime.</p>
        </div>
        <div className="col-md-4">
          <h4>Tenant Satisfaction</h4>
          <p>Our tenants enjoy easy online payments, responsive maintenance, and clean, well-maintained homes.</p>
        </div>
      </div>
    </section>
  );
}