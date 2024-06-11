'use client'
import ModeToggle from "./ModeToggle";

function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white p-4'>
        <div className='mx-4 text-2xl font-semibold font-serif '>THE KEEP</div>
        <div className="mx-4">
            <ModeToggle/>
        </div>
    </nav>
  )
}

export default Navbar;