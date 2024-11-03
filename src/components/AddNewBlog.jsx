'use client'
import { Button } from './ui/button'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddNewBlog = ({handleBlogData,setCurrentEditBlogID,currentEditedBlogID, openDialogBox, setOpenDialogBox, loading, setLoading, blogFromData, setBlogFromData }) => {
    
    return (
        <div>
            <div>
                <Button onClick={() => setOpenDialogBox(true)}>Add New Blog</Button>
            </div>


            <Dialog open={openDialogBox} onOpenChange={() => {
                setOpenDialogBox({
                     title:"",
                     description:''
                })
                setCurrentEditBlogID(null)
            }}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEditedBlogID ?"Edit Blog":"Add New Blog"}</DialogTitle>

                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name='title'
                                placeholder='Enter blog title'
                                value={blogFromData.title}
                                onChange={(e) => setBlogFromData({
                                    ...blogFromData,
                                    title:e.target.value
                                })}

                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                 name="description"
                                 placeholder='Blog description'
                                 value={blogFromData.description}
                                 onChange={(e) => setBlogFromData({
                                    ...blogFromData,
                                    description:e.target.value
                                })}

                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleBlogData} type="submit">
                            {
                                loading ? "Saving changes":"Save changes"
                            }
                            Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewBlog
