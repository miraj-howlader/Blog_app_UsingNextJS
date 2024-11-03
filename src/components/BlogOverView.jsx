'use client'

import { useEffect, useState } from 'react'
import AddNewBlog from './AddNewBlog'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Label } from './ui/label'

const initialBlogFromData = {
  title:"",
  description:''
}

const BlogOverView = ({blogList}) => {
  const [openDialogBox,setOpenDialogBox] = useState(false);
  const [loading,setLoading] = useState(false);
  const [blogFromData,setBlogFromData] = useState(initialBlogFromData)
  const [currentEditedBlogID,setCurrentEditBlogID] = useState(null)
  const router = useRouter();

  useEffect(()=>{
    router.refresh()
  }, [])

  const handleBlogData = async () => {
    try {
      setLoading(true)
      const apiResponse = currentEditedBlogID !== null ?
      await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
        method: "PUT",
        body: JSON.stringify(blogFromData)
      })
      : await fetch('/api/add-blog',  {
        method: 'POST',
        body: JSON.stringify(blogFromData)
      })
      const result = await apiResponse.json()
      console.log(result)
      if(result?.success){
        setBlogFromData(initialBlogFromData)
        setOpenDialogBox(false)
        setLoading(false)
        setCurrentEditBlogID(null)
        router.refresh();
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setBlogFromData(initialBlogFromData)
    }

  }
  function haddleEditBlogId(getCurrentBlog){
    setCurrentEditBlogID(getCurrentBlog?._id);
    setBlogFromData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog.description,
    })
    setOpenDialogBox(true)
  }
  console.log(currentEditedBlogID)
   async function handleDeleteBlogById (getCurrentID) {
    try {
    const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
      method: 'DELETE'
    })
      const result = await apiResponse.json();

      if(result?.success) router.refresh();
    } catch (error) {
      console.log(error)
    }
   }


  return (
    <div className='min-h-screen flex flex-col gap-10 
     bg-gradient-to-r from-purple-500  to-blue-600 p-6'>
     <AddNewBlog
     openDialogBox={openDialogBox}
     setOpenDialogBox={setOpenDialogBox}
     loading={loading}
     setLoading={setLoading}
     blogFromData={blogFromData}
     setBlogFromData={setBlogFromData}
     handleBlogData={handleBlogData}
     currentEditedBlogID={currentEditedBlogID}
     setCurrentEditBlogID={setCurrentEditBlogID}
     />
     <div className=' p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      gap-3 mt-5'>
      {
        blogList && blogList.length > 0 ?
        blogList.map((item) =>(
          <Card key={item.title} className='p-4'>
            <CardContent>
              <CardTitle className='mb-5'>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            <div className=' mt-5 space-x-6  items-center'>
            <Button onClick={() => haddleEditBlogId(item)}>Edit</Button>
            <Button onClick={() => handleDeleteBlogById(item._id)}>Delete</Button>
            </div>
            </CardContent>
          </Card>
        ))
        :<Label className='text-3xl font-extrabold'>No Blog added Please first Added One</Label>
      }
     </div>
    </div>
  )
}

export default BlogOverView
