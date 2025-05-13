import { create } from "zustand";
import { getDashBoardStatistic } from "../action/dashBoardAction";
import { createUser, getUserById, getUsers, updateAccountStatus, updateUser } from "../action/userAction";
import { getDepartments } from "../action/departmentAction";
import { getClassrooms } from "../action/classroomAction";


const useDashBoardStore = create((set) => ({
    totalStatistic: {},
    users: [],
    user: {},
    departments: [],
    classrooms: [],
    pagination: {},
    isLoaded: false,
    getDashBoardStatistic: () => getDashBoardStatistic(set),
    getUsers: (search, page, item_per_page, departmentID, role) => getUsers(set, search, page, item_per_page, departmentID, role),
    getUserById: (id) => getUserById(set, id),
    updateUser: (id, data, role) => updateUser(set, id, data, role),
    createUser: (data, user) => createUser(set, data, user),
    updateAccountStatus: (status, userId) => updateAccountStatus(set, status, userId),
    getDepartments: () => getDepartments(set),
    getClassrooms: () => getClassrooms(set)
}))

export default useDashBoardStore;