const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

// src/api.js
const courses = [
    {
        id: 1,
        name: 'Introduction to React Native',
        instructor: 'John Doe',
        description: 'Learn the basics of React Native development and build your first mobile app.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '8 weeks',
        schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to React Native',
                content: 'Overview of React Native, setting up your development environment.'
            },
            {
                week: 2,
                topic: 'Building Your First App',
                content: 'Creating a simple mobile app using React Native components.'
            }
        ],
        students: [
            {
                id: 101,
                name: 'Alice Johnson',
                email: 'alice@example.com'
            },
            {
                id: 102,
                name: 'Bob Smith',
                email: 'bob@example.com'
            }
        ]
    },
    {
        id: 2,
        name: 'Introduction to React',
        instructor: 'Jane Doe',
        description: 'Learn the basics of React development and build your first web app.',
        enrollmentStatus: 'Closed',
        thumbnail: 'your.image.here',
        duration: '6 weeks',
        schedule: 'Mondays and Wednesdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['Basic JavaScript knowledge'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to React',
                content: 'Overview of React, setting up your development environment.'
            },
            {
                week: 2,
                topic: 'Building Your First Web App',
                content: 'Creating a simple web app using React components.'
            }
        ],
        students: [
            {
                id: 103,
                name: 'Charlie Brown',
                email: 'charlie@example.com'
            }
        ]
    }
];



app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/student-courses/:email', (req, res) => {

    const studentEmail = req.params.email;
    const studentCourses = courses.filter(course => {
        return course.students.some(student => student.email === studentEmail);
    });
    res.json(studentCourses);
});

app.get('/', (req, res) => {
    res.json("api is working")
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
