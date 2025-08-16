"use client";

import { useState } from "react";
import ExpenseForm from "./ExpenceForm";
import ExpenseStats from "./Expence-Status";
import ExpenseChart from "./Expence-Chart";
import ExpenseList from "./Expence-List";

import {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} from "@/redux/service/expence/expenceApi";
import { useGetProfileQueryQuery } from "@/redux/service/auth/authApi";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: string;
  createdAt: string;
}

export default function ExpenseTracker() {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // RTK Query hooks
  const { data: expensesData, isLoading } = useGetExpensesQuery({});
  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const { data: userData } = useGetProfileQueryQuery({});

  console.log(userData);

  const expenses = expensesData?.data || [];

  // Add new expense
  const addExpense = async (expenseData: Omit<Expense, "id" | "createdAt">) => {
    try {
      await createExpense({
        ...expenseData,
        date: new Date(expenseData.date).toISOString(), // convert to ISO
      }).unwrap();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Update existing expense
  const handleUpdateExpense = async (
    id: string,
    expenseData: Omit<Expense, "id" | "createdAt">
  ) => {
    try {
      await updateExpense({
        id,
        body: {
          ...expenseData,
          date: new Date(expenseData.date).toISOString(),
        }, // convert to ISO
      }).unwrap();
      setEditingExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id).unwrap();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Filter expenses by category and date
  const filteredExpenses = expenses?.filter((expense) => {
    const categoryMatch =
      filterCategory === "all" || expense.category === filterCategory;
    const dateMatch =
      (!dateRange.start ||
        expense.date >= new Date(dateRange.start).toISOString()) &&
      (!dateRange.end || expense.date <= new Date(dateRange.end).toISOString());
    return categoryMatch && dateMatch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Expense Tracker
            </h1>
            <p className="text-gray-600">Track your expenses efficiently</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <ExpenseForm
              onSubmit={
                editingExpense
                  ? (data) => handleUpdateExpense(editingExpense.id, data)
                  : addExpense
              }
              initialData={editingExpense}
              isEditing={!!editingExpense}
              onCancel={() => setEditingExpense(null)}
            />
          </div>

          {/* Right Column - Stats and List */}
          <div className="lg:col-span-2 space-y-6">
            <ExpenseStats expenses={filteredExpenses} />

            {expenses?.length > 0 && <ExpenseChart expenses={expenses} />}

            <ExpenseList
              expenses={filteredExpenses}
              onEdit={setEditingExpense}
              onDelete={handleDeleteExpense}
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
