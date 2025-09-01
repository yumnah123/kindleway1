export function Table({children}){return <table className="table w-full border-separate border-spacing-0">{children}</table>}
export function THead({children}){return <thead className="bg-slate-50 dark:bg-slate-700/40">{children}</thead>}
export function TH({children}){return <th className="text-left text-sm font-semibold px-4 py-3 border-b border-slate-200 dark:border-slate-700">{children}</th>}
export function TR({children}){return <tr className="odd:bg-white even:bg-slate-50 dark:odd:bg-slate-800 dark:even:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700">{children}</tr>}
export function TD({children}){return <td className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 text-sm">{children}</td>}
