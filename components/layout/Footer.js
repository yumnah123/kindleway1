export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="container py-6 text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Zakat Management. All rights reserved.
      </div>
    </footer>
  );
}
