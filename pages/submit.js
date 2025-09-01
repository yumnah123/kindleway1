import dynamic from 'next/dynamic';
import Head from 'next/head';
const UserForm = dynamic(() => import('../components/UserForm'), { ssr: false });

export default function SubmitPage() {
  return (
    <>
      <Head>
        <title>Zakat — Submit</title>
        <meta name="description" content="Zakat calculator and submission" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <UserForm />
    </>
  );
}
