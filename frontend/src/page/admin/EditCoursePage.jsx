import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import useDashBoardStore from '../../store/useDashBoardStore';

const EditCoursePage = () => {
    const { teachers, subjects, course, getTeachers, getSubjects, getCourseById, updateCourse } = useDashBoardStore();
    const { id: courseId } = useParams();
    useEffect(() => {
        getTeachers(), getSubjects(),
            getCourseById(courseId)
    }, [courseId])

    const [dataForm, setDataForm] = useState({
        teacher: '',
        subject: '',
        amount: '',
    })

    useEffect(() => {
        if (course) {
            setDataForm({
                teacher: course.teacher || '',
                subject: course.subject || '',
                amount: course.amount || ''
            })
        }
    }, [course])

    const handleUpdate = (e) => {
        e.preventDefault();
        updateCourse(courseId, dataForm)
    }

    return (
        <>
            <Toaster reverseOrder={true} />
            <Link to={'/admin/courses'} className='p-3 bg-amber-500 w-fit m-5 rounded-md'>Back to courses</Link>
            <form className="max-w-lg mx-auto shadow-md rounded-2xl">
                <h1 className='text-3xl font-medium text-center mb-5'>Edit course for student</h1>
                <div className="relative z-0 w-100 mx-auto mb-5 group px-5 mt-5">
                    <input value={dataForm.amount} onChange={(e) => setDataForm({ ...dataForm, amount: e.target.value })} type="number" name="floating_fullname" id="floating_fullname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                    <label htmlFor="floating_fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount of student in this course</label>
                </div>
                <div className='flex justify-around gap-3 w-90 mx-auto'>
                    <select className="bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500" onChange={(e) => setDataForm({ ...dataForm, teacher: e.target.value })} value={dataForm.teacher._id} >
                        <option value="">Choose a teacher</option>
                        {
                            teachers.map((teacher, index) => (
                                <option key={index} value={teacher._id}>{teacher.fullName}</option>

                            ))
                        }
                    </select>
                    <select className="bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500"
                        onChange={(e) => setDataForm({ ...dataForm, subject: e.target.value })} value={dataForm.subject._id}>
                        <option value="">Choose a subject</option>
                        {
                            subjects.map((subject, index) => (
                                <option key={index} value={subject._id}>{subject.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="button" onClick={(e) => handleUpdate(e)} className="cursor-pointer bg-green-500 w-90 py-3 rounded-md block mx-auto relative bottom-5 mt-10">Save changes</button>
            </form>
        </>
    )
}

export default EditCoursePage