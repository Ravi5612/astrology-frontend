import React from 'react';
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
        <div>
            <div className="card border-0 rounded-top-4 mb-0 p-3 shadow-lg" style={{ backgroundColor: "white" }}>
                <div className="card-body p-0 d-flex align-items-center gap-3">
                    <div className="position-relative d-inline-block flex-shrink-0">
                        <div style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "3px solid #fff",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}>
                            {savingSections.personal ? (
                                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
                                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                </div>
                            ) : (
                                <img
                                    src={imagePreview}
                                    alt="Profile"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            )}
                        </div>
                        <label
                            htmlFor="profile-upload"
                            className="position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm cursor-pointer mb-0"
                            style={{
                                width: "24px",
                                height: "24px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "#301118",
                                border: "1px solid #fff",
                                transition: "all 0.3s ease",
                                transform: "translate(20%, 20%)"
                            }}
                            title={t.sidebar.updatePhoto}
                        >
                            <i className="fa-solid fa-camera" style={{ fontSize: "10px" }}></i>
                            <input
                                id="profile-upload"
                                type="file"
                                className="d-none"
                                accept="image/*"
                                onChange={(e) => {
                                    console.log("📁 File input onChange triggered!");
                                    if (e.target.files && e.target.files[0]) {
                                        handleImageChange(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="text-start">
                        <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-1">
                            {profileData.username || t.sidebar.userNameFallback}
                            <i className="fa-solid fa-check-circle text-brown" style={{ fontSize: "12px" }}></i>
                        </h6>
                    </div>
                </div>
            </div>

            {/* Navigation Menu - Scrollable */}
            <div
                className="card border-0 rounded-bottom-4 overflow-y-auto shadow-lg bg-brown"
                style={{
                    maxHeight: "calc(100vh - 120px)",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255, 255, 255, 0.5) transparent"
                }}
                data-lenis-prevent
            >
                <div className="border-0 pt-3 px-3">
                    <small
                        className="text-uppercase fw-bold"
                        style={{ fontSize: "11px", letterSpacing: "1px", color: "white", fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                    >
                        {t.sidebar.accountMenu}
                    </small>
                </div>
                <div className=" p-2">
                    {menuItems.map((item, index) => {
                        const baseStyle = activeTab === item.id
                            ? { backgroundColor: "#FF6B00", color: "white" }
                            : { color: "white" };

                        return (
                            <a
                                key={index}
                                href="#"
                                className={`border-0 rounded-3 d-flex align-items-center px-3 py-3 mb-1 transition-all text-decoration-none ${activeTab === item.id
                                    ? 'fw-bold shadow-sm'
                                    : ''
                                    }`}
                                style={
                                    lang === "hi" ? { ...baseStyle, fontFamily: "'Noto Sans Devanagari', sans-serif" } : baseStyle
                                }
                                onMouseEnter={(e) => {
                                    if (activeTab !== item.id) {
                                        e.currentTarget.style.backgroundColor = "#FF6B00";
                                        e.currentTarget.style.color = "white";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== item.id) {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                        e.currentTarget.style.color = "white";
                                    }
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(item.id);
                                }}
                            >
                                <i className={`${item.icon} me-3`} style={{ width: "20px" }}></i>
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
