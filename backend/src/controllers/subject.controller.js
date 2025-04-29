import mongoose from "mongoose";

import Subject from "../models/subject.model.js";
import Course from "../models/course.model.js";
// subject 
export const getSubjects = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 3;
    try {
        if (search) {
            const querySubject = Subject.find({
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { number_of_credits: { $regex: search, $options: "i" } },
                ]
            })
            
            const subjects = await querySubject
                .clone()
                .skip((page - 1) * item_per_page)
                .limit(item_per_page);

            if (subjects.length === 0) {
                return res.status(404).json({
                    message: "No subjects was found!!!"
                })
            }

            const totalDocs = (await querySubject).length;
            const totalPages = Math.ceil(totalDocs / item_per_page);

            if (page > totalPages) {
                return res.status(404).json({
                    message: "Page not found!!!"
                })
            }

            res.status(200).json({
                subjects,
                pagination: {
                    currentPage: Number(page),
                    totalPages: totalPages,
                    item_per_page: item_per_page,
                    totalSubjects: subjects.length
                }
            })
        }

        const querySubject = Subject.find();
        const subjects = await querySubject
            .clone()
            .skip((page - 1) * item_per_page)
            .limit(item_per_page);

        if (subjects.length === 0) {
            return res.status(404).json({
                message: "No subjects was found!!!"
            })
        }

        const totalDocs = (await querySubject).length;
        const totalPages = Math.ceil(totalDocs / item_per_page);

        if (page > totalPages) {
            return res.status(404).json({
                message: "Page not found!!!"
            })
        }
        res.status(200).json({
            subjects,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalSubjects: subjects.length
            }
        })

    } catch (error) {
        console.log(`Error getSubjects in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createSubject = async (req, res) => {
    const { name, number_of_credits } = req.body;
    try {
        if (!name || !number_of_credits) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const subject = await Subject.findOne({ name: name });
        if (subject) {
            return res.status(400).json({
                message: `Subject ${name} is existed`
            })
        }

        const newSubject = new Subject({
            name,
            number_of_credits
        })

        await newSubject.save();
        res.status(201).json({
            message: `Subject ${name} is created successfully`,
            newSubject
        })
    } catch (error) {
        console.log(`Error createSubject in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateSubject = async (req, res) => {
    const { id } = req.params;
    const { name, number_of_credits } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid Subject ID"
        })
    }

    try {
        const updatedSubject = await Subject.findByIdAndUpdate(id,
            {
                name: name,
                number_of_credits: number_of_credits
            }, { new: true })

        if (!updatedSubject) {
            return res.status(404).json({
                message: "Subject not found!!!"
            })
        }

        res.status(200).json({
            message: `Subject ${updatedSubject.name} has been updated successfully`,
            updatedSubject
        })

    } catch (error) {
        console.log(`Error updateSubject in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteSubject = async (req, res) => {
    const { id: subjectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({
            message: "Invalid Subject Id"
        })
    }
    try {
        const count = await Course.countDocuments({ subjectID: subjectId });
        const subject = await Subject.findById(subjectId);
        if (count > 0) {
            return res.status(400).json({
                message: `Cannot delete subject ${subject.name}, This subject is registered in ${count} courses`
            })
        }
        const deletedSubject = await Subject.findByIdAndDelete(subject, { new: true });
        res.status(200).json({
            message: `${deletedSubject.name} subject has been deleted successfully`
        })
    } catch (error) {
        console.log(`Error deleteSubject in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

