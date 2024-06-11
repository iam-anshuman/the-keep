import { db } from "@/firebase/FirebaseConfig";
import { collection,getDocs,updateDoc,doc,setDoc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";

export type noteType = {
    id?:string;
    title:string;
    body:string;
    tagline:string;
    noteCreated?:any;
    Pinned:boolean;
}

export interface updateNoteType {
    id?: string;
    title?: string;
    body?: string;
    tagline?: string;
    noteCreated?: any;
    Pinned: boolean;
  }

export async function getTodos(){
    
    const notesData:noteType[] = [];
    const querySnapshot = await getDocs(collection(db, "notes"));
    querySnapshot.forEach((doc: DocumentData) => {
        const data = doc.data() as noteType;
        notesData.push({
            id:doc.id,
            title:data.title,
            body:data.body,
            tagline:data.tagline,
            noteCreated:data.noteCreated,
            Pinned:data.Pinned
        });
    });
    
    return notesData;
}

export async function addNote(note:noteType){
    const notesRef = collection(db, "notes");
    await setDoc(doc(notesRef), note);
}

export async function updatePinnedNotes(noteId:string,isPinned:boolean){
    
        // console.log(noteId,isPinned);
        const noteRef = doc(collection(db, "notes"), noteId);
        await updateDoc(noteRef, {
            Pinned: isPinned
        });
    
}

export async function updateNote({id,title,body,tagline,Pinned}:updateNoteType){

    const noteRef = doc(collection(db, "notes"), id);

    await updateDoc(noteRef, {
        title: title,
        body: body,
        tagline: tagline,
        noteCreated: Date.now(),
        Pinned: Pinned
    });
}
