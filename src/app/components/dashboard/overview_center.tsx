import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Home, Star, Users } from "lucide-react"

export function OverviewCenter() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      period: "This month",
    },
    {
      title: "Occupancy Rate",
      value: "87%",
      change: "+5.2%",
      trend: "up",
      icon: Home,
      period: "Current month",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.1",
      trend: "up",
      icon: Star,
      period: "Last 30 days",
    },
    {
      title: "Active Bookings",
      value: "23",
      change: "-2",
      trend: "down",
      icon: Users,
      period: "Current",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const isPositive = metric.trend === "up"

          return (
            <Card key={metric.title} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
                    {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{metric.period}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New booking", property: "Sunset Villa", time: "2 hours ago" },
                { action: "Review received", property: "Ocean View Apt", time: "4 hours ago" },
                { action: "Check-out completed", property: "Mountain Cabin", time: "6 hours ago" },
                { action: "Payment received", property: "City Loft", time: "1 day ago" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.property}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Top Performing Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sunset Villa", revenue: "$3,240", occupancy: "95%" },
                { name: "Ocean View Apt", revenue: "$2,890", occupancy: "92%" },
                { name: "Mountain Cabin", revenue: "$2,650", occupancy: "88%" },
                { name: "City Loft", revenue: "$2,420", occupancy: "85%" },
              ].map((property, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{property.name}</p>
                    <p className="text-xs text-muted-foreground">Occupancy: {property.occupancy}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{property.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
