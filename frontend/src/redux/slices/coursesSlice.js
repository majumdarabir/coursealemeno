import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    courses: [],
    enrolledCourses: [],
    status: 'idle',
    error: null,
};

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const response = await axios.get('http://localhost:5000/courses');
    return response.data;
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        enrollCourse: (state, action) => {
            console.log('Enrolling course:', action.payload);
            state.enrolledCourses.push(action.payload);
        },
        markCourseCompleted: (state, action) => {
            const courseIndex = state.enrolledCourses.findIndex(course => course.id === action.payload);
            if (courseIndex !== -1) {
                state.enrolledCourses[courseIndex] = {
                    ...state.enrolledCourses[courseIndex],
                    completed: true,
                };
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCourses.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { enrollCourse, markCourseCompleted } = coursesSlice.actions;

export default coursesSlice.reducer;
