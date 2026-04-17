import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ConsultationChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSession: any;
    chatMessages: any[];
    userAvatar?: string;
}

const ConsultationChatModal: React.FC<ConsultationChatModalProps> = ({
    isOpen,
    onClose,
    selectedSession,
    chatMessages,
    userAvatar,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
            setMounted(false);
        };
    }, [isOpen]);

    if (!mounted || !isOpen || !selectedSession) return null;

    const renderMessageContent = (msg: any) => {
        const content = msg.content || "";
        if (content.startsWith("[INTRO_CARD]")) {
            try {
                const data = JSON.parse(content.replace("[INTRO_CARD]", ""));
                return (
                    <div className="my-2 p-3 rounded-4 shadow-sm border-0 position-relative overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)",
                            border: "1px solid #fdd835",
                            maxWidth: "100%",
                            width: "100%",
                            minWidth: "280px"
                        }}>
                        <div className="position-absolute top-0 end-0 p-2 opacity-10">
                            <i className="fa-solid fa-dharmachakra fa-3x"></i>
                        </div>
                        <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2 border-bottom border-dark border-opacity-10 pb-2">
                            <i className="fa-solid fa-id-card text-warning"></i>
                            Birth Details Shared
                        </h6>
                        <div className="row g-3">
                            <div className="col-6">
                                <label className="text-uppercase text-muted fw-bold" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>Name</label>
                                <p className="mb-0 fw-bold text-dark small">{data.name}</p>
                            </div>
                            <div className="col-6">
                                <label className="text-uppercase text-muted fw-bold" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>Gender</label>
                                <p className="mb-0 fw-bold text-dark small capitalize">{data.gender || 'N/A'}</p>
                            </div>
                            <div className="col-6">
                                <label className="text-uppercase text-muted fw-bold" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>Date of Birth</label>
                                <p className="mb-0 fw-bold text-dark small">{data.dob}</p>
                            </div>
                            <div className="col-6">
                                <label className="text-uppercase text-muted fw-bold" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>Time</label>
                                <p className="mb-0 fw-bold text-dark small">{data.tob || 'N/A'}</p>
                            </div>
                            <div className="col-12 mt-2 border-top border-dark border-opacity-10 pt-2">
                                <label className="text-uppercase text-muted fw-bold" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>Place of Birth</label>
                                <p className="mb-0 fw-bold text-dark small"><i className="fa-solid fa-location-dot me-1 text-danger opacity-50"></i> {data.pob || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                );
            } catch (e) {
                return content;
            }
        }
        return content;
    };

    const userDisplayAvatar = userAvatar || selectedSession.user_image || "https://avatar.iran.liara.run/public/boy?username=User";

    return createPortal(
        <div
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-6"
            style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border-0 animate-in zoom-in-95 duration-300 w-full max-w-2xl flex flex-col relative z-[1000000]"
                style={{
                    maxHeight: "90vh",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b shrink-0" style={{ backgroundColor: "#FF6B00" }}>
                    <div className="flex items-center gap-3">
                        <div
                            className="rounded-circle overflow-hidden position-relative"
                            style={{ width: "48px", height: "48px", border: "3px solid white" }}
                        >
                            <Image
                                src={selectedSession.expert_image}
                                alt={selectedSession.expert_name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    (e.target as any).src = "/images/dummy-expert.jpg";
                                }}
                            />
                        </div>
                        <div>
                            <h5 className="fw-bold mb-0 text-white">
                                {selectedSession.expert_name}
                            </h5>
                            <p className="text-xs mb-0 text-white opacity-75">
                                <i className="fa-regular fa-calendar me-1"></i>
                                {(selectedSession.createdAt || selectedSession.created_at) ? new Date(selectedSession.createdAt || selectedSession.created_at).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : 'N/A'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors"
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                {/* Modal Content: Switch between Chat Messages and Call Summary */}
                <div className="p-4 overflow-auto flex-1 bg-white" data-lenis-prevent>
                    {(selectedSession.type === 'AUDIO_CALL' || selectedSession.type === 'VIDEO_CALL' || selectedSession.session_type === 'audio' || selectedSession.session_type === 'video') ? (
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-100/50 ${(selectedSession.type === 'VIDEO_CALL' || selectedSession.session_type === 'video') ? 'bg-purple-50' : 'bg-blue-50'}`}>
                                <i className={`fa-solid ${(selectedSession.type === 'VIDEO_CALL' || selectedSession.session_type === 'video') ? 'fa-video text-purple-600' : 'fa-phone text-blue-600'} text-4xl`}></i>
                            </div>
                            
                            <h4 className="text-2xl font-black text-gray-900 mb-2">
                                {(selectedSession.type === 'VIDEO_CALL' || selectedSession.session_type === 'video') ? 'Video Consultation' : 'Audio Consultation'}
                            </h4>
                            <p className="text-gray-500 mb-10 max-w-xs mx-auto">
                                This was a successful {(selectedSession.type === 'VIDEO_CALL' || selectedSession.session_type === 'video') ? 'video' : 'audio'} session with {selectedSession.expert?.user?.name || selectedSession.expert?.name || "the expert"}.
                            </p>
                            
                            {/* Call Details Card */}
                            <div className="w-full max-w-sm bg-gray-50/50 rounded-3xl p-8 border border-gray-100 flex flex-col gap-5 text-left">
                                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100/50">
                                    <span className="text-sm font-bold text-gray-400">Total Duration</span>
                                    <span className="font-black text-gray-900">{selectedSession.durationString || "0s"}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100/50">
                                    <span className="text-sm font-bold text-gray-400">Consultation Rate</span>
                                    <span className="font-black text-gray-700">₹{selectedSession.rate || 0}/min</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100/50">
                                    <span className="text-sm font-bold text-gray-400">Consultation Fee</span>
                                    <span className="font-black text-[#FF6B00]">₹{selectedSession.total_cost || 0}</span>
                                </div>
                                
                                {selectedSession.metadata?.recordingUrl && (
                                    <div className="mt-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                                            <i className="fa-solid fa-play-circle text-blue-500"></i>
                                            Call Recording
                                        </label>
                                        <audio controls className="w-full h-10 accent-blue-600">
                                            <source src={selectedSession.metadata.recordingUrl} type="audio/mpeg" />
                                            Your browser does not support audio.
                                        </audio>
                                    </div>
                                )}

                                {!(selectedSession.metadata?.recordingUrl) && (
                                    <div className="flex items-center justify-center gap-2 p-4 bg-gray-100/50 rounded-2xl text-xs font-bold text-gray-400 italic">
                                        <i className="fa-solid fa-info-circle"></i>
                                        No recording available for this call
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Existing Message List for Chat */
                        chatMessages.length === 0 ? (
                            <div className="text-center py-5">
                                <i className="fa-solid fa-message fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No messages in this consultation</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {chatMessages.map((msg: any, index: number) => {
                                    const sType = (msg.senderType || msg.sender_type || "").toLowerCase();
                                    const content = msg.content || "";

                                    // Simple logic: rely on senderType
                                    const isUser = sType === 'user' || sType === 'customer' || sType === 'client';
                                    const isAdmin = sType === 'admin' || sType === 'system';

                                    if (isAdmin) {
                                        const isEnded = content.toLowerCase().includes('end') || content.toLowerCase().includes('finish') || content.toLowerCase().includes('close');
                                        return (
                                            <div key={msg.id || index} className="text-center my-3 w-100">
                                                <span
                                                    className={`px-4 py-2 rounded-pill font-bold shadow-sm d-inline-block border ${isEnded ? 'border-danger border-opacity-25' : 'border-light'}`}
                                                    style={{
                                                        fontSize: '11px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        backgroundColor: isEnded ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                                        color: isEnded ? '#dc3545' : '#6c757d',
                                                        minWidth: '200px'
                                                    }}
                                                >
                                                    {msg.content}
                                                </span>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={msg.id || index}
                                            className={`flex gap-3 ${content.startsWith("[INTRO_CARD]") ? 'justify-content-center' : (isUser ? 'flex-row-reverse' : 'flex-row')}`}
                                        >
                                            {!content.startsWith("[INTRO_CARD]") && (
                                                <div
                                                    className="rounded-circle overflow-hidden flex-shrink-0 shadow-sm relative"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        border: `2px solid ${isUser ? '#FF6B00' : '#e0e0e0'}`
                                                    }}
                                                >
                                                    <Image
                                                        src={isUser
                                                            ? userDisplayAvatar
                                                            : selectedSession.expert_image
                                                        }
                                                        alt={sType}
                                                        width={40}
                                                        height={40}
                                                        className="object-cover w-full h-full"
                                                        onError={(e) => {
                                                            (e.target as any).src = isUser
                                                                ? "https://avatar.iran.liara.run/public/boy?username=User"
                                                                : "/images/dummy-expert.jpg";
                                                        }}
                                                    />
                                                </div>
                                            )}
                                    <div className={`shrink-0 ${content.startsWith("[INTRO_CARD]") ? 'w-full flex justify-center' : (isUser ? 'flex justify-end' : 'flex justify-start')}`} style={{ maxWidth: content.startsWith("[INTRO_CARD]") ? "100%" : "85%" }}>
                                        <div
                                            className={content.startsWith("[INTRO_CARD]") ? "" : `p-3 shadow-sm inline-block ${isUser
                                                ? 'text-dark border-0'
                                                : 'bg-white text-dark border border-gray-100'
                                                }`}
                                            style={content.startsWith("[INTRO_CARD]") ? {} : {
                                                backgroundColor: isUser ? "rgba(255, 107, 0, 0.08)" : "#FFFFFF",
                                                borderRadius: isUser ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                                                textAlign: 'left'
                                            }}
                                        >
                                            <div className="mb-1" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                                {renderMessageContent(msg)}
                                            </div>
                                            {!content.startsWith("[INTRO_CARD]") && (
                                                <div className={`mt-2 ${isUser ? 'text-end' : 'text-start'}`}>
                                                    <small className="text-gray-400 font-bold" style={{ fontSize: "10px" }}>
                                                        {msg.createdAt || msg.created_at
                                                            ? new Date(msg.createdAt || msg.created_at).toLocaleTimeString('en-IN', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                            : ''
                                                        }
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t bg-gray-50 flex-none px-6">
                    <div className="flex gap-4 justify-between items-center">
                        <div className="flex gap-3 flex-wrap">
                            <span
                                className="px-4 py-2 rounded-xl flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100"
                            >
                                <i className="fa-solid fa-clock opacity-60"></i>
                                {selectedSession.durationString || "0s"}
                            </span>
                            {(selectedSession.total_cost > 0) && (
                                <span
                                    className="px-4 py-2 rounded-xl flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100"
                                >
                                    <i className="fa-solid fa-indian-rupee-sign opacity-60"></i>
                                    ₹{selectedSession.total_cost}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors text-sm shadow-lg shadow-gray-200"
                        >
                            Close History
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConsultationChatModal;


