
import React, { useState } from 'react';
import DummyList from './components/dummyList';
import DummyForm from './components/dummyForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleAddToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="App">
      <h1>Manajemen Dummy</h1>
      {/* <button onClick={handleAddToggle}>
        {showForm ? 'Tutup Form' : 'Tambah Dummy'}
      </button> */}
      {showForm && <DummyForm onClose={handleAddToggle} />}
      <DummyList />
    </div>
  );
}

export default App;
