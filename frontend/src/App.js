import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Courselist from './comonents/Courselist';
import CourseDetails from './comonents/CourseDetails';
import StudentDashboard from './comonents/StudentDashBoard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Courselist />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
