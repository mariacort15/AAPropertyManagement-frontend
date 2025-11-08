import { useEffect, useState } from 'react';

export default function useQuery(key, fn, deps=[]) {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fn().then(d=> alive && setData(d))
       .catch(e=> alive && setError(e))
       .finally(()=> alive && setLoading(false));
    return ()=>{ alive=false; };
  }, deps);

  return { data, loading, error };
}