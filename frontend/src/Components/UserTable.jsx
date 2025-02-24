import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const UserTable = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on searchTerm (if provided)
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className='px-2'>
      <table className='min-w-full bg-violet-300 rounded-lg shadow-xl'>
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
          {filteredUsers.map((user) => (
            <tr key={user.id} className="last:border-b-0">
              <td className='py-2 px-4 border-t'>{user.id}</td>
              <td className='py-2 px-4 border-t'>{user.username}</td>
              <td className='py-2 px-4 border-t'>{user.email}</td>
              <td className='py-2 px-4 border-t'>{user.is_staff? 'Admin' : 'User'}</td>
              <td className='py-2 px-4 border-t'>{user.is_active ? 'Active' : 'Blocked'}</td>
              <td className='py-2 px-4 border-t'>
                <button 
                  onClick={() => handleEditClick(user)}
                  className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'
                >
                  Edit
                </button>
              </td>
              <td className='py-2 px-4 border-t'>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal and its handlers (if needed) */}
    </div>
  );
};

export default UserTable;
