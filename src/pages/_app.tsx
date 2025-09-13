import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import MusicPlayer from '@/components/MusicPlayer';
import PokemonBackground from '@/components/PokemonBackground'; // ← Adicione

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
      <MusicPlayer />
    </FavoritesProvider>
  );
}