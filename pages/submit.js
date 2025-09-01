import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';

const UserForm = dynamic(() => import('../components/UserForm'), { ssr: false });

export default function SubmitPage() {
  const [submittedBy, setSubmittedBy] = useState('');

  return (
    <>
      <Head>
        <title>Zakat — Submit</title>
        <meta name="description" content="Zakat calculator and submission" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <div className="container max-w-2xl mx-auto py-10 space-y-6">
        {/* User name/email input */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Your Name or Email
          </label>
          <input
            type="text"
            placeholder="Enter your name or email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring focus:ring-indigo-500"
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            required
          />
        </div>

        {/* Zakat form */}
        <UserForm submittedBy={submittedBy} />
      </div>
    </>
  );
}
