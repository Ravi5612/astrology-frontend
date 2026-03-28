import React from 'react';
import Image from 'next/image';
import { useLanguageStore } from '@/store/languageStore';
import { profileTranslations } from '@/lib/translations/profile';

interface ProfileSidebarProps {
    profileData: any;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    imagePreview: string;
    handleImageChange: (file: File) => void;
    savingSections: {
        personal: boolean;
        address: boolean;
        astro: boolean;
        settings: boolean;
    };
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
    profileData,
    activeTab,
    setActiveTab,
    imagePreview,
    handleImageChange,
    savingSections
}) => {
    const { lang } = useLanguageStore();
    const t = profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en;

    const menuItems = [
        { icon: "fa-regular fa-user", label: t.sidebar.tabs.profile, id: "profile" },
        { icon: "fa-solid fa-wallet", label: t.sidebar.tabs.wallet, id: "wallet" },
        { icon: "fa-solid fa-gift", label: t.sidebar.tabs.rewards, id: "rewards" },
        { icon: "fa-regular fa-heart", label: t.sidebar.tabs.wishlist, id: "wishlist" },
        { icon: "fa-solid fa-clock-rotate-left", label: t.sidebar.tabs.history, id: "history" },
        { icon: "fa-solid fa-bag-shopping", label: t.sidebar.tabs.orders, id: "orders" },
        { icon: "fa-solid fa-scroll", label: t.sidebar.tabs.reports, id: "reports" },
        { icon: "fa-solid fa-circle-question", label: t.sidebar.tabs.disputes, id: "disputes" },
        { icon: "fa-solid fa-bell", label: t.sidebar.tabs.notifications, id: "notifications" },
        { icon: "fa-solid fa-headset", label: t.sidebar.tabs.support, id: "support" },
    ];

    return (
        <div className="flex flex-col gap-0 sticky top-24">
            <div className="bg-white rounded-t-2xl p-4 shadow-premium border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                        <div className="w-[64px] h-[64px] rounded-full overflow-hidden border-2 border-white shadow-md">
                            {savingSections.personal ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <Image
                                    src={imagePreview}
                                    alt="Profile"
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full text-[0]"
                                />
                            )}
                        </div>
                        <label
                            htmlFor="profile-upload"
                            className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer border border-gray-100 hover:bg-gray-50 transition-colors"
                            title={t.sidebar.updatePhoto}
                        >
                            <i className="fa-solid fa-camera text-[10px] text-brown"></i>
                            <input
                                id="profile-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        handleImageChange(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h6 className="font-bold text-gray-900 truncate flex items-center gap-1.5 m-0">
                            {profileData.full_name || profileData.username || t.sidebar.userNameFallback}
                            <i className="fa-solid fa-check-circle text-orange/80 text-[12px]"></i>
                        </h6>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">User Account</p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu - Scrollable */}
            <div
                className="bg-brown rounded-b-2xl shadow-premium overflow-y-auto custom-scrollbar"
                style={{
                    maxHeight: "calc(100vh - 160px)",
                }}
                data-lenis-prevent
            >
                <div className="pt-4 px-4 pb-2">
                    <small
                        className="text-[10px] uppercase font-bold tracking-wider text-white/50"
                        style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
                    >
                        {t.sidebar.accountMenu}
                    </small>
                </div>
                <div className="p-2 space-y-1">
                    {menuItems.map((item, index) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`w-full text-left border-0 rounded-xl flex items-center px-4 py-3 transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-orange text-white shadow-gold font-bold'
                                        : 'bg-transparent text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <i className={`${item.icon} w-5 mr-3 text-lg transition-transform group-hover:scale-110`}></i>
                                <span className="text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
