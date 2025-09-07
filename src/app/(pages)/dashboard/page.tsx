'use client';
import { DashboardHeader } from "@/app/components/dashboard/header"
import { DashboardSidebar } from "@/app/components/dashboard/sidebar"
import { OverviewCenter } from "@/app/components/dashboard/overview_center";
import { PerformanceAnalytics } from "@/app/components/dashboard/performance_analytics";
import { useState } from "react"
import { PropertyPortfolio } from "@/app/components/dashboard/portfolio";
import { ReviewManagement } from "@/app/components/dashboard/review_management";


const ManagerDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewCenter />
      case "portfolio":
        return <PropertyPortfolio />
      case "analytics":
        return <PerformanceAnalytics />
      case "reviews":
        return <ReviewManagement />
      default:
        return <OverviewCenter />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title={activeSection} />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  ) 
};

export default ManagerDashboard;    