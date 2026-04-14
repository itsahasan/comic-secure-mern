export default function Home() {
  return (
    <div className='mx-auto max-w-5xl p-6'>
      <h1 className='mb-3 text-3xl font-bold'>Security-first MERN lab</h1>
      <p className='mb-4'>Visitors cannot see comics. Login is required for everything.</p>
      <div className='rounded bg-white p-4 shadow'>
        <h2 className='mb-2 font-semibold'>Role rules</h2>
        <ul className='list-disc pl-5 text-sm'>
          <li>super_admin creates only admins</li>
          <li>admin creates fiends or admins and manages comics</li>
          <li>fiend can only view comics</li>
          <li>visitors have no access</li>
        </ul>
      </div>
    </div>
  );
}
