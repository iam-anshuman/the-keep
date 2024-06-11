import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })
import Notes from "@/components/Notes";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Notes/>
    </>
  );
}
