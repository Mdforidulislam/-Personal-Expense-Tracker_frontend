/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Expense } from "./Expence"

interface ExpenseChartProps {
  expenses: Expense[]
}

const categoryColors = {
  Food: "#10b981",
  Transport: "#3b82f6",
  Shopping: "#8b5cf6",
  Others: "#6b7280",
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  const chartData = useMemo(() => {
    const categoryTotals = expenses?.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
      },
      {} as Record<string, number>,
    )

    const total = Object?.values(categoryTotals)?.reduce((sum, amount) => sum + amount, 0)

    return Object?.entries(categoryTotals)?.map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: categoryColors[category as keyof typeof categoryColors],
    }))
  }, [expenses])

  if (chartData?.length === 0) return null

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data?.category}</p>
          <p className="text-sm text-gray-600">
            ${data?.amount.toFixed(2)} ({data?.percentage.toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Expenses by Category</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-700">Pie Chart</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {chartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value, entry) => (
                    <span style={{ color: entry?.color }}>
                      {value} (${entry?.payload?.value.toFixed(2)})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-700">Breakdown</h4>
          <div className="space-y-4">
            {chartData.map(({ category, amount, percentage, color }) => (
              <div key={category} className="flex items-center gap-4">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-gray-700 truncate">{category}</span>
                </div>

                <div className="flex-1 max-w-xs">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%`, backgroundColor: color }}
                    />
                  </div>
                </div>

                <div className="text-right min-w-0">
                  <div className="text-sm font-semibold text-gray-900">${amount.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}