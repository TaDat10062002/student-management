import React, { useEffect } from 'react'
import useDashBoardStore from '../../store/useDashBoardStore';
const DashboardPage = () => {

    const { totalStatistic, getDashBoardStatistic, isLoaded } = useDashBoardStore();
    useEffect(() => {
        getDashBoardStatistic()
    }, [getDashBoardStatistic])

    return (
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
                <p className="mt-2 text-3xl font-bold text-yellow-500">{totalStatistic.totalUsers}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700">Departments</h2>
                <p className="mt-2 text-3xl font-bold text-yellow-500">{totalStatistic.totalDepartments}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700">Classrooms</h2>
                <p className="mt-2 text-3xl font-bold text-yellow-500">{totalStatistic.totalClassrooms}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700">Subjects</h2>
                <p className="mt-2 text-3xl font-bold text-yellow-500">{totalStatistic.totalSubjects}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700">Courses</h2>
                <p className="mt-2 text-3xl font-bold text-yellow-500">{totalStatistic.totalCourses}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700">Registered Courses</h2>
                <p className="mt-2 text-3xl font-bold text-yellow-500">{totalStatistic.totalRegisteredCourses}</p>
            </div>
        </main>
    )
}

export default DashboardPage