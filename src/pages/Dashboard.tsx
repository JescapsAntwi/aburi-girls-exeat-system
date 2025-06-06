
import { Card } from "@/components/ui/card";
import { mockRequests, statistics, chartData, upcomingReturns } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Eye, CheckCircle, XCircle, ArrowUpRight, RotateCcw, Calendar } from "lucide-react";
import { ExeatRequest } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [filteredRequests, setFilteredRequests] = useState<ExeatRequest[]>(mockRequests);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRequests(mockRequests);
    } else {
      const filtered = mockRequests.filter(
        (request) =>
          request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.gradeClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRequests(filtered);
    }
  }, [searchQuery]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">⏳</div>;
      case "Approved":
        return <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500"><CheckCircle className="w-4 h-4" /></div>;
      case "Rejected":
        return <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle className="w-4 h-4" /></div>;
      case "Returned":
        return <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><RotateCcw className="w-4 h-4" /></div>;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Approved":
        return "status-approved";
      case "Rejected":
        return "status-rejected";
      case "Returned":
        return "status-returned";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <div className="w-full md:w-auto flex gap-2">
          <Input 
            className="w-full md:w-64" 
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/new-request">
              <span className="hidden md:inline mr-2">New Request</span>
              <PlusIcon />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatusCard 
          title="Pending Requests" 
          count={statistics.pendingRequests} 
          change={`${statistics.pendingRequests === 12 ? '4%' : '0%'} from last week`} 
          icon={<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">⏳</div>}
          trendUp={true}
        />
        <StatusCard 
          title="Approved Requests" 
          count={statistics.approvedRequests} 
          change={`${statistics.approvedRequests === 45 ? '12%' : '0%'} from last week`} 
          icon={<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500"><CheckCircle className="w-6 h-6" /></div>}
          trendUp={true}
        />
        <StatusCard 
          title="Rejected Requests" 
          count={statistics.rejectedRequests} 
          change={`${statistics.rejectedRequests === 8 ? '2%' : '0%'} from last week`} 
          icon={<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle className="w-6 h-6" /></div>}
          trendUp={false}
        />
        <StatusCard 
          title="Total Students" 
          count={statistics.totalStudents} 
          change={`${statistics.totalStudents === 1987 ? '3%' : '0%'} from last month`} 
          icon={<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><UsersIcon /></div>}
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Requests</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCcwIcon className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">REQUEST ID</th>
                  <th className="text-left py-3 px-4 font-medium">STUDENT</th>
                  <th className="text-left py-3 px-4 font-medium">LEAVE TYPE</th>
                  <th className="text-left py-3 px-4 font-medium">DATE RANGE</th>
                  <th className="text-left py-3 px-4 font-medium">STATUS</th>
                  <th className="text-left py-3 px-4 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.requestId} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{request.requestId}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {request.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{request.studentName}</div>
                          <div className="text-xs text-gray-500">{request.gradeClass}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{request.leaveType}</td>
                    <td className="py-3 px-4">
                      {formatDate(request.fromDate)} - {formatDate(request.toDate)}
                    </td>
                    <td className="py-3 px-4">
                      <div className={getStatusClass(request.status)}>
                        {request.status}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Monthly Requests</h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Approved" 
                  stroke="#4CAF50" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Rejected" 
                  stroke="#F44336" 
                />
                <Line 
                  type="monotone" 
                  dataKey="Pending" 
                  stroke="#FFEB3B" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Statistics</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Total Requests</div>
              <div className="text-2xl font-bold">{statistics.totalRequests}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">This Week</div>
              <div className="text-2xl font-bold">{statistics.thisWeek}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">This Month</div>
              <div className="text-2xl font-bold">{statistics.thisMonth}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Approval Rate</div>
              <div className="text-2xl font-bold">{statistics.approvalRate}</div>
            </div>
            <div className="sm:col-span-2 bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-2">Leave Types</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-sm">Medical: {statistics.leaveTypes.Medical}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="text-sm">Family: {statistics.leaveTypes.Family}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="text-sm">Sports: {statistics.leaveTypes.Sports}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <div className="text-sm">Other: {statistics.leaveTypes.Other}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Upcoming Returns</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View all returns
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingReturns.map((item, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.studentName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">{item.studentName}</div>
                    <div className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {item.returnDate}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {item.leaveInfo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatusCard = ({ title, count, change, icon, trendUp = true }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{count}</h3>
          <div className={`flex items-center text-xs ${trendUp ? 'text-green-600' : 'text-red-600'} mt-2`}>
            {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            <span>{change}</span>
          </div>
        </div>
        {icon}
      </div>
    </Card>
  );
};

// Fixed custom icons with TypeScript props
interface IconProps {
  className?: string;
}

const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "h-5 w-5"}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const UsersIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "w-6 h-6"}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const RefreshCcwIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "h-4 w-4"}>
    <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.38-2.62 9 9 0 0 1-2.62-6.38 9 9 0 0 1 9-9 9 9 0 0 1 7.6 4.15"></path>
    <path d="m22 12-3-3-3 3"></path>
    <path d="M3 12a9 9 0 0 0 9 9 9 9 0 0 0 6.38-2.62 9 9 0 0 0 2.62-6.38 9 9 0 0 0-9-9 9 9 0 0 0-7.6 4.15"></path>
    <path d="m2 12 3-3 3 3"></path>
  </svg>
);

const DownloadIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "h-4 w-4"}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const ArrowDownRight: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "h-3 w-3"}>
    <line x1="7" y1="7" x2="17" y2="17"></line>
    <polyline points="17 7 17 17 7 17"></polyline>
  </svg>
);

export default Dashboard;
