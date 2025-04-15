
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      
      {/* Content wrapper to push footer down if content is short */}
      <main className="flex-grow w-full flex justify-center">
        {children}
      </main>

      <Footer />
    </div>
  );
}
