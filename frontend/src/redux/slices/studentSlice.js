import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enrolledCourses: [],
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        enrollCourse(state, action) {
            state.enrolledCourses.push(action.payload);
        },
        markCourseCompleted(state, action) {
            const course = state.enrolledCourses.find(course => course.id === action.payload);
            if (course) {
                course.completed = true;
            }
        },
    },
});

export const { enrollCourse, markCourseCompleted } = studentSlice.actions;
export default studentSlice.reducer;
