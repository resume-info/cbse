export interface Subject {
  code: string;
  name: string;
  theoryMarks: number;
  practicalMarks: number;
  maxTheoryMarks: number;
  maxPracticalMarks: number;
  isAdditional?: boolean;
}

export interface Student {
  name: string;
  fatherName: string;
  motherName: string;
  rollNumber: string;
  dateOfBirth: string;
  schoolName: string;
  subjects: Subject[];
  year: string;
  className: string;
}

export const hasMarks = (subject: Subject): boolean => {
  return subject.theoryMarks > 0 || subject.practicalMarks > 0;
};

export const calculateTotalMarks = (subject: Subject): number => {
  return subject.theoryMarks + subject.practicalMarks;
};

export const calculateTotal = (subjects: Subject[]): number => {
  return subjects.reduce((total, subject) => total + calculateTotalMarks(subject), 0);
};

export const calculateTotalMaxMarks = (subject: Subject): number => {
  return subject.maxTheoryMarks + subject.maxPracticalMarks;
};

export const calculatePercentage = (subjects: Subject[]): number => {
  const totalMarks = calculateTotal(subjects);
  const totalMaxMarks = subjects.reduce((total, subject) => total + calculateTotalMaxMarks(subject), 0);
  return (totalMarks / totalMaxMarks) * 100;
};

export const calculateGrade = (percentage: number): string => {
  if (percentage >= 91) return 'A1';
  if (percentage >= 81) return 'A2';
  if (percentage >= 71) return 'B1';
  if (percentage >= 61) return 'B2';
  if (percentage >= 51) return 'C1';
  if (percentage >= 41) return 'C2';
  if (percentage >= 33) return 'D';
  return 'E';
};

export const getResult = (subjects: Subject[]): string => {
  // Only consider non-additional subjects with marks for pass/fail
  const mainSubjects = subjects.filter(subject => !subject.isAdditional && hasMarks(subject));
  
  // If no subjects have marks, default to PASS
  if (mainSubjects.length === 0) return 'PASS';
  
  const anyFailed = mainSubjects.some(subject => 
    ((subject.theoryMarks + subject.practicalMarks) / (subject.maxTheoryMarks + subject.maxPracticalMarks)) * 100 < 33
  );
  return anyFailed ? 'FAIL' : 'PASS';
}; 