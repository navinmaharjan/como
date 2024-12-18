"use client"

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [

  { month: "January", sales: 540 },
  { month: "February", sales: 100 },
  { month: "March", sales: 215 },
  { month: "April", sales: 315 },
  { month: "May", sales: 340 },
  { month: "June", sales: 230 },
  { month: "July", sales: 560 },
  { month: "August", sales: 210 },
  { month: "September", sales: 200 },
  { month: "October", sales:  160},
  { month: "November", sales: 450},
  { month: "December", sales: 239 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#074799",
  }
}

const SalesChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
         <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default SalesChart