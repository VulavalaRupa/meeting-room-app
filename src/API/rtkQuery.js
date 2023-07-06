import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const meetingRoomApi = createApi({
    reducerPath: 'meetingRoomApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: (builder) => ({
        login: builder.query({
            query: (credentials) => `/users?email=${credentials.email}&password=${credentials.password}`
        }),
        signup: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
        }),
        rooms: builder.query({
            query: () => '/rooms'
        }),
        addrooms: builder.mutation({
            query: (room) => ({
                url: "/rooms",
                method: "POST",
                body: room,
            })
        }),
        editroom: builder.mutation({
            query: (room) => ({
                url: `/rooms/${room.id}`,
                method: 'PUT',
                body: room
            })
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: 'DELETE',
            })
        }),
        bookings: builder.query({
            query: () => "/bookings"
        }),
        addbooking: builder.mutation({
            query: (booking) => ({
                url: "/bookings",
                method: "POST",
                body: booking,
            })
        }),
        editbooking: builder.mutation({
            query: (booking) => ({
                url: `/rooms/${booking.id}`,
                method: 'PUT',
                body: booking
            })
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: 'DELETE',
            })
        }),
        getusers : builder.query({
            query: () => "/users"
        }),
        addusers : builder.mutation({
            query: (user) => ({
                url: "/users",
                method:"POST",
                body: user
            })
        }),
        edituser : builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            })
        }),
        getroombookings: builder.query ({
            query:() => "/userBookings"
        }),
        userbookings : builder.mutation({
            query: (roombooking) => ({
                url: `/userBookings`,
                method: 'POST',
                body: roombooking
            })
        }),
    })
})

export const { useLoginQuery, useSignupMutation, useRoomsQuery,
    useAddroomsMutation, useEditroomMutation, useDeleteRoomMutation,
    useBookingsQuery, useAddbookingMutation, useEditbookingMutation, useDeleteBookingMutation,
    useGetusersQuery, useAddusersMutation, useEdituserMutation, useDeleteUserMutation,
    useGetroombookingsQuery, useUserbookingsMutation} = meetingRoomApi;
