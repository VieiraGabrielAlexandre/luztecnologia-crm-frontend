// ClienteService.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClientDetailView from "./ClientDetail.view";

function ClienteService() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:3001/api/clients/${id}`)
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

  return (
    <div>
      {loading ? (
        'Loading...'
      ) : error ? (
        <div>Error: {error}</div>
      ) : data !== null ? (
        <ClientDetailView data={data.data || []} loading={loading} />
      ) : null}
    </div>
  );
}

export default ClienteService;
