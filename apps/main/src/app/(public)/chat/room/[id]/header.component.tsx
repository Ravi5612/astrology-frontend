"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import * as LucideIcons from "lucide-react";

const Image = NextImage as any;
const {
    ChevronLeft, Clock, Home, User: UserIcon, Sun, Moon, AlertCircle
} = LucideIcons as any;

type HeaderProps = {
    router: any;
    expertData: any;
    isFree: boolean;
    sessionStatus: string;
    formatTime: (time: number) => string;
    elapsedTime: number;
    timeLeft: number;
    handleEndChat: () => void;
    isDarkMode: boolean;
    setIsDarkMode: (val: boolean) => void;
};

export default function Header({
    router,
    expertData,
    isFree,
    sessionStatus,
    formatTime,
    elapsedTime,
    timeLeft,
    handleEndChat,
    isDarkMode,
    setIsDarkMode
}: HeaderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!expertData) return null;

    return (
        <header className="bg-[#fd6410] px-2 md:px-8 py-1.5 flex items-center justify-between sticky top-0 z-20 shadow-lg border-b border-black/10 shrink-0 w-full overflow-hidden">
            <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
                <button onClick={() => router.back()} className="p-1 md:p-1.5 hover:bg-black/10 rounded-xl transition-all active:scale-90 flex flex-col items-center">
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-tighter text-white">Back</span>
                </button>
                <div className="w-px h-6 bg-black/10 mx-0.5 md:mx-1"></div>
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 overflow-hidden relative shadow-sm shrink-0">
                        <Image src={(expertData as any).image} alt={expertData.name} width={40} height={40} className="object-cover" />
                    </div>
                    <div className="hidden sm:block shrink-0">
                        <h1 className="font-bold text-sm leading-none text-white flex items-center gap-2">
                            {expertData.name}
                            {isFree && <span className="bg-white text-[#fd6410] px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter shadow-sm animate-bounce">Free Chat</span>}
                        </h1>
                        <p className="text-[9px] text-white/80 flex items-center gap-1 mt-0.5">
                            {sessionStatus === 'active' ? 'Live Session' : sessionStatus === 'completed' ? 'Session Ended' : 'Waiting for Expert'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1.5 md:gap-8 shrink-0">
                {/* Timers Section */}
                {sessionStatus === 'active' && (
                    <div className="flex items-center gap-2 md:gap-5">
                        {/* Active Duration - High Contrast */}
                        <div className="hidden sm:flex flex-col items-end gap-0.5">
                            <span className="text-[9px] font-black uppercase tracking-[0.1em] text-white/80 whitespace-nowrap leading-none">Elapsed</span>
                            <span className="text-sm md:text-base font-black tabular-nums text-white drop-shadow-sm leading-none">
                                {mounted ? formatTime(elapsedTime) : "--:--"}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-8 bg-white/20 hidden sm:block"></div>

                        {/* Time Left Capsule Design */}
                        <div className="bg-black/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 md:gap-4 border border-white/30 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="p-1 md:p-1.5 bg-white/10 rounded-full">
                                <Clock className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="flex flex-col items-start gap-0.5">
                                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] text-white/80 whitespace-nowrap leading-none">
                                    {isFree ? 'Free Time' : 'Time Left'}
                                </span>
                                <span className="text-xs md:text-base font-black tabular-nums text-white drop-shadow-sm leading-none">
                                    {mounted ? formatTime(timeLeft) : "--:--"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {sessionStatus === 'active' && (
                    <button
                        onClick={handleEndChat}
                        className="bg-white text-red-600 hover:bg-red-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full md:rounded-xl font-bold text-xs md:text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        <AlertCircle className="w-4 h-4 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">End Session</span>
                    </button>
                )}

                <div className="w-px h-6 bg-black/10 mx-1 hidden md:block"></div>

                {/* Nav Buttons & Toggle */}
                <div className="flex items-center gap-1">
                    <button onClick={() => router.push('/')} className="p-1.5 hover:bg-black/10 rounded-xl transition-all active:scale-95 flex flex-col items-center gap-0.5 text-white">
                        <Home className="w-4 h-4" />
                        <span className="text-[8px] font-bold uppercase">Home</span>
                    </button>
                    <button onClick={() => router.push('/profile')} className="hidden sm:flex p-2 hover:bg-black/10 rounded-xl transition-all active:scale-95 flex-col items-center gap-0.5 text-white">
                        <UserIcon className="w-4 h-4" />
                        <span className="text-[8px] font-bold uppercase">Profile</span>
                    </button>
                    <div className="w-px h-5 bg-black/10 mx-1 hidden sm:block"></div>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="hidden sm:flex w-10 h-10 bg-black/20 hover:bg-black/30 rounded-full items-center justify-center transition-all active:scale-90 shadow-inner"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-white" />}
                    </button>
                </div>
            </div>
        </header>
    );
}
