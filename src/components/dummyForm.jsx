import React, { useState } from 'react';
import api from '../api';

const DummyForm = ({ dummy = null, onClose, onSuccess }) => {
    const [name, setName] = useState(dummy ? dummy.name : '');
    const [hobby, setHobby] = useState(dummy ? dummy.hobby : '');
    const [description, setDescription] = useState(dummy ? dummy.description : '');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !hobby || !description) {
            setError('Semua field harus diisi');
            return;
        }

        const data = { name, hobby, description };

        try {
            let response;
            if (dummy) {
                response = await api.put(`dummy/${dummy.id}/edit`, data, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                response = await api.post('dummy/create', data, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (response.data.success) {
                setSuccess(response.data.success);
                setError(null);
                onSuccess(); // Trigger success callback to refresh the list
                onClose(); // Close form after success
            } else {
                setError('Tidak ada pesan sukses dari server');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setError(err.response.data.errors);
            } else {
                setError('Terjadi kesalahan');
            }
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>{dummy ? 'Edit Dummy' : 'Tambah Dummy'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
                <label>Nama:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Hobby:</label>
                <input
                    type="text"
                    value={hobby}
                    onChange={e => setHobby(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">{dummy ? 'Update' : 'Tambah'}</button>
            <button type="button" onClick={onClose}>Batal</button>
        </form>
    );
};

export default DummyForm;
