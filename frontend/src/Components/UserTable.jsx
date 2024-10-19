import React from 'react';

const UserTable = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'User', active: false },
    { id: 3, name: 'Sam Johnson', email: 'sam@example.com', type: 'Moderator', active: true }
  ];

  return (
    <div className='p-4'>
      <table className='min-w-full bg-violet-300 rounded-lg shadow-xl max-w-md'>
        <thead>
          <tr>
            <th className='py-2 px-4'>ID</th>
            <th className='py-2 px-4'>User Name</th>
            <th className='py-2 px-4'>Email</th>
            <th className='py-2 px-4'>User Type</th>
            <th className='py-2 px-4'>Active</th>
            <th className='py-2 px-4'>Edit</th>
            <th className='py-2 px-4'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="last:border-b-0">
              <td className='py-2 px-4 border-t'>{user.id}</td>
              <td className='py-2 px-4 border-t'>{user.name}</td>
              <td className='py-2 px-4 border-t'>{user.email}</td>
              <td className='py-2 px-4 border-t'>{user.type}</td>
              <td className='py-2 px-4 border-t'>{user.active ? 'Active' : 'Blocked'}</td>
              <td className='py-2 px-4 border-t'>
                <button className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'>Edit</button>
              </td>
              <td className='py-2 px-4 border-t'>
                <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
