import { currentUser } from "@/data/mockData";
import { Bell, CalendarClock, History, LayoutDashboard, PlusCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4">
            <img 
              src="/aburi-logo.png" 
              alt="Aburi Girls Secondary School Logo" 
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-primary hidden md:inline">Exeat System</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`px-3 py-2 rounded-md flex items-center gap-2 ${isActive('/') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/new-request" className={`px-3 py-2 rounded-md flex items-center gap-2 ${isActive('/new-request') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
            <PlusCircle className="w-5 h-5" />
            <span>New Request</span>
          </Link>
          <Link to="/history" className={`px-3 py-2 rounded-md flex items-center gap-2 ${isActive('/history') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
            <History className="w-5 h-5" />
            <span>History</span>
          </Link>
          <Link to="/notifications" className={`px-3 py-2 rounded-md flex items-center gap-2 ${isActive('/notifications') ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 rounded-full border hover:shadow-md focus:shadow-md">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt={currentUser.name} />
                  <AvatarFallback className="bg-primary text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
