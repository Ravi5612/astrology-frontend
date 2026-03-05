import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { profileTranslations } from "@/lib/translations/profile";

interface DisputesTabProps {
    disputes: any[];
    loading: boolean;
    onViewChat: (dispute: any) => void;
}

const DisputesTab: React.FC<DisputesTabProps> = ({ disputes, loading, onViewChat }) => {
    const { lang } = useLanguageStore();
    const t = (profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en).disputes;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

    if (loading) {
        return (
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden" style={fontStyle}>{t.loading}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-0 pt-4 px-4 mb-3">
                <h5 className="fw-bold mb-0" style={fontStyle}>
                    <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#fff3e0", color: "#fb8c00" }}>
                        <i className="fa-solid fa-headset"></i>
                    </span>
                    {t.title}
                </h5>
            </div>
            <div className="card-body p-4 pt-0">
                {disputes.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-3">
                            <i className="fa-solid fa-ticket fa-3x text-light"></i>
                        </div>
                        <h6 className="fw-bold" style={fontStyle}>{t.noTickets}</h6>
                        <p className="text-muted small" style={fontStyle}>{t.noTicketsHint}</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="bg-light border-0">
                                <tr>
                                    <th className="border-0 px-3 py-3 small text-uppercase text-muted" style={fontStyle}>{t.ticketId}</th>
                                    <th className="border-0 py-3 small text-uppercase text-muted" style={fontStyle}>{t.category}</th>
                                    <th className="border-0 py-3 small text-uppercase text-muted" style={fontStyle}>{t.status}</th>
                                    <th className="border-0 py-3 small text-uppercase text-muted text-end" style={fontStyle}>{t.action}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disputes.map((dispute) => (
                                    <tr key={dispute.id}>
                                        <td className="px-3 py-3">
                                            <span className="fw-bold">#DS-{dispute.id}</span>
                                            <div className="small text-muted">
                                                {(dispute.createdAt || dispute.created_at) ? new Date(dispute.createdAt || dispute.created_at).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-light text-dark border" style={fontStyle}>{dispute.category || dispute.subject || t.defaultCategory}</span>
                                            <div className="small text-muted mt-1 text-truncate" style={{ maxWidth: '200px' }}>
                                                {dispute.description}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${dispute.status === 'open' ? 'bg-info' :
                                                dispute.status === 'pending' ? 'bg-warning' :
                                                    dispute.status === 'resolved' ? 'bg-success' : 'bg-secondary'
                                                }`}>
                                                {dispute.status}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <button
                                                onClick={() => onViewChat(dispute)}
                                                className="btn btn-primary btn-sm rounded-pill px-3"
                                                style={{ fontSize: '12px', ...fontStyle }}
                                            >
                                                {t.viewChat}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisputesTab;


