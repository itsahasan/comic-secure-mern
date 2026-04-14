import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [comics, setComics] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const me = await apiFetch('/api/auth/me');
        setUser(me);
        const items = await apiFetch('/api/comics?limit=10');
        setComics(items);
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, []);

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Dashboard</h1>
      {error && <p className='mb-4 text-red-600'>{error}</p>}
      {user && (
        <div className='mb-4 rounded bg-white p-4 shadow'>
          <p><strong>User:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
      <div className='rounded bg-white p-4 shadow'>
        <h2 className='mb-3 font-semibold'>Latest comics</h2>
        <div className='space-y-2'>
          {comics.map((comic) => (
            <div key={comic._id} className='rounded border p-3'>
              <p className='font-medium'>{comic.title}</p>
              <p className='text-sm text-slate-600'>{comic.serie} • {comic.number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
