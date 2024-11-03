import ConnectToDB from "@/database"
import Blog from "@/models/blog";
const Joi = require("joi");
import { NextResponse } from "next/server"

const EditNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})



async function PUT(req) {
    try {
        await ConnectToDB();
        const {searchParams} = new URL(req.url)
        const getCurrentBlogID = searchParams.get('id')

        if(!getCurrentBlogID){
            return NextResponse.json({
                success: false,
                message: " Blog ID is required"
            })
        }
        const {title,description} = extractBlogData;
        const {error} = EditNewBlog.validate({
            title,description
        })


        if(error){
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }

        const updateByBlogID = await Blog.findOneAndUpdate({
            _id: getCurrentBlogID
        }, {title, description}, {new: true})

        if(updateByBlogID){
            return NextResponse.json({
                success: true,
                message: "Blog is updated successfully"
            })
        }else{
            return NextResponse.json({
                success: false,
                message: "Something went wrong! please try again"
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong! please try again"
        })
    }
}