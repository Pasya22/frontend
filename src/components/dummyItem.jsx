import React, { useState, useEffect } from 'react';
import DummyForm from './dummyForm';
import api from '../api';

const DummyList = () => {
  const [dummies, setDummies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editDummy, setEditDummy] = useState(null);
  const [success, setSuccess] = useState(null);

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
    setEditDummy(null); // Pastikan form reset saat menambah data baru
    setShowForm(!showForm); // Toggle antara form terbuka dan tertutup
  };

  const handleEdit = (dummy) => {
    setEditDummy(dummy); // Edit data yang dipilih
    setShowForm(true); // Tampilkan form saat mengedit
  };

  const handleDelete = async (dummyId) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      try {
        const response = await api.delete(`dummy/${dummyId}`);
        if (response.status === 200) {
          setSuccess('Data berhasil dihapus');
          fetchDummies(); // Perbarui daftar setelah penghapusan
        } else {
          alert('Gagal menghapus data');
        }
      } catch (error) {
        console.error('Error deleting dummy:', error);
        alert('Gagal menghapus data');
      }
    }
  };

  const handleFormSuccess = () => {
    fetchDummies(); // Refresh the list after successful operation
    setShowForm(false); // Close the form
};


  return (
    <div>
      {!showForm && ( // Hanya tampilkan tombol ini jika form sedang tidak terbuka
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
