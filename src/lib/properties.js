import { apiRequest } from "./apiClient";

export async function getAllProperties() {
  return await apiRequest("properties/");
}

export async function getPropertyById(id) {
  return await apiRequest(`properties/${id}/`);
}

export async function applyForProperty(propertyId, applicationData) {
  return await apiRequest(`properties/${propertyId}/apply/`, {
    method: "POST",
    body: JSON.stringify(applicationData),
  });
}