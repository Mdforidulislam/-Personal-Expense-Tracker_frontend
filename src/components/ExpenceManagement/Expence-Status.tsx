"use client"

import { Expense } from "./Expence"

interface ExpenseStatsProps {
  expenses: Expense[]
}

export default function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const thisMonth = new Date().toISOString().slice(0, 7)
  const thisMonthExpenses = expenses.filter((expense) => expense.date.startsWith(thisMonth))
  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="text-3xl">💰</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">${thisMonthTotal.toFixed(2)}</p>
          </div>
          <div className="text-3xl">📅</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
          </div>
          <div className="text-3xl">📊</div>
        </div>
      </div>
    </div>
  )
}