import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Input,
    Button,
    Text,
    UnorderedList,
    ListItem,
    CircularProgress,
} from '@chakra-ui/react';

const StudentCourses = () => {
    const [email, setEmail] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchStudentCourses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/student-courses/${email}`);
            setCourses(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching data');
        }
        setLoading(false);
    };

    return (
        <Box p="4">
            <Heading as="h2" mb="4">Student Courses</Heading>
            <Box mb="4">
                <label>Email:</label>
                <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
            </Box>
            <Button onClick={fetchStudentCourses} mb="4">Fetch Courses</Button>

            {loading && <CircularProgress isIndeterminate color="blue.500" size="48px" />}
            {error && <Text color="red.500">{error}</Text>}
            {courses.length > 0 && (
                <UnorderedList>
                    {courses.map((course) => (
                        <ListItem key={course.id} mb="4">
                            <Heading as="h3" size="md" mb="2">{course.name}</Heading>
                            <Text mb="2">Instructor: {course.instructor}</Text>
                            <Text mb="2">Description: {course.description}</Text>
                            <Text mb="2">Status: {course.enrollmentStatus}</Text>
                            <Text mb="2">Duration: {course.duration}</Text>
                            <Text mb="2">Schedule: {course.schedule}</Text>
                            <Text mb="2">Location: {course.location}</Text>
                            <Text mb="2">Prerequisites: {course.prerequisites.join(', ')}</Text>
                            <details>
                                <summary>Syllabus</summary>
                                <UnorderedList pl="4">
                                    {course.syllabus.map((item) => (
                                        <ListItem key={item.week}>
                                            Week {item.week}: {item.topic}
                                            <Text mt="2">{item.content}</Text>
                                        </ListItem>
                                    ))}
                                </UnorderedList>
                            </details>
                        </ListItem>
                    ))}
                </UnorderedList>
            )}
        </Box>
    );
};

export default StudentCourses;
