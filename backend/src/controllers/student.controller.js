import Student from "../models/student.model.js"

export const getStudents = async (req, res) => {
    const search = req.query.search || '';
    const departmentType = req.query.departmentType || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "departments",
                    localField: "department",
                    foreignField: "_id",
                    as: "departmentInfo"
                }
            },
            { $unwind: "$departmentInfo" },
            {
                $lookup: {
                    from: "classrooms",
                    localField: "class",
                    foreignField: "_id",
                    as: "classInfo"
                }
            },
            { $unwind: "$classInfo" },
            {
                $project: {
                    departmentInfo: {
                        name: 1,
                        departmentType: 1,
                    },
                    classInfo: {
                        name: 1
                    },
                    fullName: 1,
                    dob: 1,
                    gender: 1,
                }
            },
        ];

        if (search || departmentType) {
            const students = await Student.aggregate(pipeline);
            const totalDocs = students.length;
            const totalPages = Math.ceil(totalDocs / item_per_page);
            const paginatePipeLine = [...pipeline];
            paginatePipeLine.push(
                {
                    $match: {
                        'departmentInfo.departmentType': { $regex: departmentType },
                        $or: [
                            { fullName: { $regex: search, $options: "i" } },
                            { 'departmentInfo.name': { $regex: search, $options: "i" } },
                        ]
                    }
                },
                { $skip: (page - 1) * item_per_page },
                { $limit: Number(item_per_page) },
            )
            const studentPaginate = await Student.aggregate(paginatePipeLine);
            res.status(200).json({
                students: studentPaginate,
                pagination: {
                    curretPage: Number(page),
                    totalPages: totalPages,
                    item_per_page: Number(item_per_page),
                    totalStudents: students.length
                }
            })
        }

        const students = await Student.aggregate(pipeline);
        const totalDocs = students.length;
        const totalPages = Math.ceil(totalDocs / item_per_page);
        const paginatePipeLine = [...pipeline];
        paginatePipeLine.push(
            { $skip: (page - 1) * item_per_page },
            { $limit: Number(item_per_page) },
        )
        const studentPaginate = await Student.aggregate(paginatePipeLine);
        res.status(200).json({
            students: studentPaginate,
            pagination: {
                curretPage: Number(page),
                totalPages: totalPages,
                item_per_page: Number(item_per_page),
                totalStudents: students.length
            }
        })
    } catch (error) {

    }
}