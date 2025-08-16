// redux/service/expenses/expensesApi.ts

import baseApi from "@/redux/api/baseApi";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "INCOME" | "EXPENSE";
  method: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseResponse {
  success: boolean;
  message: string;
  data: Expense | Expense[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all expenses
    getExpenses: builder.query<
      ExpenseResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/expenses`,
        method: "GET",
        params: { page, limit },
      }),
    }),

    // Get dashboard expenses
    getDashboardExpenses: builder.query<ExpenseResponse, void>({
      query: () => ({ url: "/expenses/dashboard", method: "GET" }),
    }),

    // Get single expense
    getExpenseById: builder.query<ExpenseResponse, string>({
      query: (id) => ({ url: `/expenses/${id}`, method: "POST" }),
    }),

    // Create a new expense
    createExpense: builder.mutation<ExpenseResponse, Partial<Expense>>({
      query: (body) => ({
        url: `/expenses`,
        method: "POST",
        body,
      }),
    }),

    // Update an expense
    updateExpense: builder.mutation<
      ExpenseResponse,
      { id: string; body: Partial<Expense> }
    >({
      query: ({ id, body }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Delete an expense
    deleteExpense: builder.mutation<ExpenseResponse, string>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetExpensesQuery,
  useGetDashboardExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
