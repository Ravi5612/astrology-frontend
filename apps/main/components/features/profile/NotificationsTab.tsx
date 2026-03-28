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
    <div className="bg-white border-0 shadow-premium rounded-2xl mb-6 overflow-hidden">
      <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h5
          className="text-lg font-bold text-gray-900 mb-0 flex items-center"
          style={fontStyle}
        >
          <span className="w-10 h-10 rounded-full bg-orange/5 text-orange flex items-center justify-center mr-3 flex-shrink-0">
            <i className="fa-solid fa-bell"></i>
          </span>
          {t.title}
        </h5>
        {notifications.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 text-red-500 hover:text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center gap-2 border-0"
            style={fontStyle}
          >
            <i className="fa-solid fa-trash-can"></i>
            {t.clearAll}
          </button>
        )}
      </div>
      <div className="p-6 md:p-8">
        {loadingNotifications ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-orange/10 border-t-orange animate-spin"></div>
            </div>
            <p className="text-gray-400 font-medium" style={fontStyle}>
              {t.loading}
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
              <i className="fa-solid fa-bell-slash text-3xl text-gray-300"></i>
            </div>
            <h6 className="font-bold text-gray-900 text-lg mb-2" style={fontStyle}>
              {t.noNotifications}
            </h6>
            <p className="text-gray-500 text-sm max-w-xs m-0" style={fontStyle}>
              {t.noNotificationsHint}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif: any) => (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                  notif.isRead
                    ? "bg-white border-gray-100 opacity-70 hover:opacity-100"
                    : "bg-orange/5 border-orange/10 shadow-sm hover:shadow-md hover:bg-orange/10"
                }`}
                onClick={() => !notif.isRead && onMarkAsRead(notif.id)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
                        notif.isRead
                          ? "bg-gray-100 text-gray-400"
                          : "bg-orange text-white"
                      }`}
                    >
                      <i
                        className={`fa-solid ${
                          notif.isRead ? "fa-envelope-open" : "fa-envelope"
                        } text-lg`}
                      ></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6
                        className={`text-base mb-1 truncate ${
                          notif.isRead ? "text-gray-600" : "text-gray-900 font-bold"
                        }`}
                      >
                        {notif.title}
                      </h6>
                      <p
                        className="text-gray-500 text-sm mb-3 leading-relaxed line-clamp-2"
                        style={{ lineHeight: "1.5" }}
                      >
                        {notif.message}
                      </p>
                      <span className="flex items-center gap-2 text-[10px] text-orange font-bold uppercase tracking-widest">
                        <i className="fa-regular fa-clock text-[10px]"></i>
                        {notif.createdAt || notif.created_at
                          ? new Date(
                              notif.createdAt || notif.created_at
                            ).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "numeric",
                              minute: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  {!notif.isRead && (
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-3 h-3 rounded-full bg-orange animate-ping opacity-75"></span>
                      <span className="relative w-2.5 h-2.5 rounded-full bg-orange shadow-lg shadow-orange/50"></span>
                    </div>
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


