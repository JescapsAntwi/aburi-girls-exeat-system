
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockRequests } from "@/data/mockData";
import { ExeatRequest } from "@/types";
import { Eye, CheckCircle, XCircle, RotateCcw, Download, Filter, SlidersHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(mockRequests);
  const [activeTab, setActiveTab] = useState("all");

  const filterRequestsByStatus = (status: string) => {
    if (status === "all") {
      return mockRequests.filter(request => 
        request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.gradeClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return mockRequests.filter(request => 
        request.status === status && (
          request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.gradeClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredRequests(filterRequestsByStatus(activeTab));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setFilteredRequests(filterRequestsByStatus(value));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">⏳</div>;
      case "Approved":
        return <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-500"><CheckCircle className="w-4 h-4" /></div>;
      case "Rejected":
        return <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle className="w-4 h-4" /></div>;
      case "Returned":
        return <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><RotateCcw className="w-4 h-4" /></div>;
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

  const getPendingCount = () => mockRequests.filter(r => r.status === "Pending").length;
  const getApprovedCount = () => mockRequests.filter(r => r.status === "Approved").length;
  const getRejectedCount = () => mockRequests.filter(r => r.status === "Rejected").length;
  const getReturnedCount = () => mockRequests.filter(r => r.status === "Returned").length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Request History</h1>
        <div className="w-full md:w-auto flex gap-2">
          <Input 
            className="w-full md:w-64" 
            placeholder="Search requests..."
            value={searchTerm}
            onChange={handleSearch}
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden md:inline">Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Date Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="From" />
                    <Input placeholder="To" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Leave Type</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Grade/Class</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All grades</SelectItem>
                      <SelectItem value="grade-7">Grade 7</SelectItem>
                      <SelectItem value="grade-8">Grade 8</SelectItem>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All
            <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              {mockRequests.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="Pending">
            Pending
            <span className="ml-2 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">
              {getPendingCount()}
            </span>
          </TabsTrigger>
          <TabsTrigger value="Approved">
            Approved
            <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
              {getApprovedCount()}
            </span>
          </TabsTrigger>
          <TabsTrigger value="Rejected">
            Rejected
            <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">
              {getRejectedCount()}
            </span>
          </TabsTrigger>
          <TabsTrigger value="Returned">
            Returned
            <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              {getReturnedCount()}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <Card className="p-6">
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
                          {getStatusIcon(request.status)}
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
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing 5 of {filteredRequests.length} requests
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="Pending" className="space-y-6">
          <RequestTable requests={filteredRequests} />
        </TabsContent>
        
        <TabsContent value="Approved" className="space-y-6">
          <RequestTable requests={filteredRequests} />
        </TabsContent>
        
        <TabsContent value="Rejected" className="space-y-6">
          <RequestTable requests={filteredRequests} />
        </TabsContent>
        
        <TabsContent value="Returned" className="space-y-6">
          <RequestTable requests={filteredRequests} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const RequestTable = ({ requests }: { requests: ExeatRequest[] }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">⏳</div>;
      case "Approved":
        return <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-500"><CheckCircle className="w-4 h-4" /></div>;
      case "Rejected":
        return <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle className="w-4 h-4" /></div>;
      case "Returned":
        return <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><RotateCcw className="w-4 h-4" /></div>;
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
    <Card className="p-6">
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
            {requests.map((request) => (
              <tr key={request.requestId} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{request.requestId}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(request.status)}
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
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing {requests.length} of {requests.length} requests
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">
            1
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default History;
