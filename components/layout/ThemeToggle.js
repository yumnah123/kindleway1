import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle(){
  const [dark, setDark] = useState(false);
  useEffect(()=>{
    const stored = localStorage.getItem('theme') === 'dark';
    setDark(stored);
    document.documentElement.classList.toggle('dark', stored);
  },[]);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  return (
    <button onClick={toggle} className="btn-ghost rounded-xl px-3 py-2" aria-label="Toggle theme">
      {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
    </button>
  );
}
