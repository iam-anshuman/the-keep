"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addNote } from "@/lib/notes-api";
import { useNote } from "@/context/NoteContext";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
   title: z.string().min(3,{
    message: "Title must be atleast 3 characters long"
   }),
    body: z.string().min(3,{
      message: "Body must be atleast 3 characters long"
    }),
    tagline: z.string().min(3,{
      message: "Tagline must be atleast 3 characters long"
    }),
    Pinned: z.boolean(),
})



export default function ProfileForm({openAddNote,setOpenAddNote}: {openAddNote:boolean,setOpenAddNote:React.Dispatch<React.SetStateAction<boolean>>}) {

  const { dispatch } = useNote();
  const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: "",
            body: "",
            tagline: "",
            Pinned: false,
        }
    })

    async function onSubmit(data: z.infer<typeof formSchema>,error: any) {
        
        await addNote({
            title: data.title,
            body: data.body,
            tagline: data.tagline,
            Pinned: data.Pinned,
            noteCreated: new Date(),
        });
        dispatch({type:'ADD_NOTE',payload:{
            title: data.title,
            body: data.body,
            tagline: data.tagline,
            Pinned: data.Pinned,
            noteCreated: new Date(),
        }});
        setOpenAddNote(false);
        if(error){
          toast({
            title: "Error",
            description: error.message,
            duration: 2000,
          });
        }
    }
  return (
    <Form {...form}>
        <CircleX height={40} width={40} strokeWidth={1.5} className="absolute top-2 right-2 cursor-pointer text-black dark:text-white" onClick={()=>setOpenAddNote(false)} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[60vw] bg-gray-300 border-black dark:bg-gray-500 text-black dark:text-white dark:border-white px-14 py-16">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Body..." {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input placeholder="Tagline..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-black/70 rounded " type="submit">Add Note</Button>
      </form>
    </Form>
  )
}
