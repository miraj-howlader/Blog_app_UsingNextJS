import BlogOverView from '@/components/BlogOverView'
import React from 'react'

async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch('http://localhost:3000/api/get-blog', {
      method: "GET",
      cache:'no-store'
    })


    const result = await apiResponse.json()
    return result?.data


  } catch (error) {
    throw new Error(error)
  }
  
}
const Blogs = async () => {
  const blogList = await fetchListOfBlogs()
  console.log(blogList, 'blogList')
  return (
    <div>
      <BlogOverView 
      blogList={blogList}
      />
    </div>
  )
}

export default Blogs
