'use client';

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true); // Já inicia tocando
  const [volume, setVolume] = useState(0.2); // Volume baixo
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Configura volume e tenta tocar automaticamente
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      // Tenta tocar automaticamente (pode ser bloqueado pelo navegador)
      const tryPlay = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play bloqueado. Clique para tocar.');
          setIsPlaying(false);
        }
      };
      
      tryPlay();
    }
  }, [volume]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Erro ao tocar música:', error);
        });
      }
      setIsPlaying(!isPlaying);
      setUserInteracted(true);
    }
  };

  return (
    <>

      <audio 
        ref={audioRef} 
        loop 
        preload="metadata"
      >
        <source src="https://www.youtube.com/embed/yqncMkxHjBQ?si=lXNOEuyzzO1_gejc&autoplay=1&mute=0" type="audio/mpeg" />
      </audio>


      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-50">
        <button
          onClick={toggleMusic}
          className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 flex items-center gap-2"
        >
          {isPlaying ? '🔇 Pausar' : '🔊 Tocar'}
        </button>
      </div>
    </>
  );
}