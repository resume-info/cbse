import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student, Subject } from '../models/Student';

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  const defaultSubjects: Subject[] = [
    // Core Subjects
    { 
      code: '184', 
      name: 'ENGLISH LNG & LIT.', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20 
    },
    { 
      code: '085', 
      name: 'HINDI COURSE-B', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20 
    },
    { 
      code: '241', 
      name: 'MATHEMATICS BASIC', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20 
    },
    { 
      code: '086', 
      name: 'SCIENCE', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20 
    },
    { 
      code: '087', 
      name: 'SOCIAL SCIENCE', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20 
    },
    { 
      code: '042', 
      name: 'PHYSICS', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 70, 
      maxPracticalMarks: 30
    },
    { 
      code: '043', 
      name: 'CHEMISTRY', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 70, 
      maxPracticalMarks: 30
    },
    { 
      code: '044', 
      name: 'BIOLOGY', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 70, 
      maxPracticalMarks: 30
    },
    { 
      code: '041', 
      name: 'MATHEMATICS', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20
    },
    { 
      code: '054', 
      name: 'BUSINESS STUDIES', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20
    },
    { 
      code: '055', 
      name: 'ACCOUNTANCY', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20
    },
    { 
      code: '030', 
      name: 'ECONOMICS', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20
    },
    // Additional Subjects
    { 
      code: '004', 
      name: 'PUNJABI', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20,
      isAdditional: true 
    },
    { 
      code: '165', 
      name: 'SANSKRIT', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 80, 
      maxPracticalMarks: 20,
      isAdditional: true 
    },
    { 
      code: '402', 
      name: 'INFORMATION TECHNOLOGY', 
      theoryMarks: 0, 
      practicalMarks: 0, 
      maxTheoryMarks: 50, 
      maxPracticalMarks: 50,
      isAdditional: true 
    }
  ];

  const [student, setStudent] = useState<Student>({
    name: '',
    fatherName: '',
    motherName: '',
    rollNumber: '',
    dateOfBirth: '',
    schoolName: '',
    subjects: defaultSubjects,
    year: `${currentYear}`,
    className: 'X'
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleTheoryMarksChange = (index: number, value: number) => {
    const updatedSubjects = [...student.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      theoryMarks: value
    };
    
    setStudent(prevStudent => ({
      ...prevStudent,
      subjects: updatedSubjects
    }));
  };

  const handlePracticalMarksChange = (index: number, value: number) => {
    const updatedSubjects = [...student.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      practicalMarks: value
    };
    
    setStudent(prevStudent => ({
      ...prevStudent,
      subjects: updatedSubjects
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    if (!student.name || !student.fatherName || !student.motherName || !student.rollNumber || !student.schoolName || !student.dateOfBirth) {
      alert('Please fill in all personal details');
      return;
    }
    
    // Check if marks are within valid range
    for (const subject of student.subjects) {
      if (subject.theoryMarks < 0 || subject.theoryMarks > subject.maxTheoryMarks) {
        alert(`Theory marks for ${subject.name} must be between 0 and ${subject.maxTheoryMarks}`);
        return;
      }
      if (subject.practicalMarks < 0 || subject.practicalMarks > subject.maxPracticalMarks) {
        alert(`Practical marks for ${subject.name} must be between 0 and ${subject.maxPracticalMarks}`);
        return;
      }
    }
    
    // Store student data in sessionStorage
    sessionStorage.setItem('studentData', JSON.stringify(student));
    
    // Navigate to result page
    navigate('/result');
  };

  return (
    <div className="form-container">
      <h3 className="text-center mb-4">CBSE Mark Sheet Entry Form</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4 fw-bold">Personal Information</div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="name">Candidate Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={student.name}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="rollNumber">Roll No</label>
              <input
                type="text"
                className="form-control"
                id="rollNumber"
                name="rollNumber"
                value={student.rollNumber}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="motherName">Mother's Name</label>
              <input
                type="text"
                className="form-control"
                id="motherName"
                name="motherName"
                value={student.motherName}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="fatherName">Father's Name</label>
              <input
                type="text"
                className="form-control"
                id="fatherName"
                name="fatherName"
                value={student.fatherName}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={student.dateOfBirth}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="schoolName">School's Name</label>
              <input
                type="text"
                className="form-control"
                id="schoolName"
                name="schoolName"
                value={student.schoolName}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mb-4 fw-bold mt-4">Subject Marks</div>
        
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>SUB CODE</th>
                <th>SUB NAME</th>
                <th>THEORY</th>
                <th>PRACTICAL/IA</th>
              </tr>
            </thead>
            <tbody>
              {student.subjects.slice(0, 12).map((subject, index) => (
                <tr key={index}>
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max={subject.maxTheoryMarks}
                      value={subject.theoryMarks}
                      onChange={(e) => handleTheoryMarksChange(index, parseInt(e.target.value) || 0)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max={subject.maxPracticalMarks}
                      value={subject.practicalMarks}
                      onChange={(e) => handlePracticalMarksChange(index, parseInt(e.target.value) || 0)}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mb-4 fw-bold mt-5">Additional Subjects (Optional)</div>
        
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>SUB CODE</th>
                <th>SUB NAME</th>
                <th>THEORY</th>
                <th>PRACTICAL</th>
              </tr>
            </thead>
            <tbody>
              {student.subjects.slice(12).map((subject, index) => (
                <tr key={`additional-${index}`}>
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max={subject.maxTheoryMarks}
                      value={subject.theoryMarks}
                      onChange={(e) => handleTheoryMarksChange(index + 12, parseInt(e.target.value) || 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max={subject.maxPracticalMarks}
                      value={subject.practicalMarks}
                      onChange={(e) => handlePracticalMarksChange(index + 12, parseInt(e.target.value) || 0)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Generate Result
          </button>
        </div>
      </form>
      
      <div className="disclaimer-notice">
        <h2>Disclaimer: This is a Replica Website</h2>
        <p>
          <strong>This is a 'FAKE' CBSE website created by Arnav Chauhan.</strong> 
          Not affiliated with CBSE. 
          <strong>Do not use for any official or illegal purposes!</strong>
        </p>
      </div>
      
      <div className="watermark">Made by Arnav Chauhan</div>
      <div className="watermark" style={{ bottom: '50%', right: '30%' }}>Made by Arnav Chauhan</div>
      <div className="watermark" style={{ top: '20%', left: '10%' }}>Made by Arnav Chauhan</div>
    </div>
  );
};

export default StudentForm; 