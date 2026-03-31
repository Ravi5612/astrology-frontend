"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Monitor, Sparkles, Star, Clock, ChevronDown, Loader2, Heart } from "lucide-react";
import http from "@/lib/fetch-handler";
import { API_ROUTES } from "@/lib/api-routes";
import { ExpertPuja } from "@/lib/types/puja";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

const LikeButton = ({ pujaId, initialLikes }: { pujaId: number; initialLikes: number }) => {
    const { isClientAuthenticated } = useAuthStore();
    const { isPujaInWishlist } = useWishlistStore();
    const { toggleLike } = useWishlist();
    
    const isLiked = isPujaInWishlist(pujaId);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isClientAuthenticated) {
            toast.error("Please login to like puja");
            return;
        }

        toggleLike({ id: pujaId, type: "puja", isLiked });
    };

    return (
        <button 
            type="button"
            onClick={handleLike}
            className="flex items-center gap-1.5 transition-all active:scale-110 hover:opacity-80"
        >
            <Heart 
                className={`w-5 h-5 transition-all ${isLiked ? "fill-[#f54a00] text-[#f54a00]" : "text-gray-400 group-hover:text-gray-600"}`} 
            />
            <span className={`text-xs font-black ${isLiked ? "text-[#f54a00]" : "text-gray-400"}`}>
                {initialLikes + (isLiked ? 1 : 0)}
            </span>
        </button>
    );
};

