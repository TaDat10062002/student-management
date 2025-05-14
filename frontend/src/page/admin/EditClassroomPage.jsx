import { Toaster } from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import useClassStore from "../../store/useClassStore";
import { useEffect, useState } from "react";
import useDashBoardStore from "../../store/useDashBoardStore";

const EditClassroomPage = () => {
    const { id } = useParams();
    const { getClassById, classroom, updateClass } = useDashBoardStore();

    useEffect(() => {
        getClassById(id)
    }, [id])

    const [dataForm, setDataForm] = useState({
        name: '',
        amount: ''
    })

    useEffect(() => {
        if (classroom) {
            setDataForm({
                name: classroom.name,
                amount: classroom.amount
            })
        }
    }, [classroom])

    const handleUpdate = (e) => {
        e.preventDefault();
        updateClass(id, dataForm)
    }

    return (
        <>
            <Toaster reverseOrder={true} />
            <Link to={'/admin/classrooms'} className='p-3 bg-amber-500 w-fit m-5 rounded-md'>Back to classrooms</Link>
            <form className="max-w-lg mx-auto shadow-md rounded-2xl">
                <h1 className='text-3xl font-medium text-center mb-5'>Edit classroom information</h1>
                <div className="relative z-0 w-100 mx-auto mb-5 group px-5 mt-5">
                    <input value={dataForm.name} onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })} type="email" name="floating_fullname" id="floating_fullname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                    <label htmlFor="floating_fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Classroom's name</label>
                </div>
                <div className="relative z-0 w-100 mx-auto mb-5 group px-5 mt-5">
                    <input value={dataForm.amount} onChange={(e) => setDataForm({ ...dataForm, amount: e.target.value })} type="number" name="floating_fullname" id="floating_fullname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                    <label htmlFor="floating_fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Classroom's amount of students</label>
                </div>
                <button type="button" onClick={(e) => handleUpdate(e)} className="cursor-pointer bg-green-500 w-90 py-3 rounded-md block mx-auto relative bottom-5 mt-10">Save changes</button>
            </form>
        </>
    )
}

export default EditClassroomPage