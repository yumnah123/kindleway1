import '../styles/globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1"><Component {...pageProps} /></main>
      <Footer />
    </div>
  );
}
