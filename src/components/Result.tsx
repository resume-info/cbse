import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student, calculateTotalMarks, calculateGrade, getResult, hasMarks } from '../models/Student';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get student data from sessionStorage
    const storedData = sessionStorage.getItem('studentData');
    
    if (storedData) {
      setStudent(JSON.parse(storedData));
    }
    
    setLoading(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!student) {
    return (
      <div className="text-center mt-5">
        <h3>No student data found.</h3>
        <button className="btn btn-primary mt-3" onClick={handleBack}>
          Go Back to Form
        </button>
      </div>
    );
  }

  const result = getResult(student.subjects);
  
  // Filter all subjects that have marks
  const mainSubjectsWithMarks = student.subjects
    .filter(subject => !subject.isAdditional && hasMarks(subject));
  
  const additionalSubjectsWithMarks = student.subjects
    .filter(subject => subject.isAdditional && hasMarks(subject));

  return (
    <div className="result-container">
      <div className="print-link">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={(e) => { e.preventDefault(); handlePrint(); }}>Print this page</a>
      </div>
      
      <div className="center-info">
        Brought to you by National Informatics Centre
      </div>

      <div className="result-title">CENTRAL BOARD OF SECONDARY EDUCATION</div>
      <div className="examination-title">Secondary School Examination (Class X) {student.year}</div>

      <div>
        <div className="student-info">
          <div className="info-label">Roll No:</div>
          <div>{student.rollNumber}</div>
        </div>
        <div className="student-info">
          <div className="info-label">Candidate Name:</div>
          <div>{student.name}</div>
        </div>
        <div className="student-info">
          <div className="info-label">Mother's Name:</div>
          <div>{student.motherName}</div>
        </div>
        <div className="student-info">
          <div className="info-label">Father's Name:</div>
          <div>{student.fatherName}</div>
        </div>
        <div className="student-info">
          <div className="info-label">Date of Birth:</div>
          <div>{new Date(student.dateOfBirth).toLocaleDateString('en-IN')}</div>
        </div>
        <div className="student-info">
          <div className="info-label">School's Name:</div>
          <div>{student.schoolName}</div>
        </div>
      </div>

      <table className="marks-table">
        <thead>
          <tr>
            <th>SUB CODE</th>
            <th>SUB NAME</th>
            <th>THEORY</th>
            <th>I.A/ PRACTICAL</th>
            <th>TOTAL</th>
            <th>POSITIONAL GRADE</th>
          </tr>
        </thead>
        <tbody>
          {mainSubjectsWithMarks.map((subject, index) => (
            <tr key={index}>
              <td>{subject.code}</td>
              <td>{subject.name}</td>
              <td>{subject.theoryMarks.toString().padStart(3, '0')}</td>
              <td>{subject.practicalMarks.toString().padStart(3, '0')}</td>
              <td>{calculateTotalMarks(subject).toString().padStart(3, '0')}</td>
              <td>{calculateGrade((calculateTotalMarks(subject) / (subject.maxTheoryMarks + subject.maxPracticalMarks)) * 100)}</td>
            </tr>
          ))}
          
          {additionalSubjectsWithMarks.length > 0 && (
            <>
              <tr>
                <td colSpan={6} className="additional-subject">ADDITIONAL SUBJECT</td>
              </tr>
              {additionalSubjectsWithMarks.map((subject, index) => (
                <tr key={`additional-${index}`}>
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>{subject.theoryMarks.toString().padStart(3, '0')}</td>
                  <td>{subject.practicalMarks.toString().padStart(3, '0')}</td>
                  <td>{calculateTotalMarks(subject).toString().padStart(3, '0')}</td>
                  <td>{calculateGrade((calculateTotalMarks(subject) / (subject.maxTheoryMarks + subject.maxPracticalMarks)) * 100)}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      
      <table className="marks-table" style={{ marginTop: '0' }}>
        <tbody>
          <tr>
            <td colSpan={6} className="result-row">Result : {result}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 text-center d-print-none">
        <button className="btn btn-secondary" onClick={handleBack}>
          Back to Form
        </button>
      </div>

      {/* Print-only watermark - will only show when printed */}
      <div className="print-watermark">
        <div className="print-watermark-text">FAKE CBSE WEBSITE</div>
        <div className="print-watermark-subtext">Made by Arnav Chauhan</div>
        <div className="print-watermark-subtext">NOT OFFICIAL DOCUMENT</div>
      </div>
    </div>
  );
};

export default Result; 