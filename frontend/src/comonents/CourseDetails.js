import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { enrollCourse } from '../redux/slices/coursesSlice';
import { Box, Heading, Text, UnorderedList, ListItem, Button } from '@chakra-ui/react';

const CourseDetails = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const course = useSelector(state => state.courses.courses.find(course => course.id === parseInt(courseId)));
    const [enrolled, setEnrolled] = useState(false);

    const handleEnroll = () => {
        dispatch(enrollCourse(course));
        setEnrolled(true); // Set enrolled state to true after successful enrollment
    };

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <Box maxW="600px" mx="auto" p="4" bg="#f8f8f8" borderWidth="1px" borderRadius="md" mt="4">
            <Heading as="h2" mb="4">{course.name}</Heading>
            <Text>Instructor: {course.instructor}</Text>
            <Text>{course.description}</Text>
            <Text>Status: {course.enrollmentStatus}</Text>
            <Text>Duration: {course.duration}</Text>
            <Text>Schedule: {course.schedule}</Text>
            <Text>Location: {course.location}</Text>
            <Text>Pre-requisites: {course.prerequisites.join(', ')}</Text>
            <details>
                <summary>Syllabus</summary>
                <UnorderedList pl="0">
                    {course.syllabus.map(item => (
                        <ListItem key={item.week}>
                            Week {item.week}: {item.topic}
                            <Text mt="2">{item.content}</Text>
                        </ListItem>
                    ))}
                </UnorderedList>
            </details>
            {/* <Button onClick={handleEnroll} disabled={enrolled} mt="4">Enroll in Course</Button>
            {enrolled && <Text>Course enrolled successfully!</Text>}
            <Link to="/dashboard" mt="2">Go to Student Dashboard</Link> */}
        </Box>
    );
};

export default CourseDetails;
