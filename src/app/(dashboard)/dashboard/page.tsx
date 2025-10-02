// app/dashboard/page.tsx
"use client";

import {
  Activity,
  ArrowRight,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Home,
  Layers,
  MapPin,
  PlusCircle,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Cities",
    value: "12",
    icon: MapPin,
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    trend: "+2",
    description: "Active locations",
  },
  {
    title: "Total Projects",
    value: "34",
    icon: Building,
    color: "bg-gradient-to-br from-blue-500 to-cyan-600",
    trend: "+5",
    description: "Ongoing developments",
  },
  {
    title: "Available Flats",
    value: "120",
    icon: Layers,
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    trend: "+12",
    description: "Ready for sale",
  },
  {
    title: "Active Users",
    value: "542",
    icon: Users,
    color: "bg-gradient-to-br from-purple-500 to-indigo-600",
    trend: "+23",
    description: "Registered clients",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "city_added",
    title: "New City Added",
    description: "Sylhet metropolitan area",
    time: "2 hours ago",
    icon: MapPin,
    color: "text-green-600 bg-green-100",
  },
  {
    id: 2,
    type: "project_launch",
    title: "Project Launched",
    description: "Green Valley Housing Phase 2",
    time: "5 hours ago",
    icon: Building,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 3,
    type: "flat_booked",
    title: "Premium Flat Booked",
    description: "3BHK in Dhaka Heights Tower",
    time: "1 day ago",
    icon: Home,
    color: "text-amber-600 bg-amber-100",
  },
  {
    id: 4,
    type: "user_registered",
    title: "New Client Registered",
    description: "Mr. John Doe - VIP Client",
    time: "2 days ago",
    icon: Users,
    color: "text-purple-600 bg-purple-100",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Board Meeting",
    date: "October 2, 2025",
    time: "10:00 AM",
    type: "meeting",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Project Launch Event",
    date: "October 10, 2025",
    time: "3:00 PM",
    type: "event",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Annual Flat Expo",
    date: "November 1, 2025",
    time: "9:00 AM",
    type: "expo",
    status: "upcoming",
  },
];

const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-8">
      {/* Enhanced Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Here&#39;s what&apos;s happening today.
              <span className="text-green-600 font-semibold">
                {" "}
                3 new updates
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>

        {/* Date and Quick Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>1,234 views today</span>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(
          ({ title, value, icon: Icon, color, trend, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} text-white shadow-md`}>
                  <Icon size={24} />
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                  <TrendingUp size={14} />
                  <span>{trend}</span>
                </div>
              </div>

              <div className="mb-2">
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className="text-gray-500 text-sm mt-1">{description}</p>
              </div>

              <p className="text-gray-600 font-medium text-sm">{title}</p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div
                  className={`h-1.5 rounded-full ${
                    title === "Total Cities"
                      ? "bg-green-500 w-3/4"
                      : title === "Total Projects"
                      ? "bg-blue-500 w-2/3"
                      : title === "Available Flats"
                      ? "bg-amber-500 w-1/2"
                      : "bg-purple-500 w-4/5"
                  }`}
                ></div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="text-green-700" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Activity
                </h2>
                <p className="text-gray-500 text-sm">
                  Latest system updates and actions
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-green-700 hover:text-green-800 text-sm font-medium">
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all group"
              >
                <div className={`p-3 rounded-lg ${activity.color}`}>
                  <activity.icon size={20} />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activity.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={14} />
                  <span>{activity.time}</span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <PlusCircle className="text-green-700" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
              <p className="text-gray-500 text-sm">Manage your properties</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg group">
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span className="font-semibold">Add New City</span>
              </div>
              <PlusCircle
                size={20}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg group">
              <div className="flex items-center gap-3">
                <Building size={20} />
                <span className="font-semibold">Add New Project</span>
              </div>
              <PlusCircle
                size={20}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg group">
              <div className="flex items-center gap-3">
                <Home size={20} />
                <span className="font-semibold">Add New Flat</span>
              </div>
              <PlusCircle
                size={20}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-800">98%</p>
                <p className="text-gray-600 text-xs">Success Rate</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-800">24h</p>
                <p className="text-gray-600 text-xs">Avg. Response</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Upcoming Events */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="text-green-700" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Upcoming Events
              </h2>
              <p className="text-gray-500 text-sm">
                Schedule and important dates
              </p>
            </div>
          </div>
          <button className="text-green-700 hover:text-green-800 text-sm font-medium">
            View Calendar
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group p-5 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm font-medium">
                    Upcoming
                  </span>
                </div>
                <CheckCircle
                  size={18}
                  className="text-gray-300 group-hover:text-green-400 transition-colors"
                />
              </div>

              <h3 className="font-bold text-gray-800 text-lg mb-2">
                {event.title}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={14} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={14} />
                  <span>{event.time}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Reminder</span>
                  <span className="text-green-700 font-medium">Set Alert</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