const OnlinePujaPage = () => {
    const [pujas, setPujas] = useState<ExpertPuja[]>([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState<'all' | 'online' | 'home_visit'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPujaName, setSelectedPujaName] = useState("All Pujas");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { isClientAuthenticated } = useAuthStore();
    const { fetchWishlist } = useWishlistStore();

    useEffect(() => {
        const fetchPujasItems = async () => {
            setLoading(true);
            const [res, error] = await http.get<ExpertPuja[]>(API_ROUTES.EXPERT.GET_ALL_PUJAS);
            
            if (error) {
                console.error("Failed to fetch pujas:", error);
                setPujas([]);
            } else {
                setPujas(res || []);
            }
            setLoading(false);
        };
        fetchPujasItems();
    }, []);

    useEffect(() => {
        fetchWishlist(isClientAuthenticated);
    }, [isClientAuthenticated, fetchWishlist]);

    const uniquePujaNames = ["All Pujas", ...Array.from(new Set(pujas.map(p => p.name)))];

    const filteredPujas = pujas.filter(puja => {
        const matchesType = typeFilter === 'all' || 
                            (typeFilter === 'online' && puja.is_online) || 
                            (typeFilter === 'home_visit' && puja.is_home_visit);
        const matchesSearch = puja.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (puja.expert?.user?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (puja.districts?.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())));
        const matchesDropdown = selectedPujaName === "All Pujas" || puja.name === selectedPujaName;
        return matchesType && matchesSearch && matchesDropdown;
    });

    const getMinCost = (puja: ExpertPuja) => {
        const costs = [
            puja.is_online ? puja.online_cost : Infinity,
            puja.is_home_visit ? puja.home_visit_without_samagri_cost : Infinity,
            puja.is_home_visit ? puja.home_visit_with_samagri_cost : Infinity
        ].filter(c => c > 0 && c !== Infinity);
        return costs.length > 0 ? Math.min(...costs) : 0;
    };

    return (
        <div className="min-h-screen bg-[#301118]">
            {/* Header Section */}
            <div className="bg-[#301118] pt-24 pb-12 px-4 border-b border-white/5 shadow-2xl">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm font-bold mb-6 animate-fade-in border border-orange-500/20">
                        <Sparkles className="w-4 h-4" />
                        Sacred Vedic Rituals
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Experience the Divine with <span className="text-orange-500">Sacred Pujas</span>
                    </h1>
                    <p className="text-orange-100/60 max-w-2xl mx-auto text-lg font-medium">
                        Connect with highly experienced Vedic pandits for personalized rituals at your home or online.
                    </p>
                </div>
            </div>

            {/* Sticky Filters Section */}
            <div className="sticky top-20 z-40 bg-[#301118]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl py-4 px-4 transition-all">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6">
                    
                    {/* Toggle Switch */}
                    <div className="flex bg-black/30 p-1.5 rounded-2xl w-full lg:w-auto shadow-inner border border-white/5">
                        <button 
                            onClick={() => setTypeFilter('all')}
                            className={`flex-1 lg:flex-none lg:px-6 py-2 rounded-xl text-sm font-bold transition-all ${typeFilter === 'all' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40 transform scale-[1.02]' : 'text-gray-400 hover:text-white'}`}
                        >
                            All
                        </button>
                        <button 
                            onClick={() => setTypeFilter('online')}
                            className={`flex-1 lg:flex-none lg:px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${typeFilter === 'online' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40 transform scale-[1.02]' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Monitor className="w-4 h-4" />
                            Online
                        </button>
                        <button 
                            onClick={() => setTypeFilter('home_visit')}
                            className={`flex-1 lg:flex-none lg:px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${typeFilter === 'home_visit' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40 transform scale-[1.02]' : 'text-gray-400 hover:text-white'}`}
                        >
                            <MapPin className="w-4 h-4" />
                            Home Visit
                        </button>
                    </div>

                    {/* Search & Dropdown Group */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full flex-grow">
                        {/* Search Bar */}
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500/50" />
                            <input 
                                type="text"
                                placeholder="Search by puja, pandit, or district..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 text-white rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-medium placeholder:text-gray-500 shadow-2xl"
                            />
                        </div>

                        {/* Puja Dropdown */}
                        <div className="relative w-full sm:w-64">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-black/40 border border-white/10 rounded-2xl focus:ring-4 focus:ring-orange-500/20 outline-none font-bold text-gray-300 shadow-2xl transition-all"
                            >
                                <span className="truncate">{selectedPujaName}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-full bg-[#301118] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 py-2 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                                    {uniquePujaNames.map((name) => (
                                        <button
                                            key={name}
                                            onClick={() => {
                                                setSelectedPujaName(name);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-orange-600 hover:text-white transition-colors ${selectedPujaName === name ? 'text-orange-500 bg-black/20' : 'text-gray-400'}`}
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto py-12 px-4 pb-32">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                        <p className="text-orange-200/40 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Invoking Divine Blessings</p>
                    </div>
                ) : filteredPujas.length === 0 ? (
                    <div className="text-center py-32 bg-black/20 rounded-3xl border border-white/5 shadow-2xl">
                        <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                            <Search className="w-10 h-10 text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">No Pujas Found</h2>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        <button 
                            onClick={() => {
                                setTypeFilter('all');
                                setSearchQuery("");
                                setSelectedPujaName("All Pujas");
                            }}
                            className="mt-6 px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all active:scale-95 shadow-lg shadow-orange-900/40 hover:translate-y-[-2px]"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {filteredPujas.map((puja) => (
                            <Link 
                                key={puja.id} 
                                href={`/online-puja/${puja.id}`}
                                className="group flex flex-col bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(251,146,60,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer no-underline"
                            >
                                {/* Puja Image */}
                                <div className="relative h-44 sm:h-48 bg-gray-100 overflow-hidden shrink-0">
                                     {puja.puja_image_url ? (
                                        <Image 
                                            src={puja.puja_image_url} 
                                            alt={puja.name} 
                                            fill 
                                            className="object-cover transition-transform group-hover:scale-105 duration-700"
                                        />
                                     ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-orange-50">
                                            <Sparkles className="w-10 h-10 text-orange-200" />
                                        </div>
                                     )}
                                     
                                     {/* Availability Badges */}
                                     <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                                        {puja.is_online && (
                                            <span className="px-2 py-0.5 bg-blue-600/90 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-wider rounded-md border border-blue-400/30">
                                                Online
                                            </span>
                                        )}
                                        {puja.is_home_visit && (
                                            <span className="px-2 py-0.5 bg-emerald-600/90 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-wider rounded-md border border-emerald-400/30">
                                                Home visit
                                            </span>
                                        )}
                                     </div>
                                </div>
                                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                    {/* Header: Name + Like */}
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h3 className="text-lg font-black text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                                            {puja.name}
                                        </h3>
                                        <div className="pt-0.5">
                                            <LikeButton pujaId={puja.id} initialLikes={puja.total_likes || 0} />
                                        </div>
                                    </div>

                                    {/* Expert Info & Rating */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <div className="relative w-5 h-5 rounded-md overflow-hidden ring-1 ring-gray-100 shrink-0">
                                                {puja.expert?.user?.avatar ? (
                                                    <Image src={puja.expert.user.avatar} alt="Pandit" fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-[#301118]/80 text-white text-[8px] flex items-center justify-center font-bold">
                                                        P
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                                                By {puja.expert?.user?.name || "Verified Pandit"}
                                            </span>
                                        </div>
                                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                        <div className="flex items-center gap-0.5 text-yellow-600">
                                            <Star className="w-3 h-3 fill-yellow-600" />
                                            <span className="text-[11px] font-black">{puja.expert?.rating || "4.8"}</span>
                                        </div>
                                    </div>

                                    {/* Description (Reduced vertical space) */}
                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-[40px] mb-4">
                                        {puja.description || "Divine Vedic ceremony performed with full rituals and sacred mantras for spiritual prosperity."}
                                    </p>

                                    {/* Footer: Price + Action (More compact) */}
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-0.5">Dakshina</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-black text-gray-900">₹{getMinCost(puja)}</span>
                                            </div>
                                        </div>

                                        <div className="px-4 py-2 bg-[#1a1a1a] text-white text-xs font-bold rounded-xl hover:bg-orange-600 shadow-md transition-all active:scale-95 flex items-center gap-1.5 group/btn">
                                            Details
                                            <Sparkles className="w-3.5 h-3.5 group-hover/btn:animate-spin-slow" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                .animate-spin-slow { animation: spin 3s linear infinite; }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default OnlinePujaPage;
