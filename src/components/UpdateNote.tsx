import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { updateNote,updateNoteType } from "@/lib/notes-api";
import { useNote } from "@/context/NoteContext";
import { CircleX } from "lucide-react";





export default function UpdateNote({id,Pinned,setOpenUpdateNote} : updateNoteType & {setOpenUpdateNote:React.Dispatch<React.SetStateAction<boolean>>}) {


  const {notes,dispatch} = useNote();
  const note = notes.find(note => note.id === id);
  const [newUpdateNote,setNewUpdateNote] = useState<updateNoteType>({
      title:note?.title,
      body:note?.body,
      tagline:note?.tagline,
      Pinned:Pinned,
  });
  async function handleUpdateNote(){

    const updatedNote = {
      id:id,
      title:newUpdateNote.title,
      body:newUpdateNote.body,
      tagline:newUpdateNote.tagline,
      noteCreated:Date.now(),
      Pinned:newUpdateNote.Pinned,
    }
    await updateNote(updatedNote);
    dispatch({type:'UPDATE_NOTE',payload:updatedNote});
    setOpenUpdateNote(false);
  }


  return (
      <div className="fixed top-1/3 right-1/4 z-50 px-20 py-14 w-[50vw] bg-gray-300 text-black border-black dark:bg-slate-800 dark:text-white dark:border-white">
        <CircleX width={40} height={40} strokeWidth={2} className="absolute top-4 right-4 cursor-pointer" onClick={()=>setOpenUpdateNote(false)} />
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Update Note</h4>
            <p className="text-sm text-muted-foreground">
                Update your note here
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="col-span-2 h-8"
                onChange={(e)=>setNewUpdateNote({...newUpdateNote,title:e.target.value})}
                defaultValue={newUpdateNote.title}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                className="col-span-2 h-8"
                onChange={(e)=>setNewUpdateNote({...newUpdateNote,body:e.target.value})}
                defaultValue={newUpdateNote.body}
                />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                className="col-span-2 h-8"
                onChange={(e)=>setNewUpdateNote({...newUpdateNote,tagline:e.target.value})}
                defaultValue={newUpdateNote.tagline}
                />
            </div>
            <Button className="w-full bg-slate-700 text-white hover:bg-slate-900 my-5" onClick={ ()=>handleUpdateNote()}>Update</Button>
          </div>
        </div>
  </div>
  )
}
