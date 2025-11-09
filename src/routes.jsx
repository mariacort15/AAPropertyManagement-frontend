import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Apply from './pages/Apply';
import PropertyDetails from './pages/PropertyDetails';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
    </Routes>
  );
}