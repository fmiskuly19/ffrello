//TODO swtich to RTK Query at some point

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// // Define a service using a base URL and expected endpoints
// export const api = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7135" }),
//     endpoints: (builder) => ({
//         // getPokemonByName: builder.query<Pokemon, string>({
//         //     query: (name) => `pokemon/${name}`,
//         // }),
//         getWorkspaces: builder.query({
//             query: () => `workspaces`,
//         }),
//         getWorkspaceHighlights: builder.query({
//             query: () => `dummy`,
//         }),
//         getHomepageHighlights: builder.query({
//             query: () => `dummy`,
//         }),
//         getWorkspaceMembers: builder.query({
//             query: () => `dummy`,
//         }),
//         getWorkspaceSettings: builder.query({
//             query: () => `dummy`,
//         }),
//     }),
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetWorkspacesQuery, useGetWorkspaceHighlightsQuery, useGetWorkspaceMembersQuery, useGetWorkspaceSettingsQuery, useGetHomepageHighlightsQuery } = api