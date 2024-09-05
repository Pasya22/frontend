// src/components/DummyList.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import DummyItem from './dummyItem';

const DummyList = () => {
  const [dummies, setDummies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDummies = async () => {
    try {
      const response = await api.get('dummies');
      setDummies(response.data);
      setLoading(false);
    } catch (err) {
      setError('Gagal mengambil data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDummies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await api.delete(`dummies/${id}`);
        setDummies(dummies.filter(dummy => dummy.id !== id));
      } catch (err) {
        alert('Gagal menghapus data');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Daftar Dummy</h2>
      <ul>
        {dummies.map(dummy => (
          <DummyItem key={dummy.id} dummy={dummy} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default DummyList;
