import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import studentReducer from './slices/studentSlice';

export default configureStore({
    reducer: {
        courses: coursesReducer,
        students: studentReducer,
    },
});
