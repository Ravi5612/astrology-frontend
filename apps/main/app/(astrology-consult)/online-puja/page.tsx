"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Monitor, Filter, Sparkles, Star, Clock, ListFilter, ChevronDown, Loader2, X } from "lucide-react";
import http from "@/lib/fetch-handler";
import { API_ROUTES } from "@/lib/api-routes";
import { ExpertPuja } from "@/lib/types/puja";
import Image from "next/image";
import Link from "next/link";

const OnlinePujaPage = () => {
    const [pujas, setPujas] = useState<ExpertPuja[]>([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState<'all' | 'online' | 'home_visit'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPujaName, setSelectedPujaName] = useState("All Pujas");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDetails, setShowDetails] = useState<ExpertPuja | null>(null);

    useEffect(() => {
        if (showDetails) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showDetails]);

    useEffect(() => {
        const fetchPujas = async () => {
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
        fetchPujas();
    }, []);

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                        {filteredPujas.map((puja) => (
                            <div 
                                key={puja.id} 
                                onClick={() => setShowDetails(puja)}
                                className="group flex flex-col bg-white rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(251,146,60,0.2)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                            >
                                {/* Puja Image */}
                                <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden">
                                     {puja.puja_image_url ? (
                                        <Image 
                                            src={puja.puja_image_url} 
                                            alt={puja.name} 
                                            fill 
                                            className="object-cover transition-transform group-hover:scale-110 duration-700"
                                        />
                                     ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-orange-50">
                                            <Sparkles className="w-12 h-12 text-orange-200" />
                                        </div>
                                     )}
                                     
                                     {/* Availability Badges */}
                                     <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                        {puja.is_online && (
                                            <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider rounded-lg border border-blue-400/30">
                                                Online
                                            </span>
                                        )}
                                        {puja.is_home_visit && (
                                            <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider rounded-lg border border-emerald-400/30">
                                                Home Visit
                                            </span>
                                        )}
                                     </div>
                                </div>

                                <div className="p-7 flex flex-col h-full">
                                    {/* Pandit Info */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div 
                                            className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md ring-2 ring-white ring-offset-2 ring-offset-orange-50 transition-transform group-hover:scale-110 duration-500 shrink-0"
                                            style={{ backgroundColor: '#301118' }}
                                        >
                                            {puja.expert?.user?.avatar ? (
                                                <Image 
                                                    src={puja.expert.user.avatar} 
                                                    alt={puja.expert.user.name || puja.expert?.name || "Expert"} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg opacity-80">
                                                    {(puja.expert?.user?.name || puja.expert?.name || "E").charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-gray-900 line-clamp-1">
                                                {puja.expert?.user?.name || puja.expert?.name || "Verified Pandit"}
                                            </h4>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-yellow-50 text-yellow-700 rounded-lg text-[10px] font-black border border-yellow-100">
                                                    <Star className="w-2.5 h-2.5 fill-yellow-600" />
                                                    {puja.expert?.rating || "4.8"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Puja Details */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-orange-600 transition-colors">
                                            {puja.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-[40px] mb-4">
                                            {puja.description || "Divine Vedic ceremony performed with full rituals and mantras for spiritual prosperity."}
                                        </p>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-xl">
                                                <Clock className="w-4 h-4 text-orange-400" />
                                                <span className="text-xs font-bold text-gray-700">{puja.min_duration_hours}-{puja.max_duration_hours}h</span>
                                            </div>
                                            {puja.is_home_visit && (
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-xl">
                                                    <MapPin className="w-4 h-4 text-green-400" />
                                                    <span className="text-xs font-bold text-gray-700">{puja.districts?.length || 0} Districts</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Dakshina from</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-black text-gray-900">₹{getMinCost(puja)}</span>
                                            </div>
                                        </div>
                                        <Link 
                                            href={`/astrologer/${puja.expert_id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-2xl hover:bg-orange-600 shadow-lg shadow-gray-200 hover:shadow-orange-200 transition-all active:scale-95 flex items-center gap-2 group/btn"
                                        >
                                            Book
                                            <Sparkles className="w-4 h-4 group-hover/btn:animate-spin-slow" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Puja Details Modal */}
            {showDetails && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setShowDetails(null)}>
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="relative h-32 sm:h-44 bg-[#301118]">
                            <button 
                                onClick={() => setShowDetails(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6 pb-8">
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-2.5 w-fit">
                                    {showDetails.is_online && showDetails.is_home_visit ? "Online + Visit" : showDetails.is_online ? "Online" : "Home Visit"} Ritual
                                </div>
                                <h3 className="text-3xl font-black text-white leading-tight">{showDetails.name}</h3>
                                <p className="text-orange-200/80 text-sm font-bold mt-1">Sacred ceremony by {showDetails.expert?.user?.name || showDetails.expert?.name}</p>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-7 space-y-7 max-h-[55vh] overflow-y-auto custom-popup-scroll scroll-smooth">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="p-5 bg-orange-50/50 rounded-3xl border border-orange-100/50 transition-colors hover:bg-orange-50">
                                    <div className="flex items-center gap-2.5 mb-1.5 text-orange-600">
                                        <Clock className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-800/40">Expected Time</span>
                                    </div>
                                    <p className="text-xl font-black text-gray-900 tracking-tight">{showDetails.min_duration_hours}-{showDetails.max_duration_hours} Hours</p>
                                </div>
                                <div className="p-5 bg-blue-50/50 rounded-3xl border border-blue-100/50 transition-colors hover:bg-blue-50">
                                    <div className="flex items-center gap-2.5 mb-1.5 text-blue-600">
                                        <Monitor className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-800/40">Mode Avail.</span>
                                    </div>
                                    <p className="text-xl font-black text-gray-900 tracking-tight">
                                        {showDetails.is_online && showDetails.is_home_visit ? "All Modes" : showDetails.is_online ? "Remote" : "In-Person"}
                                    </p>
                                </div>
                            </div>

                            {/* Significance */}
                            <div>
                                <h5 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2.5 opacity-40">
                                    <Sparkles className="w-4 h-4 text-orange-500" />
                                    The Significance
                                </h5>
                                <p className="text-base text-gray-600 leading-relaxed font-medium">
                                    {showDetails.description || "A comprehensive Vedic ceremony conducted with traditional protocols to invoke divine blessings into the devotee's life."}
                                </p>
                            </div>

                            {/* Samagri List */}
                            {showDetails.samagri_list && showDetails.samagri_list.length > 0 && (
                                <div>
                                    <h5 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2.5 opacity-40">
                                        <Filter className="w-4 h-4 text-orange-500" />
                                        Required Samagri
                                    </h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {showDetails.samagri_list.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-3.5 px-5 bg-gray-50/50 rounded-2xl text-base border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
                                                <span className="font-bold text-gray-700">{item.name}</span>
                                                <span className="text-[11px] font-black text-orange-600 uppercase bg-white px-2.5 py-1 rounded-lg border border-orange-100 shadow-sm">{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Districts for Home Visit */}
                            {showDetails.is_home_visit && showDetails.districts && showDetails.districts.length > 0 && (
                                <div>
                                    <h5 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2.5 opacity-40">
                                        <MapPin className="w-4 h-4 text-green-500" />
                                        Service Areas (Districts)
                                    </h5>
                                    <div className="flex flex-wrap gap-2.5">
                                        {showDetails.districts.map((d, idx) => (
                                            <span key={idx} className="px-5 py-2.5 bg-green-50/50 text-green-700 rounded-2xl text-sm font-black border border-green-100 shadow-sm transition-all hover:bg-green-100 hover:scale-105 cursor-default">
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="text-center sm:text-left">
                                <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Dakshina from</p>
                                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                                    <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{
                                        Math.min(
                                            showDetails.is_online ? showDetails.online_cost : Infinity,
                                            showDetails.is_home_visit ? showDetails.home_visit_without_samagri_cost : Infinity
                                        )
                                    }</span>
                                    <span className="text-sm text-gray-400 font-bold">Starting</span>
                                </div>
                            </div>
                            <Link 
                                href={`/astrologer/${showDetails.expert_id}`}
                                className="w-full sm:w-auto px-10 py-4.5 bg-orange-600 text-white text-base font-black rounded-3xl hover:bg-orange-700 shadow-2xl shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 hover:-translate-y-1"
                            >
                                Confirm Booking
                                <Sparkles className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

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
                
                /* Custom Scrollbar for Modal */
                .custom-popup-scroll::-webkit-scrollbar {
                    width: 7px;
                }
                .custom-popup-scroll::-webkit-scrollbar-track {
                    background: #fdfcfb;
                    border-radius: 10px;
                }
                .custom-popup-scroll::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                    border: 2px solid #fdfcfb;
                }
                .custom-popup-scroll::-webkit-scrollbar-thumb:hover {
                    background: #f97316;
                }
            `}</style>
        </div>
    );
};

export default OnlinePujaPage;
