import React, { useState, useEffect } from 'react';
import DummyForm from './dummyForm';
import api from '../api';

const DummyList = () => {
  const [dummies, setDummies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editDummy, setEditDummy] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch the list of dummies
  const fetchDummies = async () => {
    try {
      const response = await api.get('dummy');
      setDummies(response.data);
    } catch (error) {
      console.error('Error fetching dummies:', error);
    }
  };

  useEffect(() => {
    fetchDummies();
  }, []);

  const handleAddToggle = () => {
    setEditDummy(null);
    setShowForm(!showForm);
  };

  const handleEdit = (dummy) => {
    setEditDummy(dummy);
    setShowForm(true);
  };

  const handleDelete = async (dummyId) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      try {
        await api.delete(`dummy/${dummyId}`);
        fetchDummies(); // Update list after delete
        setSuccess('Data berhasil dihapus');
      } catch (error) {
        console.error('Error deleting dummy:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  const handleFormSuccess = () => {
    fetchDummies(); // Refresh the list when form operation is successful
    setShowForm(false); // Close form after success
  };

  return (
    <div>
      {!showForm && (
        <button onClick={handleAddToggle}>
          {showForm ? 'Tutup Form' : 'Tambah Dummy'}
        </button>
      )}
      {showForm && (
        <DummyForm
          dummy={editDummy}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <ul>
        {dummies.map(dummy => (
          <li key={dummy.id}>
            {dummy.name} - {dummy.hobby}
            <button onClick={() => handleEdit(dummy)}>Edit</button>
            <button onClick={() => handleDelete(dummy.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DummyList;
