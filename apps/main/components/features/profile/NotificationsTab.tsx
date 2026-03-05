import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { profileTranslations } from "@/lib/translations/profile";

interface NotificationsTabProps {
    loadingNotifications: boolean;
    notifications: any[];
    onMarkAsRead: (id: string | number) => void;
    onClearAll: () => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({
    loadingNotifications,
    notifications,
    onMarkAsRead,
    onClearAll
}) => {
    const { lang } = useLanguageStore();
    const t = (profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en).notifications;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0" style={fontStyle}>
                    <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "rgba(242, 94, 10, 0.05)", color: "var(--primary)" }}>
                        <i className="fa-solid fa-bell"></i>
                    </span>
                    {t.title}
                </h5>
                {notifications.length > 0 && (
                    <button
                        onClick={onClearAll}
                        className="btn btn-sm text-danger fw-bold hover:bg-red-50"
                        style={fontStyle}
                    >
                        <i className="fa-solid fa-trash-can me-2"></i>
                        {t.clearAll}
                    </button>
                )}
            </div>
            <div className="card-body p-4">
                {loadingNotifications ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <p className="text-muted" style={fontStyle}>{t.loading}</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="fa-solid fa-bell-slash fa-3x text-light"></i>
                        </div>
                        <h6 className="fw-bold" style={fontStyle}>{t.noNotifications}</h6>
                        <p className="text-muted small" style={fontStyle}>{t.noNotificationsHint}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notif: any) => (
                            <div
                                key={notif.id}
                                className={`p-3 rounded-xl border transition-all hover:shadow-md cursor-pointer ${notif.isRead ? 'bg-white opacity-80' : 'bg-primary/5 border-primary/10 shadow-sm'}`}
                                onClick={() => !notif.isRead && onMarkAsRead(notif.id)}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="d-flex gap-3">
                                        <div className={`mt-1 p-2 rounded-lg ${notif.isRead ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white'}`}>
                                            <i className={`fa-solid ${notif.isRead ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
                                        </div>
                                        <div>
                                            <h6 className={`mb-1 ${notif.isRead ? 'text-gray-600' : 'text-gray-900 fw-bold'}`}>{notif.title}</h6>
                                            <p className="text-muted small mb-1" style={{ lineHeight: '1.4' }}>{notif.message}</p>
                                            <span className="text-[10px] text-primary font-medium uppercase tracking-wider">
                                                {(notif.createdAt || notif.created_at) ? new Date(notif.createdAt || notif.created_at).toLocaleString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                }) : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    {!notif.isRead && (
                                        <span className="w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/50 animate-pulse"></span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsTab;


