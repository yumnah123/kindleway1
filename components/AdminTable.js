import { useEffect, useMemo, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Table, THead, TH, TR, TD } from './ui/Table';

export default function AdminTable({ password }) {
  const [rows, setRows] = useState([]);
  const [minNetAssets, setMinNetAssets] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedByFilter, setSubmittedByFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const load = async () => {
    setLoading(true);
    const q = new URLSearchParams();
    if (minNetAssets) q.set('minNetAssets', minNetAssets);
    if (fromDate) q.set('fromDate', fromDate);
    if (toDate) q.set('toDate', toDate);
    const res = await fetch('/api/admin/logs?' + q.toString(), { headers: { 'x-admin-pass': password }});
    const data = await res.json();
    setLoading(false);
    if (res.ok) setRows(data.rows);
    else alert(data.error || 'Failed to load');
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    let r = [...rows];
    if (submittedByFilter) {
      r = r.filter(x => String(x.submitted_by||'') === submittedByFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      r = r.filter(x =>
        String(x.submitted_by||'').toLowerCase().includes(s) ||
        String(x.net_assets||'').includes(s) ||
        String(x.zakaat||'').includes(s)
      );
    }
    r.sort((a,b)=>{
      const A = a[sortBy]; const B = b[sortBy];
      if (sortBy === 'created') return sortDir==='asc' ? new Date(A)-new Date(B) : new Date(B)-new Date(A);
      return sortDir==='asc' ? (A-B) : (B-A);
    });
    return r;
  }, [rows, search, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page-1)*pageSize;
  const view = filtered.slice(start, start+pageSize);

  const exportCsv = async () => {
    const q = new URLSearchParams();
    if (minNetAssets) q.set('minNetAssets', minNetAssets);
    if (fromDate) q.set('fromDate', fromDate);
    if (toDate) q.set('toDate', toDate);
    const res = await fetch('/api/admin/export?' + q.toString(), { headers: { 'x-admin-pass': password }});
    if (!res.ok) {
      const d = await res.json().catch(()=>({}));
      alert(d.error || 'Export failed');
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'zakat_logs.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const SortBtn = ({field,label}) => (
    <button className="underline-offset-2 hover:underline" onClick={()=>{
      if (sortBy===field) setSortDir(sortDir==='asc'?'desc':'asc');
      else { setSortBy(field); setSortDir('asc'); }
    }}>{label}{sortBy===field? (sortDir==='asc'?' ↑':' ↓'):''}</button>
  );

  return (
    <div className="space-y-6">
      <Card id="filters">
        <CardHeader>
          <h2 className="text-xl font-semibold">Filters</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <Input type="number" placeholder="Min Net Assets" value={minNetAssets} onChange={e=>setMinNetAssets(e.target.value)} />
            <Input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} />
            <Input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} />
            <Input placeholder="Search (submitted by / amount)" value={search} onChange={e=>setSearch(e.target.value)} className="md:col-span-2" />
            <select value={submittedByFilter} onChange={e=>setSubmittedByFilter(e.target.value)} className="input">
  <option value="">All Users</option>
  {[...new Set(rows.map(r=>r.submitted_by).filter(Boolean))].map(u=>(<option key={u} value={u}>{u}</option>))}
</select>
<Button onClick={()=>{setPage(1); load();}}>Apply</Button>
          </div>
        </CardContent>
      </Card>

      <Card id="dashboard">
        <CardHeader><h2 className="text-xl font-semibold">Zakat Records</h2></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <THead>
                <TR>
                  <TH><SortBtn field="created" label="Date" /></TH>
                  <TH><SortBtn field="net_assets" label="Net Assets" /></TH>
                  <TH><SortBtn field="zakaat" label="Zakat" /></TH>
                  <TH>Submitted By</TH>
                </TR>
              </THead>
              <tbody>
                {view.map((r, i) => (
                  <TR key={i}>
                    <TD>{new Date(r.created).toLocaleString()}</TD>
                    <TD>{r.net_assets}</TD>
                    <TD>{r.zakaat}</TD>
                    <TD>{r.submitted_by}</TD>
                  </TR>
                ))}
              </tbody>
            </Table>
          </div>
          {!view.length && (
            <div className="flex items-center justify-center py-10">
              <img src="/images/empty.svg" alt="No records" className="h-28 opacity-80" />
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">Page {page} of {totalPages}</div>
            <div className="flex gap-2">
              <button className="btn-ghost rounded-xl px-3 py-2" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
              <button className="btn-ghost rounded-xl px-3 py-2" disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card id="export">
        <CardHeader><h2 className="text-xl font-semibold">Export</h2></CardHeader>
        <CardContent>
          <select value={submittedByFilter} onChange={e=>setSubmittedByFilter(e.target.value)} className="input">
  <option value="">All Users</option>
  {[...new Set(rows.map(r=>r.submitted_by).filter(Boolean))].map(u=>(<option key={u} value={u}>{u}</option>))}
</select>
<Button onClick={exportCsv}>Download CSV</Button>
        </CardContent>
      </Card>
    </div>
  );
}
