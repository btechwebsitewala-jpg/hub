import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  TestTube2, 
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Book Test", path: "/admin/appointments", icon: TestTube2 },
  { title: "Inquiries", path: "/admin/inquiries", icon: FileText },
  { title: "Test Bookings", path: "/admin/bookings", icon: Calendar },
  { title: "Users", path: "/admin/users", icon: Users },
];

interface AdminSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <aside 
      className={cn(
        "bg-card border-r border-border h-full transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="font-bold text-lg">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">Manage your lab</p>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.title.toLowerCase();
          return (
            <button
              key={item.title}
              onClick={() => handleClick(item.title.toLowerCase())}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                "hover:bg-muted/50",
                isActive && "bg-primary/10 text-primary font-medium"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Diagnostics Hub
          </p>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;
