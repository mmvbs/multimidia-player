"use client";

import { useEffect, useState } from "react";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";

export default function Home() {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(1);
  const [prevVolume, setPrevVolume] = useState<number>(1);
  const [gain, setGain] = useState<GainNode>();

  useEffect(() => {
    configAudio("WB.mp3");
    setVolume(0.5);
    setIsPlaying(false);
  }, []);

  const configAudio = (url: string) => {
    const newAudio = new Audio(url);
    setAudio(newAudio);

    const audioContext = new AudioContext();
    const media = audioContext.createMediaElementSource(newAudio);
    const newGain = audioContext.createGain();
    media.connect(newGain);
    newGain.connect(audioContext.destination);
    setGain(newGain);
  };

  const playPause = () => {
    if (isPlaying) pause();
    else play();
    setIsPlaying(!isPlaying);
  };

  const play = () => {
    if (audio) audio.play();
  };

  const pause = () => {
    if (audio) audio.pause();
  };

  const mudavol = (newValue: number) => {
    if (gain) {
      gain.gain.value = newValue;
    }
    setVolume(newValue);
  };

  const mutar = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      if (gain) {
        gain.gain.value = 0;
      }
    } else {
      setVolume(prevVolume);
      if (gain) {
        gain.gain.value = prevVolume;
      }
    }
  };

  return (
    <div className="bg-[rgb(15,19,22)] flex items-center justify-center h-screen">
      <div className="bg-[rgb(32,40,48)] h-[440px] w-[300px] rounded-[10px] flex flex-col items-center justify-center">
        <img className="h-[200px] w-[200px]" src="a.jpg" alt="" />
        <h1 className="text-white text-[16px] font-bold mt-4">Twin Flame</h1>
        <h3 className="text-[gray] text-[12px] font-bold mt-2">Weyes Blood</h3>
        <div className="w-[50%] mt-4">
          <div className="w-[100%] h-[4px] bg-[rgb(15,19,22)] rounded-full"></div>
          <div className="flex items-start justify-between text-[12px] text-[gray]">
            <h3>0:00</h3>
            <h3>4:42</h3>
          </div>
        </div>
        <div className="flex items-center justify-between w-[50%] mt-2">
          <h3 className="scale-x-[-1] cursor-pointer">▶▶</h3>
          <button
            className="text-white w-[36px] h-[36px] rounded-full bg-[#ff302e] flex items-center justify-center cursor-pointer"
            onClick={playPause}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <h3 className="cursor-pointer">▶▶</h3>
        </div>
        <div className="flex justify-between items-center w-[80%] mt-4">
          <button onClick={mutar}>
            {volume === 0 ? (
              <VolumeX className="cursor-pointer" />
            ) : (
              <Volume2 className="cursor-pointer" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="cursor-pointer w-[100px] accent-[#ff302e]"
            value={volume}
            onChange={(e) => mudavol(Number(e.target.value))}
          />
          <h3 className="text-[gray]">{Math.round(volume * 100)}%</h3>
        </div>
      </div>
    </div>
  );
}