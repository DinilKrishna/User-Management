import React, { useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'User', active: false },
    { id: 3, name: 'Sam Johnson', email: 'sam@example.com', type: 'Moderator', active: true }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Handler for opening the edit modal with selected user data
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  // Handler for closing the edit modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setCurrentUser(null);
  };

  // Handler for updating form fields in the modal
  const handleFormChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value
    });
  };

  // Handler for saving the edited user
  const handleSave = () => {
    setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
    handleCloseModal(); // Close the modal after saving
  };

  return (
    <div className='px-2'>
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
                <button onClick={() => handleEditClick(user)} className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'>Edit</button>
              </td>
              <td className='py-2 px-4 border-t'>
                <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && currentUser && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4'>
            <h2 className='text-2xl font-bold mb-4'>Edit User</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='mb-4'>
                <input
                  type='text'
                  name='name'
                  value={currentUser.name}
                  placeholder='Name'
                  onChange={handleFormChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <input
                  type='email'
                  name='email'
                  value={currentUser.email}
                  placeholder='Email'
                  onChange={handleFormChange}
                  className='w-full p-2 border border-gray-300 rounded'
                  required
                />
              </div>
              <div className='mb-4'>
                <select
                  name='type'
                  value={currentUser.type}
                  onChange={handleFormChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  <option value='User'>User</option>
                  <option value='Admin'>Admin</option>
                  <option value='Moderator'>Staff</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    name='active'
                    checked={currentUser.active}
                    onChange={() => setCurrentUser({ ...currentUser, active: !currentUser.active })}
                    className='mr-2'
                  />
                  Active
                </label>
              </div>
              <div className='flex justify-end'>
                <button onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'>
                  Save
                </button>
                <button onClick={handleCloseModal} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
