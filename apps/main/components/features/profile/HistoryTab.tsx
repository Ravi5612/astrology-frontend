import React from "react";
import Image from "next/image";
import { useLanguageStore } from "@/store/languageStore";
import { profileTranslations } from "@/lib/translations/profile";

interface HistoryTabProps {
    loadingHistory: boolean;
    consultationHistory: any[];
    expandedSessions: Record<number, boolean>;
    toggleSession: (id: number) => void;
    onViewDetails: (session: any) => void;
    onReportIssue: (session: any) => void;
    consultationDisputes?: Record<number, any>;
    onViewDispute?: (dispute: any) => void;
}

const HistoryTab: React.FC<HistoryTabProps> = ({
    loadingHistory,
    consultationHistory,
    expandedSessions,
    toggleSession,
    onViewDetails,
    onReportIssue,
    consultationDisputes = {},
    onViewDispute
}) => {
    const { lang } = useLanguageStore();
    const t = (profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en).history;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  return (
    <div className="bg-white border-0 shadow-premium rounded-2xl mb-6 overflow-hidden">
      <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h5
          className="text-lg font-bold text-gray-900 mb-0 flex items-center"
          style={fontStyle}
        >
          <span className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </span>
          {t.title}
        </h5>
      </div>
      <div className="p-6 md:p-8">
        {loadingHistory ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-orange/10 border-t-orange animate-spin"></div>
            </div>
            <p className="text-gray-400 font-medium" style={fontStyle}>
              {t.loading}
            </p>
          </div>
        ) : consultationHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
              <i className="fa-solid fa-calendar-check text-3xl text-gray-300"></i>
            </div>
            <h6 className="font-bold text-gray-900 text-lg mb-2" style={fontStyle}>
              {t.noHistory}
            </h6>
            <p className="text-gray-500 text-sm max-w-xs m-0" style={fontStyle}>
              {t.noHistoryHint}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {consultationHistory.filter(Boolean).map((session: any, idx: number) => (
              <div
                key={session.id || idx}
                className="group border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white"
              >
                {/* Session Summary Header */}
                <div
                  className="bg-gray-50/50 p-4 sm:p-6 flex flex-wrap gap-6 items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-100/30 transition-colors"
                  onClick={() => toggleSession(session.id)}
                >
                  <div className="flex flex-wrap gap-8 items-center">
                    <div>
                      <span
                        className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1"
                        style={fontStyle}
                      >
                        {t.sessionId}
                      </span>
                      <span className="font-bold text-gray-900">
                        #{session.id}
                      </span>
                    </div>
                    <div>
                      <span
                        className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1"
                        style={fontStyle}
                      >
                        {t.date}
                      </span>
                      <span className="font-bold text-gray-900">
                        {(() => {
                          const dateVal = session.createdAt || session.created_at;
                          if (!dateVal) return t.na;
                          const d = new Date(dateVal);
                          return isNaN(d.getTime())
                            ? t.na
                            : d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              });
                        })()}
                      </span>
                    </div>
                    <div>
                      <span
                        className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1"
                        style={fontStyle}
                      >
                        {t.amountPaid}
                      </span>
                      <span className="font-bold text-blue-600 text-lg">
                        ₹{session.total_cost || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        session.terminatedBy === "admin"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : session.status === "completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                      style={fontStyle}
                    >
                      {session.terminatedBy === "admin"
                        ? t.terminatedByAdmin
                        : t.statusMap?.[session.status as keyof typeof t.statusMap] || session.status || t.scheduled}
                    </span>
                    <button
                      className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm transition-transform duration-300 ${
                        expandedSessions[session.id] ? "rotate-180" : ""
                      }`}
                    >
                      <i className="fa-solid fa-chevron-down text-gray-400 text-xs"></i>
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedSessions[session.id] && (
                  <div className="p-6 md:p-8 animate-in fade-in slide-in-from-top-4 duration-300 bg-white">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-50 overflow-hidden bg-gray-50 shadow-inner group-hover:scale-105 transition-transform duration-500">
                          <Image
                            src={
                              session.expert?.user?.avatar ||
                              "https://randomuser.me/api/portraits/men/32.jpg"
                            }
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                            alt={session.expert?.user?.name || "Expert"}
                            onError={(e) => {
                              (e.target as any).src =
                                "https://randomuser.me/api/portraits/men/32.jpg";
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-sm">
                          <i className="fa-solid fa-check text-white text-[10px]"></i>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-6">
                          <div>
                            <h5 className="font-bold text-gray-900 text-2xl mb-1">
                              {session.expert?.user?.name || "Astro Expert"}
                            </h5>
                            <p className="text-gray-500 font-medium text-sm">
                              {session.expert?.category ||
                                session.expert?.specialization ||
                                "Expert Expert"}
                            </p>
                          </div>
                          <div className="md:text-right">
                            <span className="block text-2xl font-black text-gray-900">
                              ₹{session.total_cost || 0}
                            </span>
                            <span
                              className="text-[10px] font-bold uppercase tracking-widest text-gray-400"
                              style={fontStyle}
                            >
                              {t.consultationFee}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 py-4 px-6 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-blue-600">
                              <i
                                className={`fa-solid ${
                                  session.session_type === "video"
                                    ? "fa-video"
                                    : session.session_type === "audio"
                                      ? "fa-phone"
                                      : "fa-message"
                                }`}
                              ></i>
                            </div>
                            <span
                              className="text-sm font-bold text-gray-700"
                              style={fontStyle}
                            >
                              {session.durationString || "0s"}
                            </span>
                          </div>
                          <div className="w-px h-8 bg-gray-200"></div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-100/50 flex items-center justify-center text-amber-500">
                              <i className="fa-solid fa-star"></i>
                            </div>
                            <span
                              className="text-sm font-bold text-gray-700"
                              style={fontStyle}
                            >
                              {session.expert?.rating || "N/A"} {t.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <button
                        onClick={() => onViewDetails(session)}
                        className="w-full sm:w-auto px-8 py-3 bg-blue-50 text-blue-600 font-bold rounded-2xl hover:bg-blue-100 transition-all flex items-center justify-center gap-3"
                        style={fontStyle}
                      >
                        <i className="fa-solid fa-comments text-lg"></i>
                        {t.viewChat}
                      </button>

                      {consultationDisputes[session.id] ? (
                        <button
                          onClick={() => onViewDispute && onViewDispute(consultationDisputes[session.id])}
                          className="w-full sm:w-auto px-8 py-3 bg-orange text-white font-bold rounded-2xl hover:bg-orange/90 shadow-lg shadow-orange/20 transition-all flex items-center justify-center gap-3"
                          style={fontStyle}
                        >
                          <i className="fa-solid fa-comments text-lg"></i>
                          {t.reportIssueDiscussion}
                        </button>
                      ) : session.status === "issue_reported" ||
                      session.status === "dispute_raised" ? (
                        <div
                          className="w-full sm:w-auto px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100 flex items-center justify-center gap-3"
                          style={fontStyle}
                        >
                          <i className="fa-solid fa-triangle-exclamation"></i>
                          {t.issueReported}
                        </div>
                      ) : (
                        <button
                          onClick={() => onReportIssue(session)}
                          className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-3"
                          style={fontStyle}
                        >
                          <i className="fa-solid fa-circle-exclamation text-lg"></i>
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


