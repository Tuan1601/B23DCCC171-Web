import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Home from './components/Dashboard/Home';
import AllDocuments from './components/Documents/AllDocuments';
import ApproveDocuments from './components/Documents/ApproveDocuments';
import UploadDocument from './components/Documents/UploadDocument';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/documents/all" element={<AllDocuments />} />
        <Route path="/documents/upload" element={<UploadDocument />} />
        <Route path="/documents/approve" element={<ApproveDocuments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
