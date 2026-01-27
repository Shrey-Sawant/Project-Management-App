import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

/* -------------------- TYPES -------------------- */

export interface Project {
  _id: string
  name: string
  description?: string
  startDate?: string
  endDate?: string
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDO = "To DO",
  InProgress = "In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  id?: string
  username?: string
  email: string
  profilePictureUrl?: string
  cognitoId?: string
  teamId?: string
}

/* ---------- AUTH ---------- */

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

/* ---------- TASKS ---------- */

export interface Attachment {
  _id: string
  fileUrl: string
  fileName: string
  taskId: string
  uploadedByUserId: string
}

export interface Task {
  _id: string
  title: string
  description?: string
  status?: Status
  priority?: Priority
  tags?: string
  startDate?: string
  dueDate?: string
  points?: number
  projectId: string
  authorUserId?: string
  assignedUserId?: string

  author?: User
  assignee?: User
  comments?: Comment[]
  attachment?: Attachment[]
}

export interface SearchResults {
  tasks?: Task[]
  projects?: Project[]
  users?: User[]
}

export interface Team {
  teamId: string
  teamName: string
  productOwnerId?: string
  projectManagerId?: string
}

/* -------------------- API -------------------- */

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
    credentials: "include", // 🔐 needed for cookies later
  }),
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    /* ---------- AUTH ---------- */

    login: build.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
    }),

    signup: build.mutation<AuthResponse, SignupRequest>({
      query: (data) => ({
        url: "users/signup",
        method: "POST",
        body: data,
      }),
    }),

    /* ---------- PROJECTS ---------- */

    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects/create",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    /* ---------- TASKS ---------- */

    getTasks: build.query<Task[], { projectId: string }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "Tasks" as const, id: _id }))
          : [{ type: "Tasks" as const }],
    }),

    getTaskByUser: build.query<Task[], { userId: string }>({
      query: ({ userId }) => `tasks/user/${userId}`,
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "Tasks" as const, id: _id }))
          : [{ type: "Tasks" as const }],
    }),

    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks/create",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation<
      Task,
      { taskId: string; status: string }
    >({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    /* ---------- USERS / TEAMS ---------- */

    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),

    search: build.query<SearchResults, { query: string }>({
      query: ({ query }) => `search?query=${query}`,
    }),
  }),
})

/* -------------------- HOOKS -------------------- */

export const {
  useLoginMutation,
  useSignupMutation,

  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useGetTaskByUserQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useGetUsersQuery,
  useGetTeamsQuery,
  useSearchQuery,
} = api
