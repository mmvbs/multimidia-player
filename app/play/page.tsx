    'use client';

    import { useEffect, useState } from "react";
    import Image from "next/image";
    import { Play as PlayIcon, Pause, VolumeX, Volume2, FastForward, StepForward } from "lucide-react";
    import musics from "../data/data";

    export default function Player() {
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState<number>(0.5);
    const [prevVolume, setPrevVolume] = useState<number>(0.5);
    const [gain, setGain] = useState<GainNode>();
    const [index, setIndex] = useState<number>(0);
    const [tempo, setTempo] = useState<number>(0);
    const [tempoatual, setTempoatual] = useState<number>(0);

    const currentMusic = musics[index];

    useEffect(()=>{
        configurarAudio(0);
        }, []);

    useEffect(() => {
        if  (isPlaying) {
            audio?.play()
        }
        if (audio) {
            audio.onloadedmetadata = () => {
            setTempo(audio.duration);
            }
            audio.ontimeupdate = () => {
            setTempoatual(audio.currentTime);
            }
            audio.onended = () => {
            configurarAudio(index + 1);
            }
        }
    }, [audio]);

    const configurarAudio = (index: number) => {
        if (audio && isPlaying) {
        audio.pause();
        }
        const novoindice = index % musics.length;
        const newAudio = new Audio(musics[novoindice].url);
        setAudio(newAudio);
        setIndex(novoindice);
        const audioContext = new AudioContext();
        const media = audioContext.createMediaElementSource(newAudio);
        const newGain = audioContext.createGain();
        media.connect(newGain);
        newGain.connect(audioContext.destination);
        setGain(newGain);
    };
    const configTime = (value:number) => { 
        if (audio) {
        audio.currentTime = value;
        setTempoatual(value);
        }
    }
    const formatTime = (value: number) => {
        const minutes = Math.trunc(value / 60)
        const seconds = Math.trunc(value % 60)
        return `${('0'+minutes).slice(-2)}:${('0'+seconds).slice(-2)}`
    }
    const playPause = () => {
        if (!audio) return;

        if (isPlaying) {
        audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const mudarVolume = (novoVolume: number) => {
        if (gain) {
        gain.gain.value = novoVolume;
        }
        setVolume(novoVolume);
    };

    const mutar = () => {
        if (volume > 0) {
        setPrevVolume(volume);
        mudarVolume(0);
        } else {
        mudarVolume(prevVolume);
        }
    };

    const avancarMusica = () => {
        configurarAudio(index + 1);
    };
    const voltarMusica = () => {
        configurarAudio(index - 1);
    }

    return (
        <div className="bg-[rgb(15,19,22)] flex items-center justify-center h-screen">
        <div className="bg-[rgb(32,40,48)] h-[440px] w-[300px] rounded-[10px] flex flex-col items-center justify-center">
            <Image
            src={currentMusic.image}
            alt={currentMusic.name}
            width={200}
            height={200}
            />
            <h1 className="text-white text-[16px] font-bold mt-4">{currentMusic.name}</h1>
            <h3 className="text-[gray] text-[12px] font-bold mt-2">{currentMusic.artista}</h3>

            <div className="w-[50%] mt-4">
            <div className="">
            </div>
                
                <input
                type="range"
                min="0"
                max={tempo}
                step="0.01"
                className="cursor-pointer w-full accent-[#0f1316]"
                value={tempoatual}
                onChange={(e) => configTime(Number(e.target.value))}
            />
            <div className="flex items-start justify-between text-[12px] text-[gray]">
                <h3>{`${formatTime(tempoatual)}`}</h3>
                <h3>{`${formatTime(tempo)}`}</h3>
            </div>
            </div>

            <div className="flex items-center justify-between w-[80%] mt-2">
            <button
                onClick={voltarMusica}>
                    <StepForward className="scale-x-[-1] cursor-pointer" />
            </button>
            <FastForward className="scale-x-[-1] cursor-pointer" />

            <button
                className="text-white w-[36px] h-[36px] rounded-full bg-[#ff302e] flex items-center justify-center cursor-pointer"
                onClick={playPause}
            >
                {isPlaying ? <Pause /> : <PlayIcon />}
            </button>
            <FastForward className="cursor-pointer" />
            <button
                onClick={avancarMusica}>
            <StepForward className="cursor-pointer" />
            </button>
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
                onChange={(e) => mudarVolume(Number(e.target.value))}
            />

            <h3 className="text-[gray]">{Math.round(volume * 100)}%</h3>
            </div>
        </div>
        </div>
    );
    }
