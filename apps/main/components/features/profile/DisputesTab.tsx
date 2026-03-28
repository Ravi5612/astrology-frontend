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
      <div className="bg-white border-0 shadow-premium rounded-2xl p-20 text-center flex flex-col items-center justify-center">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-orange/10 border-t-orange animate-spin"></div>
        </div>
        <p className="text-gray-400 font-medium" style={fontStyle}>
          {t.loading}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-0 shadow-premium rounded-2xl mb-6 overflow-hidden">
      <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h5
          className="text-lg font-bold text-gray-900 mb-0 flex items-center"
          style={fontStyle}
        >
          <span className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mr-3 flex-shrink-0">
            <i className="fa-solid fa-headset"></i>
          </span>
          {t.title}
        </h5>
      </div>
      <div className="p-0 overflow-x-auto">
        {disputes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
              <i className="fa-solid fa-ticket text-3xl text-gray-300"></i>
            </div>
            <h6 className="font-bold text-gray-900 text-lg mb-2" style={fontStyle}>
              {t.noTickets}
            </h6>
            <p className="text-gray-500 text-sm max-w-xs m-0" style={fontStyle}>
              {t.noTicketsHint}
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th
                  className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400"
                  style={fontStyle}
                >
                  {t.ticketId}
                </th>
                <th
                  className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400"
                  style={fontStyle}
                >
                  {t.category}
                </th>
                <th
                  className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400"
                  style={fontStyle}
                >
                  {t.status}
                </th>
                <th
                  className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-400"
                  style={fontStyle}
                >
                  {t.action}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {disputes.map((dispute) => (
                <tr
                  key={dispute.id}
                  className="group hover:bg-gray-50/80 transition-colors"
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="block font-black text-gray-900 mb-1">
                      #DS-{dispute.id}
                    </span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {dispute.createdAt || dispute.created_at
                        ? new Date(
                            dispute.createdAt || dispute.created_at
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })
                        : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className="inline-block px-3 py-1 mb-2 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-700 shadow-sm"
                      style={fontStyle}
                    >
                      {dispute.category || dispute.subject || t.defaultCategory}
                    </span>
                    <div className="text-sm text-gray-500 font-medium max-w-[200px] truncate group-hover:text-gray-700 transition-colors">
                      {dispute.description}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        dispute.status === "open"
                          ? "bg-blue-50 text-blue-600 border-blue-100 shadow-sm shadow-blue-100/50"
                          : dispute.status === "pending"
                            ? "bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-100/50"
                            : dispute.status === "resolved"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-100/50"
                              : "bg-gray-50 text-gray-600 border-gray-100 shadow-sm"
                      }`}
                    >
                      {dispute.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <button
                      onClick={() => onViewChat(dispute)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange text-white font-bold text-xs rounded-xl hover:bg-orange/90 transition-all shadow-lg shadow-orange/20"
                      style={fontStyle}
                    >
                      <i className="fa-solid fa-comments"></i>
                      {t.viewChat}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DisputesTab;


