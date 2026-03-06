import React, { useState, useEffect } from "react";
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

    const expertAvatar = selectedSession.expert?.user?.profile_picture ||
        selectedSession.expert?.user?.avatar ||
        selectedSession.expert?.avatar ||
        selectedSession.expert?.image ||
        "/images/dummy-astrologer.jpg";

    return createPortal(
        <div
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.75)",
                zIndex: 999999,
                backdropFilter: "blur(10px)",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-4 shadow-2xl overflow-hidden border-0 animate-in zoom-in-95 duration-300"
                style={{
                    maxWidth: "600px",
                    width: "100%",
                    maxHeight: "90vh",
                    position: "relative",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    zIndex: 1000000
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom" style={{ backgroundColor: "#FF6B00" }}>
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="rounded-circle overflow-hidden"
                            style={{ width: "48px", height: "48px", border: "3px solid white" }}
                        >
                            <img
                                src={expertAvatar}
                                alt={selectedSession.expert?.user?.name || selectedSession.expert?.name || "Expert"}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div>
                            <h5 className="fw-bold mb-0 text-white">
                                {selectedSession.expert?.user?.name || selectedSession.expert?.name || "Expert Consultation"}
                            </h5>
                            <p className="small mb-0 text-white opacity-75">
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
                        className="btn btn-light rounded-circle p-2"
                        style={{ width: "40px", height: "40px" }}
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="p-4 overflow-auto" style={{ maxHeight: "calc(90vh - 180px)" }} data-lenis-prevent>
                    {chatMessages.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fa-solid fa-message fa-3x text-muted mb-3"></i>
                            <p className="text-muted">No messages in this consultation</p>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
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
                                        className={`d-flex gap-3 ${content.startsWith("[INTRO_CARD]") ? 'justify-content-center' : (isUser ? 'flex-row-reverse' : 'flex-row')}`}
                                    >
                                        {!content.startsWith("[INTRO_CARD]") && (
                                            <div
                                                className="rounded-circle overflow-hidden flex-shrink-0 shadow-sm"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    border: `2px solid ${isUser ? '#FF6B00' : '#e0e0e0'}`
                                                }}
                                            >
                                                <img
                                                    src={isUser
                                                        ? (userAvatar || "https://avatar.iran.liara.run/public/boy?username=User")
                                                        : expertAvatar
                                                    }
                                                    alt={sType}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = isUser
                                                            ? "https://avatar.iran.liara.run/public/boy?username=User"
                                                            : "/images/dummy-astrologer.jpg";
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className={`flex-grow-0 ${content.startsWith("[INTRO_CARD]") ? 'd-flex justify-content-center' : (isUser ? 'd-flex justify-content-end' : 'd-flex justify-content-start')}`} style={{ maxWidth: content.startsWith("[INTRO_CARD]") ? "100%" : "85%" }}>
                                            <div
                                                className={content.startsWith("[INTRO_CARD]") ? "" : `p-3 rounded-4 shadow-sm d-inline-block ${isUser
                                                    ? 'bg-orange bg-opacity-10 text-dark border-0'
                                                    : 'bg-white text-dark border border-light'
                                                    }`}
                                                style={content.startsWith("[INTRO_CARD]") ? {} : {
                                                    borderRadius: isUser ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <div className="mb-1" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                                    {renderMessageContent(msg)}
                                                </div>
                                                {!content.startsWith("[INTRO_CARD]") && (
                                                    <div className={`mt-2 ${isUser ? 'text-end' : 'text-start'}`}>
                                                        <small className="text-muted opacity-50" style={{ fontSize: "10px", fontWeight: 'bold' }}>
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
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-top bg-light">
                    <div className="d-flex gap-2 justify-content-between align-items-center">
                        <div className="d-flex gap-2 flex-wrap">
                            <span
                                className="badge px-3 py-2 rounded-pill d-flex align-items-center gap-1 border border-secondary border-opacity-10"
                                style={{ backgroundColor: 'rgba(74, 29, 31, 0.1)', color: '#4A1D1F' }}
                            >
                                <i className="fa-solid fa-clock opacity-50"></i>
                                Duration: {selectedSession.durationString || `${selectedSession.durationMins || selectedSession.duration_mins || selectedSession.duration || 0} mins`}
                            </span>
                            {(selectedSession.totalCost > 0 || selectedSession.total_cost > 0) && (
                                <span
                                    className="badge px-3 py-2 rounded-pill d-flex align-items-center gap-1 bg-dark bg-opacity-10 text-dark border border-dark border-opacity-10"
                                >
                                    <i className="fa-solid fa-indian-rupee-sign opacity-50"></i>
                                    Cost: ₹{selectedSession.totalCost || selectedSession.total_cost}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="btn btn-secondary px-4 py-2 rounded-3"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConsultationChatModal;


