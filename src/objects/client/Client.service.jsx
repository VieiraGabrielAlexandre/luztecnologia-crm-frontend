// Client.service.jsx
import React, { useState, useEffect } from 'react';
import ClientView from './Client.view';

function ClienteService() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  const fetchData = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:3001/api/clients?page=${currentPage}&limit=${perPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setError(null);
        setData(json);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError('Failed to fetch data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1)
  };

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : error ? (
        <div>Error: {error}</div>
      ) : data !== null ? (
        <ClientView
          data={data || []}
          loading={loading}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          perPage={perPage}
          currentPageProp={currentPage}
        />
      ) : null}
    </div>
  );
}

export default ClienteService;
