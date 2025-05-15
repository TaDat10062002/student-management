import { create } from "zustand";
import { getDashBoardStatistic, getSubjects, getTeachers } from "../action/dashBoardAction";
import { createUser, getUserById, getUsers, updateAccountStatus, updateUser } from "../action/userAction";
import {
    createDepartment,
    getDepartmentById,
    getDepartments,
    getDepartmentsPagination,
    updateDepartment,
    updateDepartmentStatus
} from "../action/departmentAction";
import { createClass, getClassById, getClassrooms, getClassroomsPagination, updateClass } from "../action/classroomAction";
import { createSubject, deleteSubject, getSubjectById, updateSubject } from "../action/subjectAction";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse, updateCourseStatus } from "../action/courseAction";


const useDashBoardStore = create((set) => ({
    totalStatistic: {},
    users: [],
    user: {},
    departments: [],
    department: {},
    classrooms: [],
    teachers: [],
    pagination: {},
    subjects: [],
    subject: {},
    courses: [],
    course: {},
    isLoaded: false,
    getDashBoardStatistic: () => getDashBoardStatistic(set),
    // user
    getUsers: (search, page, item_per_page, departmentID, role) => getUsers(set, search, page, item_per_page, departmentID, role),
    createUser: (data, user) => createUser(data, user),
    getUserById: (id) => getUserById(set, id),
    updateUser: (id, data, role) => updateUser(id, data, role),
    updateAccountStatus: (status, userId) => updateAccountStatus(status, userId),
    // department
    getDepartments: () => getDepartments(set),
    getDepartmentsPagination: (search, page, item_per_page) => getDepartmentsPagination(set, search, page, item_per_page),
    createDepartment: (data) => createDepartment(data),
    getDepartmentById: (id) => getDepartmentById(set, id),
    updateDepartment: (id, data) => updateDepartment(id, data),
    updateDepartmentStatus: (status, departmentID) => updateDepartmentStatus(status, departmentID),
    // classroom
    getClassrooms: () => getClassrooms(set),
    getClassroomsPagination: (search, page, item_per_page) => getClassroomsPagination(set, search, page, item_per_page),
    createClass: (data) => createClass(data),
    getClassById: (id) => getClassById(set, id),
    updateClass: (id, data) => updateClass(id, data),
    // subject
    createSubject: (data) => createSubject(data),
    getSubjectById: (id) => getSubjectById(set, id),
    updateSubject: (id, data) => updateSubject(id, data),
    deleteSubject: (id) => deleteSubject(id),
    updateCourseStatus: (status, departmentID) => updateCourseStatus(status, departmentID),

    getAllCourses: (search, page, item_per_page) => getAllCourses(set, search, page, item_per_page),
    getTeachers: () => getTeachers(set),
    getSubjects: () => getSubjects(set),
    createCourse: (data) => createCourse(data),
    getCourseById: (id) => getCourseById(set, id),
    updateCourse: (id, data) => updateCourse(id, data),
    // chua lay duoc state moi nhat sau khi xoa
    deleteCourse: (id) => deleteCourse(id)
}))

export default useDashBoardStore;