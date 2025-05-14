import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import useDashBoardStore from '../../store/useDashBoardStore'

const EditSubjectPage = () => {
    const { getSubjectById, updateSubject, subject } = useDashBoardStore();
    const { id: subjectId } = useParams();

    useEffect(() => {
        getSubjectById(subjectId)
    }, [subjectId])

    useEffect(() => {
        if (subject) {
            setDataForm({
                name: subject.name || '',
                number_of_credits: subject.number_of_credits || ''
            })
        }
    }, [subject])

    const [dataForm, setDataForm] = useState({
        name: '',
        number_of_credits: ''
    })
    const handleUpdate = (e) => {
        e.preventDefault();
        updateSubject(subjectId, dataForm)
    }

    return (
        <>
            <Toaster reverseOrder={true} />
            <Link to={'/admin/subjects'} className='p-3 bg-amber-500 w-fit m-5 rounded-md'>Back to subject</Link>
            <form className="max-w-lg mx-auto shadow-md rounded-2xl">
                <h1 className='text-3xl font-medium text-center mb-5'>Edit subject</h1>
                <div className="relative z-0 w-100 mx-auto mb-5 group px-5 mt-5">
                    <input value={dataForm.name} onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })} type="email" name="floating_fullname" id="floating_fullname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                    <label htmlFor="floating_fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Subject's name</label>
                </div>
                <div className='flex justify-around gap-3 w-90 mx-auto'>
                    <select className="bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500" onChange={(e) => setDataForm({ ...dataForm, number_of_credits: e.target.value })} value={dataForm.number_of_credits}>
                        <option value="">Choose number of credits</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button type="button" onClick={(e) => handleUpdate(e)} className="cursor-pointer bg-green-500 w-90 py-3 rounded-md block mx-auto relative bottom-5 mt-10">Save changes</button>
            </form>
        </>
    )
}

export default EditSubjectPage