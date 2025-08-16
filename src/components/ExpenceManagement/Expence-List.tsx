"use client"

import { Expense } from "./Expence"

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
  filterCategory: string
  onFilterChange: (category: string) => void
  dateRange: { start: string; end: string }
  onDateRangeChange: (range: { start: string; end: string }) => void
}

const categoryColors = {
  Food: "bg-green-100 text-green-800",
  Transport: "bg-blue-100 text-blue-800",
  Shopping: "bg-purple-100 text-purple-800",
  Others: "bg-gray-100 text-gray-800",
}

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete,
  filterCategory,
  onFilterChange,
  dateRange,
  onDateRangeChange,
}: ExpenseListProps) {
  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense List</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="flex gap-2">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="date"
                id="start-date"
                value={dateRange.start}
                onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="date"
                id="end-date"
                value={dateRange.end}
                onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-5xl mb-4">💸</div>
            <p className="text-gray-500 text-lg">No expenses found</p>
            <p className="text-gray-400">Add your first expense to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{expense.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category]}`}>
                      {expense.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-gray-900">${expense.amount.toFixed(2)}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id, expense.title)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}