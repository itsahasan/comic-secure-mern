import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-white shadow'>
      <div className='mx-auto flex max-w-5xl items-center justify-between p-4'>
        <Link to='/' className='text-lg font-bold'>
          Secure Comics
        </Link>
        <nav>
          <ul className='flex gap-4 text-sm'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/sign-in'>Sign In</Link></li>
            <li><Link to='/sign-up'>Sign Up</Link></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
