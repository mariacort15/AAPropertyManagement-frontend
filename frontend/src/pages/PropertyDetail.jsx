import React from 'react';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const property = {
    title: "Sunset Villa",
    address: "123 Palm Avenue, Bakersfield, CA 93309",
    rent: 2450,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Enjoy luxury living at Sunset Villa — a modern 3-bedroom home featuring open-concept spaces, high ceilings, and a beautiful backyard. Located near shops, parks, and top-rated schools.",
    amenities: ["Private Garage", "In-Unit Laundry", "Central Air", "Pet Friendly"],
    contactEmail: "leasing@aapropertymanagement.com",
  };

  return (
    <div className="property-details-container">
      <img className="property-image" src={property.image} alt={property.title} />

      <div className="property-info">
        <h1>{property.title}</h1>
        <p className="address">{property.address}</p>

        <div className="property-meta">
          <p><strong>Rent:</strong> ${property.rent.toLocaleString()} / month</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Square Feet:</strong> {property.sqft}</p>
        </div>

        <p className="description">{property.description}</p>

        <div className="amenities">
          <h3>Amenities:</h3>
          <ul>
            {property.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        <button
          className="contact-btn"
          onClick={() => (window.location = `mailto:${property.contactEmail}`)}
        >
          Contact Property Manager
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;