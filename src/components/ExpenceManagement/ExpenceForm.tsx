"use client"

import { useState, useEffect } from "react"
import { Expense } from "./Expence"

interface ExpenseFormProps {
  onSubmit: (data: Omit<Expense, "id" | "createdAt">) => void
  initialData?: Expense | null
  isEditing?: boolean
  onCancel?: () => void
}

export default function ExpenseForm({ onSubmit, initialData, isEditing, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food" as Expense["category"],
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount.toString(),
        category: initialData.category,
        date: initialData.date.split("T")[0],
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.amount || Number.parseFloat(formData.amount) <= 0) {
      alert("Please fill in all fields with valid values")
      return
    }

    // Convert date to ISO before submitting
    const isoDate = new Date(formData.date).toISOString()

    onSubmit({
      title: formData.title.trim(),
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      date: isoDate,
    })

    if (!isEditing) {
      setFormData({
        title: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    })
    onCancel?.()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {isEditing ? "Edit Expense" : "Add New Expense"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expense title"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Expense["category"] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditing ? "Update Expense" : "Add Expense"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
