import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { profileTranslations } from "@/lib/translations/profile";

interface HistoryTabProps {
    loadingHistory: boolean;
    consultationHistory: any[];
    expandedSessions: Record<number, boolean>;
    toggleSession: (id: number) => void;
    onViewDetails: (session: any) => void;
    onReportIssue: (session: any) => void;
}

const HistoryTab: React.FC<HistoryTabProps> = ({
    loadingHistory,
    consultationHistory,
    expandedSessions,
    toggleSession,
    onViewDetails,
    onReportIssue
}) => {
    const { lang } = useLanguageStore();
    const t = (profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en).history;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
            <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                <h5 className="fw-bold mb-0" style={fontStyle}>
                    <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#e3f2fd", color: "#1e88e5" }}>
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </span>
                    {t.title}
                </h5>
            </div>
            <div className="card-body p-4 pt-4">
                {loadingHistory ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <p className="text-muted" style={fontStyle}>{t.loading}</p>
                    </div>
                ) : consultationHistory.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="fa-solid fa-calendar-check fa-3x text-light"></i>
                        </div>
                        <h6 className="fw-bold" style={fontStyle}>{t.noHistory}</h6>
                        <p className="text-muted small" style={fontStyle}>{t.noHistoryHint}</p>
                    </div>
                ) : (
                    <div className="session-list">
                        {consultationHistory.map((session: any, idx: number) => (
                            <div key={session.id || idx} className="session-card border rounded-4 p-0 mb-4 overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                                <div className="bg-light p-3 d-flex justify-content-between align-items-center border-bottom flex-wrap gap-3">
                                    <div className="d-flex flex-column">
                                        <span className="text-muted small fw-bold text-uppercase" style={fontStyle}>{t.sessionId}</span>
                                        <span className="fw-bold">#{session.id}</span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span className="text-muted small fw-bold text-uppercase" style={fontStyle}>{t.date}</span>
                                        <span className="fw-bold">
                                            {(session.createdAt || session.created_at) ? new Date(session.createdAt || session.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span className="text-muted small fw-bold text-uppercase" style={fontStyle}>{t.amountPaid}</span>
                                        <span className="fw-bold text-primary">₹{session.total_cost || 0}</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-end gap-2">
                                        <span className={`px-3 py-1 rounded-pill text-[10px] uppercase font-bold tracking-wide ${session.terminatedBy === 'admin'
                                            ? 'bg-danger bg-opacity-10 text-danger'
                                            : session.status === 'completed'
                                                ? 'bg-success bg-opacity-10 text-success'
                                                : 'bg-warning bg-opacity-10 text-warning'
                                            }`} style={fontStyle}>
                                            {session.terminatedBy === 'admin' ? t.terminatedByAdmin : (session.status || t.scheduled)}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSession(session.id);
                                            }}
                                            className="w-8 h-8 d-flex align-items-center justify-content-center rounded-circle border-0 bg-white shadow-sm hover-bg-gray-100 transition-all"
                                        >
                                            <i className={`fa-solid fa-chevron-${expandedSessions[session.id] ? 'up' : 'down'} text-muted`}></i>
                                        </button>
                                    </div>
                                </div>

                                {expandedSessions[session.id] && (
                                    <div className="p-4 border-top bg-white">
                                        <div className="d-flex align-items-center gap-4 mb-4">
                                            <div className="rounded-circle border overflow-hidden shadow-sm d-flex align-items-center justify-content-center bg-light" style={{ width: "80px", height: "80px", flexShrink: 0 }}>
                                                <img
                                                    src={session.expert?.user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                                                    className="w-100 h-100 object-cover"
                                                    alt={session.expert?.user?.name || "Expert"}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/men/32.jpg";
                                                    }}
                                                />
                                            </div>
                                            <div className="grow">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <h5 className="mb-0 fw-bold">{session.expert?.user?.name || "Astro Expert"}</h5>
                                                        <p className="text-muted mb-0 small">{session.expert?.category || session.expert?.specialization || "Expert Astrologer"}</p>
                                                    </div>
                                                    <div className="text-end">
                                                        <span className="fw-bold d-block">₹{session.total_cost || 0}</span>
                                                        <span className="text-muted small" style={fontStyle}>{t.consultationFee}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3 text-muted small">
                                                    <span style={fontStyle}><i className={`fa-solid ${session.session_type === 'video' ? 'fa-video' : session.session_type === 'audio' ? 'fa-phone' : 'fa-message'} me-1`}></i>
                                                        {session.durationString || '0s'}
                                                    </span>
                                                    <span style={fontStyle}><i className="fa-solid fa-star text-warning me-1"></i> {session.expert?.rating || 'N/A'} {t.rating}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={() => onViewDetails(session)}
                                                    className="btn btn-outline-primary btn-sm rounded-pill px-4 fw-bold"
                                                    style={fontStyle}
                                                >
                                                    <i className="fa-solid fa-comments me-2"></i>
                                                    {t.viewChat}
                                                </button>
                                            </div>

                                            {(session.status === 'issue_reported' || session.status === 'dispute_raised') ? (
                                                <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill d-flex align-items-center border border-danger border-opacity-25" style={fontStyle}>
                                                    <i className="fa-solid fa-triangle-exclamation me-1"></i>
                                                    {t.issueReported}
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => onReportIssue(session)}
                                                    className="px-4 py-2 rounded-pill text-white text-decoration-none d-inline-block fw-bold shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgba(220,53,69,0.3)] border-0"
                                                    style={{ background: 'linear-gradient(to right, #dc3545, #c82333)', ...fontStyle }}
                                                >
                                                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                                                    {t.reportIssue}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryTab;


