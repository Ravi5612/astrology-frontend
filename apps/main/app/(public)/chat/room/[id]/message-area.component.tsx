"use client";

import React from "react";
import NextImage from "next/image";
import * as LucideIcons from "lucide-react";
import { ChatMessage } from "@/lib/types";

const Image = NextImage as any;
const { Paperclip, FileText, MapPin } = LucideIcons as any;

type MessageAreaProps = {
    isDarkMode: boolean;
    sessionStatus: string;
    sessionSummary: any;
    messages: ChatMessage[];
    expertData: any;
    typingStatus: { senderName: string; isTyping: boolean } | null;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export default function MessageArea({
    isDarkMode,
    sessionStatus,
    sessionSummary,
    messages,
    expertData,
    typingStatus,
    messagesEndRef
}: MessageAreaProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-hide">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-center mb-10">
                    <div className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all border ${sessionSummary?.status === 'terminated' ? 'bg-red-500/10 text-red-500 border-red-500/20' : isDarkMode ? 'bg-white/5 opacity-30 border-white/5' : 'bg-[#fd6410]/10 text-[#fd6410] border-[#fd6410]/20'}`}>
                        {sessionStatus === 'active' ? 'Consultation in Progress' : (sessionStatus === 'completed' && sessionSummary?.status === 'terminated') ? 'Session Terminated by Admin' : sessionStatus === 'completed' ? 'Session Ended' : 'Start your celestial journey'}
                    </div>
                </div>

                {messages.map((msg: ChatMessage) => {
                    const mSenderType = msg.senderType || (msg as any).sender_type;
                    const isUser = mSenderType === "user";

                    return (
                        <div key={msg.id} className={`flex gap-3 md:gap-4 ${isUser ? "flex-row-reverse" : "flex-row"} items-start`}>
                            <div className="flex-shrink-0 mt-1">
                                <div className={`w-8 h-8 rounded-full border-2 ${isUser ? 'border-[#fd6410]/30' : 'border-black/5'} overflow-hidden shadow-sm`}>
                                    <Image
                                        src={isUser ? "/placeholder-user.jpg" : expertData.image}
                                        alt="Avatar"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className={`flex flex-col gap-1.5 max-w-[85%] md:max-w-[70%]`}>
                                <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${isUser ? 'bg-[#fd6410] text-white rounded-tr-none' : isDarkMode ? 'bg-white/10 text-white rounded-tl-none' : 'bg-white text-gray-800 border border-black/5 rounded-tl-none font-medium'}`}>
                                    {msg.content}
                                    {msg.attachmentUrl && (
                                        <div className="mt-2 pt-2 border-t border-black/5">
                                            {msg.attachmentType === 'image' ? (
                                                <a href={msg.attachmentUrl} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden border border-black/10">
                                                    <Image src={msg.attachmentUrl} alt="attachment" width={200} height={200} className="w-full object-cover" />
                                                </a>
                                            ) : (
                                                <a href={msg.attachmentUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 p-2 rounded-lg ${isUser ? 'bg-white/10' : 'bg-black/5'} transition-colors`}>
                                                    <div className="p-1.5 bg-orange-500 rounded flex-shrink-0">
                                                        <FileText className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                    <span className="text-xs truncate font-bold">Document Attachment</span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <span className={`text-[9px] font-bold uppercase tracking-tighter opacity-40 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                                    {new Date(msg.createdAt || (msg as any).created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {typingStatus?.isTyping && (
                    <div className="flex gap-3 items-center animate-pulse py-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s] mx-0.5"></div>
                            <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-orange-500 tracking-widest">{typingStatus.senderName} is typing...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
