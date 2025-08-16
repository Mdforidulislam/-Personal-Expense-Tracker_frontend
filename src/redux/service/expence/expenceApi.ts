import baseApi from "@/redux/api/baseApi";

// ----- Expense Types -----
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others" | string;
  type: "INCOME" | "EXPENSE";
  method: string;
  userId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// API response for list or single expense
export interface ExpenseResponse<T = Expense | Expense[]> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

// ----- Expenses API -----
export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all expenses (paginated)
    getExpenses: builder.query<ExpenseResponse<Expense[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/expenses",
        method: "GET",
        params: { page, limit },
      }),
    }),

    // Get single expense by ID
    getExpenseById: builder.query<ExpenseResponse<Expense>, string>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "GET",
      }),
    }),

    // Create a new expense
    createExpense: builder.mutation<ExpenseResponse<Expense>, Partial<Expense>>({
      query: (body) => ({
        url: "/expenses",
        method: "POST",
        body,
      }),
    }),

    // Update an expense
    updateExpense: builder.mutation<ExpenseResponse<Expense>, { id: string; body: Partial<Expense> }>({
      query: ({ id, body }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Delete an expense
    deleteExpense: builder.mutation<ExpenseResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

// ----- Export Hooks -----
export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
