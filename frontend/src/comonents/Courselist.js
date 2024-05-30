import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../redux/slices/coursesSlice';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Text, UnorderedList, ListItem, Link as ChakraLink, Image } from '@chakra-ui/react';


const CourseList = () => {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses.courses);
    const status = useSelector(state => state.courses.status);
    const error = useSelector(state => state.courses.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    return (
        <Box maxW="600px" mx="auto" p="4" bg="#f8f8f8" borderWidth="1px" borderRadius="20px" mt="4">
            <Text fontSize="2xl" fontWeight="bold" mb="4">Courses</Text>
            {status === 'loading' && <CircularProgress />}
            {status === 'failed' && <Text color="red.500">{error}</Text>}
            {status === 'succeeded' && (
                <UnorderedList spacing="4">
                    {courses.map((course, index) => (
                        <ListItem
                            key={course.id}
                            // bg={hover ? "gray.700" : "gray.100"}

                            rounded="md"
                            p="4"
                            display="flex"
                            alignItems="center"
                            _hover={{ bg: "gray.700" }}
                        >

                            <Box flex="1" pr="4">
                                <Text fontSize="md" color="gray.500" fontWeight="bold">
                                    {index + 1}. {course.name}
                                </Text>
                                <Text fontSize="md" color="gray.500">
                                    {course.instructor}
                                </Text>
                                <button><Link to={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>View Details</Link></button>
                            </Box>
                        </ListItem>
                    ))}
                </UnorderedList>

            )}
            <Text fontSize="2xl" fontWeight="bold" mb="4">Are You go To</Text>
            <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>Student Dashboard</Link>
        </Box>
    );
};

export default CourseList;
