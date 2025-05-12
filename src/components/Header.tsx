import { useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const Header = ({ searchQuery = "", setSearchQuery = (_: string) => {} }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  // TODO: replace with real data source
  const notifications = [
    { id: 1, userName: "Alice Johnson" },
    { id: 2, userName: "Bob Lee" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold text-brand-purple cursor-pointer flex items-center"
          >
            <span className="text-brand-light-purple">Fender</span>
            <span>.io</span>
          </h1>
          
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search users, apps or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(prev => !prev)}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                <div className="p-2 border-b border-gray-100">
                  <p className="text-sm font-medium">Notifications</p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {n.userName} requested new access
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No new requests
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
