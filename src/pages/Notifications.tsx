
import { Card } from "@/components/ui/card";
import { notifications } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, FileText, Clock, ArrowRight } from "lucide-react";

const Notifications = () => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new-request":
        return <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><FileText className="w-5 h-5" /></div>;
      case "approved":
        return <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500"><CheckCircle className="w-5 h-5" /></div>;
      case "rejected":
        return <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle className="w-5 h-5" /></div>;
      case "pending-parent":
        return <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500"><Clock className="w-5 h-5" /></div>;
      default:
        return null;
    }
  };

  const getNotificationClass = (type: string) => {
    switch (type) {
      case "new-request":
        return "border-l-4 border-blue-500";
      case "approved":
        return "border-l-4 border-green-500";
      case "rejected":
        return "border-l-4 border-red-500";
      case "pending-parent":
        return "border-l-4 border-yellow-500";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Notifications</h1>
        <div className="flex gap-2">
          <Button variant="outline">Mark all as read</Button>
          <Button variant="outline" className="text-red-500 hover:text-red-700 hover:border-red-300">Clear all</Button>
        </div>
      </div>
      
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Today</h2>
          
          {notifications.filter((_, index) => index < 2).map((notification, index) => (
            <div 
              key={index} 
              className={`p-4 bg-white rounded-lg shadow-sm ${getNotificationClass(notification.type)}`}
            >
              <div className="flex gap-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <h2 className="text-lg font-semibold mt-8">Yesterday</h2>
          
          {notifications.filter((_, index) => index >= 2).map((notification, index) => (
            <div 
              key={index} 
              className={`p-4 bg-white rounded-lg shadow-sm ${getNotificationClass(notification.type)}`}
            >
              <div className="flex gap-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="gap-2">
              View More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Notifications;
