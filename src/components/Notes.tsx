'use client'
import {useState, useEffect } from "react";
import { CirclePlus ,PinIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"; 
import { useNote } from "@/context/NoteContext";
import { noteType, updatePinnedNotes } from "@/lib/notes-api";
import UpdateNote from "@/components/UpdateNote";
import AddNewNote from "@/components/AddNewNote";
import { set } from "firebase/database";


function Notes() {

    const {notes} = useNote();
    const [loading,setLoading] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const [pinnedNotes,setPinnedNotes] = useState<noteType[]>([]);
    const [unPinnedNotes,setUnPinnedNotes] = useState<noteType[]>([]);
    const [currentUnPinnedNotes,setCurrentUnPinnedNotes] = useState<noteType[]>([]);
    const [updateNoteId,setUpdateNoteId] = useState<string | undefined>(undefined);
    const [openAddNote,setOpenAddNote] = useState<boolean>(false);
    const [openUpdateNote,setOpenUpdateNote] = useState<boolean>(false);
    const indexOfLastNote = currentPage * 6;
    const indexOfFirstNote = indexOfLastNote - 6;

    useEffect(() => {
        if(notes.length > 0){
            setLoading(false);
            const pinnedNotes = notes.filter(note => note.Pinned);
            const unpinnedNotes = notes.filter(note => !note.Pinned);
            setUnPinnedNotes(unpinnedNotes);
            const currentPageNotes = unpinnedNotes.slice(indexOfFirstNote,indexOfLastNote);
            setCurrentUnPinnedNotes(currentPageNotes);
            setPinnedNotes(pinnedNotes);
        }

    },[notes,currentPage]);


    function prevPage(){
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage(){
        if(currentPage < (Math.ceil(unPinnedNotes.length/6))){
            setCurrentPage(currentPage + 1);
        }
    }

    async function pinNote(noteTitle : string){
        const note = notes.find(note => note.title === noteTitle);
        if(note){
            if(pinnedNotes.includes(note)){
                if(note.id !== undefined){
                    await updatePinnedNotes(note.id,false);
                    const newPinnedNotes = pinnedNotes.filter(pinnedNote => pinnedNote.title !== note.title);
                    const newUnPinnedNotes = [...unPinnedNotes,note];
                    console.log("Unpinned Notes:",newUnPinnedNotes);
                    setUnPinnedNotes(newUnPinnedNotes);
                    setPinnedNotes(newPinnedNotes);
                }
            }else{
                if(note.id !== undefined){
                    await updatePinnedNotes(note.id,true);
                    const newUnPinnedNotes = unPinnedNotes.filter(unPinnedNote => unPinnedNote.id !== note.id);
                    console.log("Unpinned Notes:",newUnPinnedNotes);
                    setUnPinnedNotes(newUnPinnedNotes);
                    setPinnedNotes([...pinnedNotes,note]);
                }
            }
        }
    }

    const handleAddNote = () => {
        setOpenAddNote(!openAddNote);
    }


  return (
    <section className="container my-4">
        <div className="fixed bottom-10 right-10 cursor-pointer group">
            <CirclePlus size={72} strokeWidth={1.5} className="group-hover:text-slate-400" onClick={()=>handleAddNote()}/>
        </div>
        <div className={`fixed top-1/3 left-1/4 z-40 ${openAddNote ? 'block' : 'hidden' }`}>
            <AddNewNote openAddNote={openAddNote} setOpenAddNote={setOpenAddNote}/>
        </div>
        {
            pinnedNotes.length > 0 && 
            <>
            <h1 className="text-3xl font-bold">Pinned Notes</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
                    {pinnedNotes.map((note) => (
                        <div key={note.id} >
                            <Card className="w-full h-full dark:bg-slate-700 md:w-[25vw] cursor-pointer rounded relative group shadow-lg shadow-black/50 dark:shadow-slate-700 group" onClick={()=>{
                                setUpdateNoteId(note.id)
                                setOpenUpdateNote(true);
                            }}>
                                <PinIcon size={32} strokeWidth={1.5} className="invisible w-10 h-10 absolute z-10 top-2 right-2 group-hover:visible hover:text-black hover:bg-slate-300 hover:rounded-full hover:p-1" onClick={(e)=>{
                                        e.preventDefault(); 
                                        e.stopPropagation();
                                        pinNote(note.title);
                                    }}/>

                                <CardHeader>
                                    <CardTitle>{note.title}</CardTitle>
                                    <CardDescription>{note.tagline}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{note.body}</CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                {openUpdateNote && <UpdateNote id={updateNoteId} Pinned={true} setOpenUpdateNote={setOpenUpdateNote}/>}
                </div>
            </>
            
        }
        <h1 className="text-3xl font-bold">Notes</h1>
        {loading ? <p>Loading...</p> : 
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
                    {currentUnPinnedNotes.map((note) => (
                        <div key={note.id}>
                                <Card className="w-full h-full dark:bg-slate-700 md:w-[25vw] cursor-pointer rounded relative group shadow-lg shadow-black/50 dark:shadow-slate-700" onClick={()=>{
                                        setUpdateNoteId(note.id)
                                        setOpenUpdateNote(true);
                                    }}>
                                    <PinIcon size={32} strokeWidth={1.5} className="invisible w-10 h-10 absolute top-2 right-2 group-hover:visible hover:text-black hover:bg-slate-300 hover:rounded-full hover:p-1" onClick={(e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        pinNote(note.title);

                                        }}/>
                                    <CardHeader>
                                        <CardTitle>{note.title}</CardTitle>
                                        <CardDescription>{note.tagline}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{note.body}</CardDescription>
                                    </CardContent> 
                                </Card>
                        </div>
                    ))}
                    {openUpdateNote && <UpdateNote id={updateNoteId} Pinned={false} setOpenUpdateNote={setOpenUpdateNote}/>}
                    </div>
                    <div className="w-[20vw] block mx-auto">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem className="cursor-pointer" onClick={()=>{prevPage()}}>
                              <PaginationPrevious />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink>{currentPage}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="cursor-pointer" onClick={()=>{nextPage()}}>
                              <PaginationNext  />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                </div>
        </>
        }
    </section>
  )
}

export default Notes;