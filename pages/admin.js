import { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import AdminSidebar from '../components/layout/AdminSidebar';

const AdminTable = dynamic(() => import('../components/AdminTable'), { ssr: false });

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  return (
    <>
      <Head>
        <title>Zakat — Admin</title>
        <meta name="description" content="Admin dashboard for Zakat records" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      {!ok ? (
        <div className="container py-16">
          <div className="max-w-xl mx-auto card p-6">
            <h1 className="text-2xl font-semibold mb-2">Admin Login</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-4">Enter the admin password to access the dashboard.</p>
            <div className="flex gap-3">
              <Input type="password" placeholder="Admin password" value={password} onChange={e=>setPassword(e.target.value)} />
              <Button onClick={()=>setOk(true)}>Enter</Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Default is <b>123</b> or set <code>ADMIN_PASSWORD</code> in env.</p>
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-56px-56px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-y-auto p-6">
            <AdminTable password={password} />
          </div>
        </div>
      )}
    </>
  );
}
