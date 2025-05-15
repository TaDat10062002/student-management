import { useLocation } from "react-router-dom"

const Modal = ({ isOpen, handleClose, handleDelete }) => {
    const pathName = useLocation().pathname;
    const parts = pathName.split('/');
    return (
        <>
            <div id="popup-modal" tabIndex={-1} className={`${!isOpen ? 'hidden' : ''}  overflow-y-auto overflow-x-hidden fixed top-20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full mx-auto top-5">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-100">
                        <button type="button" onClick={(e) => handleClose(e)} className="absolute right-0 m-3 hover:bg-red-400 text-black hover:text-white">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            {
                                parts[2] === 'subjects' ?
                                    <h3 className="mb-5 font-medium text-lg">Do you want to delete this {parts[2] === parts[2] ? 'subject' : ''} </h3>
                                    : ''
                            }
                            <button type="button" onClick={(e) => handleClose(e)} className="px-3 py-3 rounded-md mr-10 font-semibold cursor-pointer bg-red-700 text-white hover:bg-red-600 hover:text-white">No, cancel</button>
                            <button onClick={(e) => { handleDelete(), handleClose(e) }} type="button" className="px-3 py-3 rounded-md mr-10 font-semibold cursor-pointer bg-green-700 text-white hover:bg-green-600 hover:text-white">Yes, I do</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal