
import { ExeatRequest, LeaveType, StudentInfo, User } from "@/types";

export const currentUser: User = {
  id: "admin-001",
  name: "Emily Johnson",
  role: "admin",
  email: "emily.johnson@aburigirls.edu.gh",
  avatar: "/avatar.png"
};

export const leaveTypes: LeaveType[] = [
  "Medical",
  "Family",
  "Sports",
  "Academic",
  "Other"
];

export const grades = [
  "Grade 7-A", "Grade 7-B", "Grade 7-C", 
  "Grade 8-A", "Grade 8-B", "Grade 8-C",
  "Grade 9-A", "Grade 9-B", "Grade 9-C", "Grade 9-D",
  "Grade 10-A", "Grade 10-B", "Grade 10-C",
  "Grade 11-A", "Grade 11-B", "Grade 11-C",
  "Grade 12-A", "Grade 12-B"
];

export const mockRequests: ExeatRequest[] = [
  {
    requestId: "#EX-2025041",
    studentId: "ST-20250415",
    studentName: "Olivia Parker",
    gradeClass: "Grade 11-A",
    leaveType: "Medical",
    fromDate: "2025-04-15",
    toDate: "2025-04-18",
    reason: "Doctor's appointment and follow-up tests at Korle Bu Teaching Hospital",
    parentInfo: {
      name: "Robert Parker",
      phone: "+233 55 123 4567",
      email: "robert.parker@gmail.com"
    },
    status: "Pending",
    createdAt: "2025-04-14T10:30:00Z",
    updatedAt: "2025-04-14T10:30:00Z"
  },
  {
    requestId: "#EX-2025040",
    studentId: "ST-20250329",
    studentName: "Benjamin Wilson",
    gradeClass: "Grade 10-C",
    leaveType: "Sports",
    fromDate: "2025-04-20",
    toDate: "2025-04-22",
    reason: "Participating in the National Athletics Championship in Accra",
    parentInfo: {
      name: "Sarah Wilson",
      phone: "+233 24 987 6543",
      email: "sarah.wilson@yahoo.com"
    },
    status: "Approved",
    createdAt: "2025-04-13T14:20:00Z",
    updatedAt: "2025-04-14T09:15:00Z"
  },
  {
    requestId: "#EX-2025039",
    studentId: "ST-20250231",
    studentName: "Sophia Martinez",
    gradeClass: "Grade 12-B",
    leaveType: "Family",
    fromDate: "2025-04-10",
    toDate: "2025-04-14",
    reason: "Sister's wedding ceremony in Kumasi",
    parentInfo: {
      name: "Carlos Martinez",
      phone: "+233 50 456 7890",
      email: "carlos.martinez@outlook.com"
    },
    status: "Rejected",
    createdAt: "2025-04-08T08:45:00Z",
    updatedAt: "2025-04-09T11:20:00Z"
  },
  {
    requestId: "#EX-2025038",
    studentId: "ST-20250187",
    studentName: "Ethan Thompson",
    gradeClass: "Grade 9-D",
    leaveType: "Medical",
    fromDate: "2025-04-08",
    toDate: "2025-04-09",
    reason: "Dental surgery and recovery",
    parentInfo: {
      name: "Lisa Thompson",
      phone: "+233 27 111 2222",
      email: "lisa.thompson@gmail.com"
    },
    status: "Returned",
    createdAt: "2025-04-06T16:10:00Z",
    updatedAt: "2025-04-09T18:00:00Z"
  },
  {
    requestId: "#EX-2025037",
    studentId: "ST-20250143",
    studentName: "Isabella Roberts",
    gradeClass: "Grade 11-B",
    leaveType: "Family",
    fromDate: "2025-04-05",
    toDate: "2025-04-07",
    reason: "Family emergency - grandmother hospitalized",
    parentInfo: {
      name: "Daniel Roberts",
      phone: "+233 26 333 4444",
      email: "daniel.roberts@hotmail.com"
    },
    status: "Approved",
    createdAt: "2025-04-04T12:30:00Z",
    updatedAt: "2025-04-04T15:45:00Z"
  }
];

export const upcomingReturns = [
  {
    studentName: "Benjamin Wilson",
    returnDate: "Tomorrow",
    leaveInfo: "Sports leave: Apr 20 - Apr 22, 2025"
  },
  {
    studentName: "Isabella Roberts",
    returnDate: "3 days",
    leaveInfo: "Family leave: Apr 5 - Apr 23, 2025"
  },
  {
    studentName: "Noah Anderson",
    returnDate: "5 days",
    leaveInfo: "Medical leave: Apr 12 - Apr 25, 2025"
  }
];

export const statistics = {
  totalStudents: 1987,
  totalRequests: 1248,
  pendingRequests: 12,
  approvedRequests: 45,
  rejectedRequests: 8,
  returnedRequests: 23,
  thisWeek: 87,
  thisMonth: 342,
  approvalRate: "78%",
  leaveTypes: {
    Medical: "45%",
    Family: "30%",
    Sports: "15%",
    Other: "10%"
  }
};

export const notifications = [
  {
    id: 1,
    type: "new-request",
    message: "Olivia Parker has submitted a new leave request.",
    time: "2 minutes ago"
  },
  {
    id: 2,
    type: "approved",
    message: "Benjamin Wilson's sports leave has been approved.",
    time: "1 hour ago"
  },
  {
    id: 3,
    type: "rejected",
    message: "Sophia Martinez's family leave has been rejected.",
    time: "3 hours ago"
  },
  {
    id: 4,
    type: "pending-parent",
    message: "Ethan Thompson's request is awaiting parent approval.",
    time: "5 hours ago"
  }
];

export const chartData = [
  { month: "Nov", Approved: 28, Rejected: 38, Pending: 52 },
  { month: "Dec", Approved: 31, Rejected: 41, Pending: 51 },
  { month: "Jan", Approved: 35, Rejected: 45, Pending: 62 },
  { month: "Feb", Approved: 38, Rejected: 48, Pending: 61 },
  { month: "Mar", Approved: 40, Rejected: 52, Pending: 65 },
  { month: "Apr", Approved: 45, Rejected: 51, Pending: 63 }
];
