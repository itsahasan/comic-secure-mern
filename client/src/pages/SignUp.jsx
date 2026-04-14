import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiFetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      navigate('/sign-in');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mx-auto max-w-md p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='space-y-3 rounded bg-white p-4 shadow'>
        <input name='username' placeholder='Username' className='w-full rounded border p-2' onChange={handleChange} />
        <input name='email' type='email' placeholder='Email' className='w-full rounded border p-2' onChange={handleChange} />
        <input name='password' type='password' placeholder='Password' className='w-full rounded border p-2' onChange={handleChange} />
        <button disabled={loading} className='w-full rounded bg-slate-800 p-2 text-white'>
          {loading ? 'Loading...' : 'Create account'}
        </button>
        {error && <p className='text-sm text-red-600'>{error}</p>}
      </form>
      <p className='mt-3 text-sm'>Already have an account? <Link to='/sign-in' className='text-blue-600'>Sign in</Link></p>
    </div>
  );
}
