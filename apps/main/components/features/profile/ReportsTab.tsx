import React from "react";
import { useLanguageStore } from "../../../store/languageStore";
import { profileTranslations } from "../../../lib/translations/profile";

const ReportsTab: React.FC = () => {
    const { lang } = useLanguageStore();
    const t = profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-0 pt-4 px-4 mb-3">
                <h5 className="fw-bold mb-0" style={fontStyle}>
                    <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#e8f5e9", color: "#43a047" }}>
                        <i className="fa-solid fa-scroll"></i>
                    </span>
                    {t.reports.title}
                </h5>
            </div>
            <div className="card-body p-4 pt-5 text-center">
                <div className="mb-4">
                    <i className="fa-solid fa-file-invoice fa-3x text-light"></i>
                </div>
                <h6 className="fw-bold" style={fontStyle}>{t.reports.noReports}</h6>
                <p className="text-muted small" style={fontStyle}>{t.reports.noReportsHint}</p>
            </div>
        </div>
    );
};

export default ReportsTab;


