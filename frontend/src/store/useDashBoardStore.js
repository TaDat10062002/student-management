import { create } from "zustand";
import { getDashBoardStatistic } from "../action/dashBoardAction";
import { createUser, getUserById, getUsers, updateAccountStatus, updateUser } from "../action/userAction";
import { createDepartment, getDepartmentById, getDepartments, getDepartmentsPagination, updateDepartment, updateDepartmentStatus } from "../action/departmentAction";
import { getClassrooms } from "../action/classroomAction";


const useDashBoardStore = create((set) => ({
    totalStatistic: {},
    users: [],
    user: {},
    departments: [],
    department: {},
    classrooms: [],
    pagination: {},
    isLoaded: false,
    getDashBoardStatistic: () => getDashBoardStatistic(set),
    // user
    getUsers: (search, page, item_per_page, departmentID, role) => getUsers(set, search, page, item_per_page, departmentID, role),
    getUserById: (id) => getUserById(set, id),
    updateUser: (id, data, role) => updateUser(set, id, data, role),
    createUser: (data, user) => createUser(set, data, user),
    updateAccountStatus: (status, userId) => updateAccountStatus(set, status, userId),

    // department
    getDepartments: () => getDepartments(set),
    getDepartmentsPagination: (search, page, item_per_page) => getDepartmentsPagination(set, search, page, item_per_page),
    createDepartment: (data) => createDepartment(set, data),
    getDepartmentById: (id) => getDepartmentById(set, id),
    updateDepartment: (id, data) => updateDepartment(set, id, data),
    updateDepartmentStatus: (status, departmentID) => updateDepartmentStatus(set, status, departmentID),
    // classroom
    getClassrooms: () => getClassrooms(set)
}))

export default useDashBoardStore;