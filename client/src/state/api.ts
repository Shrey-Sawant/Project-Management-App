import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}),
    reducerPath: "api",
    tagTypes:[],
    endpoints: (build) => ({}),
});

export const {} = api;