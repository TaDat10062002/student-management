import mongoose from "mongoose";

import Subject from "../models/subject.model.js";
// subject 
export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        if (subjects.length === 0) {
            return res.status(404).json({
                message: "No subjects was found!!!"
            })
        }

        res.status(200).json({
            subjects,
            amount: subjects.length
        })
    } catch (error) {

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

// todo
export const deleteSubject = async (req, res) => {

}

