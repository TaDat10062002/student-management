import { create } from "zustand";
import { getDashBoardStatistic } from "../action/dashBoardAction";
import { createUser, getUsers, updateAccountStatus } from "../action/userAction";
import { getDepartments } from "../action/departmentAction";
import { getClassrooms } from "../action/classroomAction";
import { data } from "react-router-dom";


const useDashBoardStore = create((set) => ({
    totalStatistic: {},
    users: [],
    departments: [],
    classrooms: [],
    pagination: {},
    isLoaded: false,
    getDashBoardStatistic: () => getDashBoardStatistic(set),
    getUsers: (search, page, item_per_page, departmentID, role) => getUsers(set, search, page, item_per_page, departmentID, role),
    createUser: (data, user) => createUser(set, data, user),
    updateAccountStatus: (status, userId) => updateAccountStatus(set, status, userId),
    getDepartments: () => getDepartments(set),
    getClassrooms: () => getClassrooms(set)
}))

export default useDashBoardStore;