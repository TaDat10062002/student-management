import { create } from "zustand";
import { getDashBoardStatistic } from "../action/dashBoardAction";
import { createUser, getUserById, getUsers, updateAccountStatus, updateUser } from "../action/userAction";
import { createDepartment, getDepartmentById, getDepartments, getDepartmentsPagination, updateDepartment, updateDepartmentStatus } from "../action/departmentAction";
import { createClass, getClassById, getClassrooms, getClassroomsPagination, updateClass } from "../action/classroomAction";
import { createSubject, getSubjectById, updateSubject } from "../action/subjectAction";


const useDashBoardStore = create((set) => ({
    totalStatistic: {},
    users: [],
    user: {},
    departments: [],
    department: {},
    classrooms: [],
    pagination: {},
    subject: {},
    isLoaded: false,
    getDashBoardStatistic: () => getDashBoardStatistic(set),
    // user
    getUsers: (search, page, item_per_page, departmentID, role) => getUsers(set, search, page, item_per_page, departmentID, role),
    createUser: (data, user) => createUser(data, user),
    getUserById: (id) => getUserById(set, id),
    updateUser: (id, data, role) => updateUser(id, data, role),
    updateAccountStatus: (status, userId) => updateAccountStatus(set, status, userId),
    // department
    getDepartments: () => getDepartments(set),
    getDepartmentsPagination: (search, page, item_per_page) => getDepartmentsPagination(set, search, page, item_per_page),
    createDepartment: (data) => createDepartment(data),
    getDepartmentById: (id) => getDepartmentById(set, id),
    updateDepartment: (id, data) => updateDepartment(id, data),
    updateDepartmentStatus: (status, departmentID) => updateDepartmentStatus(set, status, departmentID),
    // classroom
    getClassrooms: () => getClassrooms(set),
    getClassroomsPagination: (search, page, item_per_page) => getClassroomsPagination(set, search, page, item_per_page),
    createClass: (data) => createClass(data),
    getClassById: (id) => getClassById(set, id),
    updateClass: (id, data) => updateClass(id, data),
    // subject
    createSubject: (data) => createSubject(data),
    getSubjectById: (id) => getSubjectById(set, id),
    updateSubject: (id, data) => updateSubject(id, data)

}))

export default useDashBoardStore;