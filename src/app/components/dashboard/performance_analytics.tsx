"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Home, Star, Calendar, AlertTriangle } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 18500, occupancy: 78, satisfaction: 4.6 },
  { month: "Feb", revenue: 21200, occupancy: 82, satisfaction: 4.7 },
  { month: "Mar", revenue: 24800, occupancy: 89, satisfaction: 4.8 },
  { month: "Apr", revenue: 28900, occupancy: 92, satisfaction: 4.9 },
  { month: "May", revenue: 32400, occupancy: 95, satisfaction: 4.8 },
  { month: "Jun", revenue: 35600, occupancy: 97, satisfaction: 4.9 },
  { month: "Jul", revenue: 38200, occupancy: 98, satisfaction: 4.7 },
  { month: "Aug", revenue: 36800, occupancy: 96, satisfaction: 4.8 },
  { month: "Sep", revenue: 33200, occupancy: 91, satisfaction: 4.9 },
  { month: "Oct", revenue: 29800, occupancy: 87, satisfaction: 4.8 },
  { month: "Nov", revenue: 26400, occupancy: 84, satisfaction: 4.7 },
  { month: "Dec", revenue: 24580, occupancy: 87, satisfaction: 4.8 },
]

const propertyPerformance = [
  { name: "Sunset Villa", revenue: 45200, occupancy: 95, satisfaction: 4.9, bookings: 48 },
  { name: "Ocean View Apt", revenue: 38900, occupancy: 92, satisfaction: 4.8, bookings: 52 },
  { name: "Mountain Cabin", revenue: 32600, occupancy: 88, satisfaction: 4.7, bookings: 41 },
  { name: "City Loft", revenue: 28400, occupancy: 85, satisfaction: 4.6, bookings: 38 },
  { name: "Beach House", revenue: 25800, occupancy: 82, satisfaction: 4.5, bookings: 35 },
]

const channelData = [
  { name: "Airbnb", value: 45, revenue: 156800, color: "#059669" },
  { name: "Booking.com", value: 32, revenue: 112400, color: "#10b981" },
  { name: "Direct", value: 23, revenue: 78600, color: "#d97706" },
]

const issuesData = [
  { issue: "WiFi Problems", frequency: 12, severity: "Medium", trend: "up" },
  { issue: "Cleanliness", frequency: 8, severity: "High", trend: "down" },
  { issue: "Check-in Issues", frequency: 15, severity: "Low", trend: "stable" },
  { issue: "Noise Complaints", frequency: 6, severity: "Medium", trend: "down" },
  { issue: "Amenity Issues", frequency: 9, severity: "Low", trend: "up" },
]

export function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState("12months")
  const [selectedProperty, setSelectedProperty] = useState("all")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-green-500" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Analytics Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="sunset-villa">Sunset Villa</SelectItem>
                <SelectItem value="ocean-view">Ocean View Apt</SelectItem>
                <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
                <SelectItem value="city-loft">City Loft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">$347,800</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.2%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Avg Occupancy</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">89.2%</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3.8%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Guest Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">4.78</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.12
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">214</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.5%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Revenue & Occupancy Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "revenue" ? formatCurrency(Number(value)) : `${value}%`,
                      name === "revenue" ? "Revenue" : "Occupancy",
                    ]}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="occupancy"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Channel */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Revenue by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Revenue */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-primary)"
                      fill="var(--color-primary)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Property Performance Comparison */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Property Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={propertyPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="revenue" fill="var(--color-primary)" name="Revenue ($)" />
                  <Bar yAxisId="right" dataKey="occupancy" fill="var(--color-chart-2)" name="Occupancy (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Property Performance Table */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Detailed Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-card-foreground">Property</th>
                      <th className="text-right py-2 text-card-foreground">Revenue</th>
                      <th className="text-right py-2 text-card-foreground">Occupancy</th>
                      <th className="text-right py-2 text-card-foreground">Rating</th>
                      <th className="text-right py-2 text-card-foreground">Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyPerformance.map((property, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-3 text-card-foreground font-medium">{property.name}</td>
                        <td className="py-3 text-right text-primary font-semibold">
                          {formatCurrency(property.revenue)}
                        </td>
                        <td className="py-3 text-right text-card-foreground">{property.occupancy}%</td>
                        <td className="py-3 text-right text-card-foreground flex items-center justify-end gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {property.satisfaction}
                        </td>
                        <td className="py-3 text-right text-card-foreground">{property.bookings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-6">
          {/* Issue Tracking */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Issue Tracking & Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issuesData.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-medium text-card-foreground">{issue.issue}</h4>
                        <p className="text-sm text-muted-foreground">Reported {issue.frequency} times</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getSeverityColor(issue.severity)} className="text-xs">
                        {issue.severity}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(issue.trend)}
                        <span className="text-xs text-muted-foreground capitalize">{issue.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guest Satisfaction Trend */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Guest Satisfaction Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[4.0, 5.0]} />
                  <Tooltip formatter={(value) => [Number(value).toFixed(1), "Rating"]} />
                  <Line type="monotone" dataKey="satisfaction" stroke="var(--color-chart-3)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
