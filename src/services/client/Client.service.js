// App.jsx
import React, { useState, useEffect } from 'react';
import Client from './Client.view';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using the service
    ClientService.getClients()
      .then(responseData => setData(responseData))
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch data');
      });
  }, []);

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <Client data={data} />
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default App;
