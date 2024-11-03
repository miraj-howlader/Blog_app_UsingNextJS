import ConnectToDB from "@/database"
import Blog from "@/models/blog";
import { NextResponse } from "next/server"


export async function GET(){
    try {
        await ConnectToDB();
        const extraAllBlogFromDataBase = await Blog.find({});
        if(extraAllBlogFromDataBase){
            return NextResponse.json({
                success:true,
                data:extraAllBlogFromDataBase
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'Something went Wrong! Please Try again.'
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Something went Wrong! Please Try again.'
        })
    }
}