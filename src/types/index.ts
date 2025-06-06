
export type LeaveType = 'Medical' | 'Family' | 'Sports' | 'Academic' | 'Other';

export type ExeatStatus = 'Pending' | 'Approved' | 'Rejected' | 'Returned';

export interface StudentInfo {
  id: string;
  name: string;
  grade: string;
  class: string;
}

export interface ParentInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface ExeatRequest {
  requestId: string;
  studentId: string;
  studentName: string;
  gradeClass: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  reason: string;
  parentInfo: ParentInfo;
  supportingDocs?: string[];
  status: ExeatStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'admin' | 'parent' | 'teacher';
  email: string;
  avatar?: string;
}
