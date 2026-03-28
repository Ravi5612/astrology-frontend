"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaComments, FaPhone, FaVideo, FaStar, FaArrowRight, FaCalendarXmark, FaCircle } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

// Mock Data for Sessions
const MOCK_SESSIONS = [
    {
        id: 1,
        astrologerName: "Acharya Vinod",
        astrologerImage: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "20 Dec 2025",
        time: "10:30 AM",
        duration: "30 mins",
        type: "Chat",
        status: "Completed",
        amount: "₹600",
        rating: 5,
    },
    {
        id: 2,
        astrologerName: "Sushmita Sen",
        astrologerImage: "https://randomuser.me/api/portraits/women/44.jpg",
        date: "22 Dec 2025",
        time: "02:00 PM",
        duration: "15 mins",
        type: "Call",
        status: "Scheduled",
        amount: "₹300",
        rating: null,
    },
    {
        id: 3,
        astrologerName: "Pt. Rahul Shastri",
        astrologerImage: "https://randomuser.me/api/portraits/men/11.jpg",
        date: "15 Dec 2025",
        time: "05:00 PM",
        duration: "45 mins",
        type: "Video",
        status: "Cancelled",
        amount: "₹900",
        rating: null,
    },
    {
        id: 4,
        astrologerName: "Tarot Anita",
        astrologerImage: "https://randomuser.me/api/portraits/women/68.jpg",
        date: "10 Dec 2025",
        time: "11:00 AM",
        duration: "20 mins",
        type: "Chat",
        status: "Completed",
        amount: "₹400",
        rating: 4,
    },
];

const SessionHistory = () => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredSessions =
        activeTab === "All"
            ? MOCK_SESSIONS
            : MOCK_SESSIONS.filter((session) => session.status === activeTab);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Chat":
                return <FaComments />;
            case "Call":
                return <FaPhone />;
            case "Video":
                return <FaVideo />;
            default:
                return <FaStar />;
        }
    };

    return (
        <div className="bg-[#fcfafc] min-h-screen font-display">
            {/* Header / Hero Section */}
            <section className="relative pt-32 pb-48 overflow-hidden bg-slate-950 text-white">
                {/* Celestial Background Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-30"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <HiOutlineSparkles className="text-orange-500 text-xs" />
                        <span className="text-[10px] font-black text-white/80 uppercase tracking-[.3em]">User Service History</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                        My <span className="text-orange-500 italic underline underline-offset-[12px] decoration-orange-500/20">Sessions</span>
                    </h1>
                    <p className="text-xl font-bold text-gray-400 max-w-xl mx-auto italic border-l-4 border-orange-500/20 pl-8 lg:border-l-0 lg:pl-0">
                        &quot;Explore your journey through past and upcoming consultations with the world&apos;s finest astral experts.&quot;
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 -mt-24 pb-32 relative z-10">
                {/* Premium Tabs Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/80 backdrop-blur-2xl p-2 rounded-[2.5rem] shadow-premium border border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        {["All", "Scheduled", "Completed", "Cancelled"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                                    activeTab === tab 
                                    ? "bg-slate-950 text-white shadow-2xl scale-105" 
                                    : "text-slate-400 hover:text-slate-950"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Session List */}
                <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                    {filteredSessions.length > 0 ? (
                        filteredSessions.map((session, idx) => (
                            <div 
                                key={session.id} 
                                className="group relative bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 animate-in fade-in slide-in-from-bottom-6"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                                    {/* Astrologer Info */}
                                    <div className="md:col-span-5 flex items-center gap-8">
                                        <div className="relative w-24 h-24 shrink-0 group-hover:scale-110 transition-transform duration-700">
                                            <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-indigo-500 rounded-full blur-[5px] group-hover:blur-[8px] transition-all duration-700 opacity-20 group-hover:opacity-40"></div>
                                            <div className="relative w-full h-full rounded-full border-2 border-white overflow-hidden shadow-2xl">
                                                <Image
                                                    src={session.astrologerImage}
                                                    alt={session.astrologerName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            {/* Type Badge */}
                                            <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-slate-950 text-white rounded-2xl flex items-center justify-center text-sm shadow-2xl border-2 border-white group-hover:bg-orange-600 transition-colors">
                                                {getTypeIcon(session.type)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-950 mb-1 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                                                {session.astrologerName}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-50"></span>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                                    {session.date} <span className="text-slate-200">|</span> {session.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Middle */}
                                    <div className="md:col-span-4 grid grid-cols-2 gap-8 border-y border-gray-50 md:border-y-0 md:border-x py-8 md:py-0">
                                        <div className="text-center md:text-left space-y-1">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Duration</p>
                                            <h6 className="text-lg font-black text-slate-950 tabular-nums uppercase">{session.duration}</h6>
                                        </div>
                                        <div className="text-center md:text-left space-y-1">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Paid Amount</p>
                                            <h6 className="text-lg font-black text-orange-600 tabular-nums uppercase">{session.amount}</h6>
                                        </div>
                                    </div>

                                    {/* Status & Action */}
                                    <div className="md:col-span-3 flex flex-col md:items-end gap-6">
                                        <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-500 ${
                                            session.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white" :
                                            session.status === "Scheduled" ? "bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-500 group-hover:text-white" :
                                            "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-500 group-hover:text-white"
                                        }`}>
                                            <FaCircle className={`text-[6px] animate-pulse ${session.status === "Completed" ? "text-emerald-500 group-hover:text-white" : session.status === "Scheduled" ? "text-amber-500 group-hover:text-white" : "text-rose-500 group-hover:text-white"}`} />
                                            {session.status}
                                        </div>

                                        <div className="w-full md:w-auto">
                                            {session.status === "Completed" && (
                                                <Link 
                                                    href={`/astrologer-details?id=${session.id}`} 
                                                    className="group/btn relative w-full inline-flex items-center justify-center gap-4 bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-orange-600 hover:-translate-y-1 active:scale-95 transition-all overflow-hidden"
                                                >
                                                    <span className="relative z-10">Rebook Expert</span>
                                                    <FaArrowRight className="relative z-10 text-[10px] group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            )}
                                            {session.status === "Scheduled" && (
                                                <button className="group/btn relative w-full inline-flex items-center justify-center gap-4 bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:-translate-y-1 active:scale-95 transition-all overflow-hidden shadow-orange-500/20">
                                                    <span className="relative z-10 font-black">Join Consultation</span>
                                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-gray-100">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-200">
                                <FaCalendarXmark size={48} />
                            </div>
                            <h4 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-4">No sessions found</h4>
                            <p className="text-lg text-slate-400 font-bold italic mb-12 max-w-sm mx-auto">You haven&apos;t booked any consultations in this category yet.</p>
                            <Link 
                                href="/our-astrologers" 
                                className="inline-flex items-center gap-6 bg-slate-950 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-orange-600 hover:-translate-y-1 active:scale-95 transition-all"
                            >
                                Book a Consultation <FaArrowRight />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Secure Badge Footer */}
                <div className="text-center mt-24 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                    <div className="inline-flex items-center gap-6 px-10 py-4 bg-white rounded-full border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <HiOutlineSparkles className="text-orange-500" />
                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">End-to-End Encrypted Logs</span>
                        </div>
                        <div className="w-1.5 h-6 bg-gray-100 rounded-full"></div>
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">ISO 27001 Certified System</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SessionHistory;
