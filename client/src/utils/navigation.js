import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Library,
  CalendarDays,
  Bot,
  Bookmark,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const mainNavigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Subjects",
    path: "/subjects",
    icon: BookOpen,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Resources",
    path: "/resources",
    icon: Library,
  },
  {
    title: "Revision Planner",
    path: "/planner",
    icon: CalendarDays,
  },
  {
    title: "AI Assistant",
    path: "/assistant",
    icon: Bot,
  },
  
];

export const bottomNavigation = [
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: LogOut,
  },
];