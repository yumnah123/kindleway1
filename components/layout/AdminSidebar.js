import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, Filter, FileDown, Users, BarChart3, Menu } from 'lucide-react';

export default function AdminSidebar(){
  const [open, setOpen] = useState(true);
  return (
    <aside className={`${open?'w-64':'w-16'} transition-all duration-300 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900`}>
      <div className="flex items-center justify-between px-3 h-14 border-b border-slate-200 dark:border-slate-800">
        <button className="btn-ghost" onClick={()=>setOpen(!open)} aria-label="Toggle sidebar"><Menu className="h-5 w-5"/></button>
        {open && <span className="text-sm text-slate-600 dark:text-slate-300">Admin</span>}
      </div>
      <nav className="py-3">
        <Link className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="#dashboard"><LayoutGrid className="h-4 w-4"/> {open&&'Dashboard'}</Link>
        <Link className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="#filters"><Filter className="h-4 w-4"/> {open&&'Filters'}</Link>
        <Link className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="#export"><FileDown className="h-4 w-4"/> {open&&'Export'}</Link>
        <Link className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="#users"><Users className="h-4 w-4"/> {open&&'Users'}</Link>
        <Link className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800" href="#reports"><BarChart3 className="h-4 w-4"/> {open&&'Reports'}</Link>
      </nav>
    </aside>
  );
}
