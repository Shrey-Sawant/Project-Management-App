"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  useEffect(() => {
    const stored = localStorage.getItem("isSidebarCollapsed");
    if (stored !== null) {
      dispatch(setIsSidebarCollapsed(JSON.parse(stored)));
    }
  }, [dispatch]);

  const handleToggleCollapse = () => {
    const nextState = !isSidebarCollapsed;
    dispatch(setIsSidebarCollapsed(nextState));
    localStorage.setItem("isSidebarCollapsed", JSON.stringify(nextState));
  };

  const getProjectDotColor = (projectId: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    let hash = 0;
    for (let i = 0; i < projectId.length; i++) {
      hash = projectId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl 
  transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white left-0 top-0
  ${isSidebarCollapsed ? "w-0 -translate-x-full md:w-16 md:translate-x-0" : "w-64 translate-x-0"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Top LOGO */}
        <div className={`z-50 flex min-h-[56px] items-center justify-between bg-white pt-3 dark:bg-black border-b border-gray-100 dark:border-gray-900 ${isSidebarCollapsed ? "md:px-2 md:justify-center" : "px-6"}`}>
          <div className={`text-xl font-bold text-gray-800 dark:text-white ${isSidebarCollapsed ? "hidden md:hidden" : "block"}`}>
            EDLIST
          </div>
          <button
            className="p-2 text-gray-700 hover:text-gray-500 dark:text-white font-mono text-lg transition-colors"
            onClick={handleToggleCollapse}
          >
            {isSidebarCollapsed ? "»" : "«"}
          </button>
        </div>
        
        {/* TEAM */}
        <div className={`flex items-center border-b border-gray-200 py-4 dark:border-gray-800 ${isSidebarCollapsed ? "justify-center px-2" : "px-6 gap-4"}`}>
          <Image src="/logo.png" alt="logo" width={32} height={32} className="rounded" />
          {!isSidebarCollapsed && (
            <div>
              <h3 className="text-sm font-bold tracking-wide dark:text-gray-200">
                EDROH TEAM
              </h3>
              <div className="mt-0.5 flex items-start gap-1">
                <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                <p className="text-[10px] text-gray-500">Private</p>
              </div>
            </div>
          )}
        </div>

        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full mt-2">
          <SidebarLink icon={Home} label="Home" href="/" isCollapsed={isSidebarCollapsed} />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" isCollapsed={isSidebarCollapsed} />
          <SidebarLink icon={Search} label="Search" href="/search" isCollapsed={isSidebarCollapsed} />
          <SidebarLink icon={Settings} label="Settings" href="/settings" isCollapsed={isSidebarCollapsed} />
          <SidebarLink icon={User} label="Users" href="/users" isCollapsed={isSidebarCollapsed} />
          <SidebarLink icon={Users} label="Teams" href="/teams" isCollapsed={isSidebarCollapsed} />
        </nav>

        {/* PROJECTS SECTION */}
        {!isSidebarCollapsed && (
          <button
            onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between px-6 py-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs font-semibold uppercase tracking-wider"
          >
            <span>Projects</span>
            {showProjects ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
        
        {/* PROJECTS LIST */}
        {(showProjects || isSidebarCollapsed) && (
          projects && projects.length > 0 ? (
            projects.map((project) => (
              <SidebarLink
                key={project._id}
                icon={Briefcase}
                label={project.name}
                href={`/projects/${project._id}`}
                isCollapsed={isSidebarCollapsed}
                dotColor={getProjectDotColor(project._id)}
              />
            ))
          ) : (
            !isSidebarCollapsed && (
              <div className="flex flex-col items-center justify-center py-4 px-6 text-center text-gray-400 dark:text-neutral-500">
                <svg className="h-6 w-6 mb-1 stroke-current opacity-70" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span className="text-[10px] leading-tight">No projects yet · Create your first one</span>
              </div>
            )
          )
        )}

        {/* PRIORITY SECTION */}
        {!isSidebarCollapsed && (
          <button
            onClick={() => setShowPriority((prev) => !prev)}
            className="flex w-full items-center justify-between px-6 py-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs font-semibold uppercase tracking-wider"
          >
            <span>Priority</span>
            {showPriority ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
        {(showPriority || isSidebarCollapsed) && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink 
              icon={AlertOctagon} 
              label="Low" 
              href="/priority/low" 
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
              isCollapsed={isSidebarCollapsed}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
  dotColor?: string;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed, dotColor }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isActive ? "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-white" : "text-gray-600 dark:text-gray-300"
        } ${isCollapsed ? "justify-center px-2 py-3" : "justify-start px-6 py-2.5"} gap-3`}
      >
        {isActive && (
          <div className="absolute top-0 left-0 h-full w-[3px] bg-blue-600"></div>
        )}

        {dotColor ? (
          <div className={`h-2.5 w-2.5 rounded-full ${dotColor} flex-shrink-0 transition-transform ${isActive ? "scale-125" : ""}`} />
        ) : (
          <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-blue-600 dark:text-white" : "text-gray-500 dark:text-gray-400"}`} />
        )}
        
        {!isCollapsed && (
          <span className={`text-sm ${isActive ? "font-bold text-blue-600 dark:text-white" : "font-medium"} truncate`}>
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Sidebar;
