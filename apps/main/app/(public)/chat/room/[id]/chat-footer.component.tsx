"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

const { Paperclip, Send, X } = LucideIcons as any;

type ChatFooterProps = {
    isDarkMode: boolean;
    sessionStatus: string;
    pendingAttachment: any;
    setPendingAttachment: (val: any) => void;
    handleFileUpload: (e: any) => void;
    fileInputRef: any;
    uploading: boolean;
    inputValue: string;
    setInputValue: (val: string) => void;
    handleSendMessage: () => void;
};

export default function ChatFooter({
    isDarkMode,
    sessionStatus,
    pendingAttachment,
    setPendingAttachment,
    handleFileUpload,
    fileInputRef,
    uploading,
    inputValue,
    setInputValue,
    handleSendMessage
}: ChatFooterProps) {
    return (
        <footer className={`flex-shrink-0 transition-all duration-300 ${isDarkMode ? 'bg-[#1a0c0c]/80 border-white/5' : 'bg-white/80 border-black/5'} backdrop-blur-xl border-t px-4 md:px-12 py-6 md:py-10 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] overflow-visible`}>
            <div className={`relative flex items-end gap-3 md:gap-5 max-w-6xl mx-auto overflow-visible ${sessionStatus !== 'active' ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                <div className="flex-1 relative group overflow-visible">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#fd6410]/20 to-orange-500/20 rounded-[34px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className={`relative flex flex-col ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'} border rounded-[28px] md:rounded-[34px] p-2 md:p-3 overflow-visible transition-all duration-500 focus-within:ring-2 focus-within:ring-[#fd6410]/50`}>
                        {pendingAttachment && (
                            <div className="mx-2 mb-2 p-2.5 bg-[#fd6410]/10 rounded-2xl border border-[#fd6410]/20 flex items-center justify-between animate-in slide-in-from-bottom-2">
                                <span className="text-[10px] font-black uppercase text-[#fd6410] truncate max-w-[200px]">📎 {pendingAttachment.name}</span>
                                <button onClick={() => setPendingAttachment(null)} className="p-1 hover:bg-red-500/10 rounded-lg text-red-500 transition-all active:scale-95"><X className="w-4 h-4" /></button>
                            </div>
                        )}
                        <div className="flex items-end gap-2 md:gap-4 overflow-visible px-2">
                            <button onClick={() => fileInputRef.current?.click()} className={`p-4 rounded-full ${isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-white text-gray-400 hover:text-[#fd6410]'} transition-all hover:scale-110 active:scale-95 shadow-sm group relative overflow-visible`}>
                                <Paperclip className={`w-5 h-5 md:w-6 md:h-6 ${uploading ? 'animate-pulse' : ''}`} />
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap whitespace-nowrap uppercase tracking-widest shadow-xl border border-white/10 z-[100]">Attach File</div>
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,.pdf,.doc,.docx" />
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                rows={1}
                                style={{ minHeight: '52px' }}
                                placeholder="Consult with intention..."
                                className={`flex-1 bg-transparent py-4 md:py-4.5 text-sm md:text-base ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-gray-800 placeholder:text-gray-400'} outline-none border-none resize-none max-h-32 custom-scrollbar font-medium leading-relaxed m-0 decoration-none`}
                            />
                            <div className="flex items-center gap-2 pr-3 pb-3 hidden md:flex">
                                <span className="text-[9px] font-black tracking-widest uppercase opacity-20">Type with shift + enter for new line</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSendMessage}
                    disabled={(!inputValue.trim() && !pendingAttachment) || uploading}
                    className={`flex-shrink-0 w-13 md:w-16 h-13 md:h-16 rounded-[24px] md:rounded-[28px] mt-1 flex items-center justify-center transition-all shadow-xl active:scale-90 group relative overflow-hidden ${inputValue.trim() || pendingAttachment ? "bg-[#fd6410] text-white hover:shadow-[#fd6410]/40 hover:-translate-y-1 hover:scale-105" : "bg-gray-100 text-gray-300 md:cursor-not-allowed cursor-not-allowed"}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#fd6410] to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Send className={`w-6 h-6 md:w-7 md:h-7 relative z-10 transition-transform ${inputValue.trim() || pendingAttachment ? "group-hover:-translate-y-1 group-hover:translate-x-1" : ""}`} />
                </button>
            </div>
            <div className="mt-5 text-center flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 opacity-30">
                    <LucideIcons.Shield className="w-3 h-3 text-[#fd6410] fill-[#fd6410]" />
                    <span className={`text-[9px] font-black tracking-widest uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>Real-time spiritual connection</span>
                </div>
                <div className="w-1 h-1 bg-current opacity-10 rounded-full"></div>
                <p className={`text-[9px] font-black tracking-widest uppercase opacity-30 ${isDarkMode ? 'text-white' : 'text-black'}`}>End-to-End Encrypted</p>
            </div>
        </footer>
    );
}
