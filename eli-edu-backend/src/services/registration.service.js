const User = require('../models/user.model');
const Course = require('../models/course.model');

class RegistrationService {
    async registerUser(courseId, userData) {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }

        let user = await User.findOne({ email: userData.email });
        if (!user) {
            user = new User({
                name: userData.name,
                email: userData.email
            });
        }

        const isRegistered = user.registeredCourses.some(
            reg => reg.course.toString() === courseId
        );

        if (isRegistered) {
            throw new Error('Already registered for this course');
        }

        user.registeredCourses.push({
            course: courseId,
            status: 'active'
        });

        await user.save();

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            course: {
                id: course._id,
                title: course.title
            }
        };
    }

    async getCourseRegistrations(courseId) {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }

        const users = await User.find({
            'registeredCourses.course': courseId
        }).select('name email registeredCourses.$');

        return users.map(user => ({
            userId: user._id,
            name: user.name,
            email: user.email,
            registeredAt: user.registeredCourses[0].registeredAt,
            status: user.registeredCourses[0].status
        }));
    }

    async updateRegistrationStatus(userId, courseId, status) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const registration = user.registeredCourses.find(
            reg => reg.course.toString() === courseId
        );

        if (!registration) {
            throw new Error('Registration not found');
        }

        registration.status = status;
        await user.save();

        return {
            userId: user._id,
            courseId,
            status
        };
    }
}

module.exports = new RegistrationService(); 