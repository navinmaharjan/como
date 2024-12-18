'use client'

import React from 'react'
import { Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"

const chartData = [
  { browser: "Men", visitors: 275, fill: "#074799" },
  { browser: "Women", visitors: 200, fill: "#009990" },
  { browser: "Kids", visitors: 187, fill: "#E1FFBB" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Men: {
    label: "Men",
    color: "hsl(var(--chart-1))",
  },
  Women: {
    label: "Women",
    color: "hsl(var(--chart-2))",
  },
  Kids: {
    label: "Kids",
    color: "hsl(var(--chart-3))",
  },
}

const CategoryPieChart = () => {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
    </div>
  )
}

export default CategoryPieChart