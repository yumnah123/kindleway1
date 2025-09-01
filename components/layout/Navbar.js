import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar(){
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="Logo" className="h-7 w-7" />
          <span className="font-semibold">Zakat</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/submit" className="nav-link">Submit</Link>
          <Link href="/admin" className="nav-link">Admin</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
