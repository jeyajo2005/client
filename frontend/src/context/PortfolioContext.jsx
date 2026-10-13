import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioAPI } from '../services/api';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    hero: null,
    about: null,
    services: [],
    projects: [],
    experience: [],
    achievements: [],
    team: [],
    testimonials: [],
    gallery: [],
    settings: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await portfolioAPI.getAll();
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
      setError(err.message || 'Error connecting to database');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Synchronize SEO tags with dynamic settings from MongoDB
  useEffect(() => {
    if (data.settings?.siteTitle) {
      document.title = data.settings.siteTitle;
    }
    if (data.settings?.metaDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', data.settings.metaDescription);
    }
  }, [data.settings]);

  return (
    <PortfolioContext.Provider value={{ data, loading, error, refreshData: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}
