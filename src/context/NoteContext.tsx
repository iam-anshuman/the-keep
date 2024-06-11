'use client'
import React from "react";
import { createContext,useContext,useEffect, useReducer } from "react";
import {noteType,getTodos} from "@/lib/notes-api"

interface NoteContextType {
    notes: noteType[];
    dispatch: React.Dispatch<any>;
}


const NoteContext = createContext<NoteContextType | undefined>(undefined);

const initialState:noteType[] = [];

const reducer = (state:noteType[],action:any) => {
    switch(action.type){
        case 'GET_NOTES':
            return action.payload;        
        case 'ADD_NOTE':
            return [...state,action.payload];
        case 'UPDATE_NOTE':
            return state.map((note) => note.id === action.payload.id ? action.payload : note);
        case 'REMOVE_NOTE':
            return state.filter((note) => note.title !== action.payload);
        default:
            return state;
    }
}


export const NoteProvider = ({children}: {children: React.ReactNode})=>{

    const [notes,dispatch] = useReducer(reducer,initialState);
    // console.log("Notes: ",notes);

    useEffect(() => {
        async function fetchNotes(){
            const notesData = await getTodos();
            dispatch({type:'GET_NOTES',payload:notesData});
        }
        fetchNotes();
    },[]);

    return (
        <NoteContext.Provider value={{notes,dispatch}}>
            {children}
        </NoteContext.Provider>
    )
}


export const useNote = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNote must be used within a NoteProvider');
    }
    return context;
};