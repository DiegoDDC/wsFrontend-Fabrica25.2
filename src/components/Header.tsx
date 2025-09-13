import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-red-600 text-white p-4 border-b-4 border-red-800 shadow-lg">
      <div className="container mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 tracking-wide">
          POKÉDEX
        </h1>
        

        <nav className="flex justify-center gap-8 text-sm md:text-base">
          <Link 
            href="/" 
            className="hover:text-yellow-300 transition-colors duration-200 font-semibold"
          >
            INÍCIO
          </Link>
          <Link 
            href="/favorites" 
            className="hover:text-yellow-300 transition-colors duration-200 font-semibold"
          >
            FAVORITOS
          </Link>
        </nav>
      </div>
    </header>
  );
}