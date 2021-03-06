import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(false);
    try {
      const request = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!request.ok) {
        throw new Error('Something went wrong');
      }
      const data = await request.json();
      applyData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setError(err.message);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
