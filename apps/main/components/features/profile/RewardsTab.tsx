import React from "react";
import { toast } from "react-toastify";
import { useLanguageStore } from "@/store/languageStore";
import { profileTranslations } from "@/lib/translations/profile";

interface RewardsTabProps {
    notifications?: any[]; // It was in the code, but maybe not used in this tab. The file name is RewardsTab.
    loadingRewards: boolean;
    rewards: any[];
}

const RewardsTab: React.FC<RewardsTabProps> = ({
    loadingRewards,
    rewards
}) => {
    const { lang } = useLanguageStore();
    const t = (profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en).rewards;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  return (
    <div className="bg-white border-0 shadow-premium rounded-2xl mb-6 overflow-hidden">
      <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h5
          className="text-lg font-bold text-gray-900 mb-0 flex items-center"
          style={fontStyle}
        >
          <span className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mr-3 flex-shrink-0">
            <i className="fa-solid fa-gift"></i>
          </span>
          {t.title}
        </h5>
      </div>
      <div className="p-6 md:p-8 pt-6">
        {loadingRewards ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-orange/10 border-t-orange animate-spin"></div>
            </div>
            <p className="text-gray-400 font-medium" style={fontStyle}>
              {t.loading}
            </p>
          </div>
        ) : rewards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 border border-gray-100 shadow-inner translate-y-2">
              <i className="fa-solid fa-ticket text-3xl text-gray-200"></i>
            </div>
            <h6 className="font-bold text-gray-900 text-lg mb-2" style={fontStyle}>
              {t.noRewards}
            </h6>
            <p className="text-gray-500 text-sm max-w-xs m-0" style={fontStyle}>
              {t.noRewardsHint}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((userCoupon: any, idx: number) => {
              const coupon = userCoupon.coupon || userCoupon;

              const d_value = coupon.value || coupon.discountValue || 0;
              const d_type = coupon.type || coupon.discountType || "percentage";
              const d_minOrder =
                coupon.minOrderValue ||
                coupon.min_order_value ||
                userCoupon.minOrderValue ||
                userCoupon.min_order_value ||
                "0";
              const d_expiry =
                coupon.expiryDate ||
                coupon.expiry_date ||
                userCoupon.expiryDate ||
                userCoupon.expiry_date;
              const d_isUsed = userCoupon.is_used || userCoupon.isUsed || false;

              return (
                <div
                  key={userCoupon.id || idx}
                  className={`group relative border-2 border-dashed rounded-3xl p-6 transition-all duration-300 ${
                    d_isUsed
                      ? "bg-gray-50 border-gray-200 grayscale-[0.5]"
                      : "bg-orange-50/50 border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange/5"
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 py-1.5 px-4 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider ${
                      d_isUsed
                        ? "bg-gray-400 text-white"
                        : "bg-orange text-white shadow-lg"
                    }`}
                    style={fontStyle}
                  >
                    {d_isUsed ? t.used : t.active}
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 ${
                        d_isUsed ? "bg-gray-100" : "bg-white border border-white"
                      }`}
                    >
                      <i
                        className={`fa-solid ${
                          d_type === "percentage" ? "fa-percent" : "fa-gift"
                        } text-2xl ${
                          d_isUsed ? "text-gray-300" : "text-orange"
                        }`}
                      ></i>
                    </div>
                    <div>
                      <h6
                        className={`font-black text-xl mb-1 tracking-tight ${
                          d_isUsed ? "text-gray-400" : "text-gray-900"
                        }`}
                      >
                        {coupon.code}
                      </h6>
                      <p
                        className={`font-bold text-sm tracking-wide m-0 ${
                          d_isUsed ? "text-gray-400/70" : "text-orange"
                        }`}
                        style={fontStyle}
                      >
                        {d_type === "percentage"
                          ? `${d_value}% OFF`
                          : `${t.flatOff} ₹${d_value} OFF`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center text-[10px] text-gray-500 mb-6 py-3 px-4 bg-white/50 rounded-2xl border border-white/50">
                    <span className="flex items-center gap-1.5" style={fontStyle}>
                      <i className="fa-solid fa-circle-info text-gray-300"></i>
                      {t.minOrder}: ₹{d_minOrder}
                    </span>
                    {d_expiry && (
                      <span className="flex items-center gap-1.5" style={fontStyle}>
                        <i className="fa-regular fa-clock text-gray-300"></i>
                        {t.exp}: {new Date(d_expiry).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={d_isUsed}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transition-all duration-300 flex items-center justify-center gap-3 shadow-sm border-0 ${
                      d_isUsed
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-orange hover:bg-orange hover:text-white hover:shadow-lg hover:shadow-orange/20"
                    }`}
                    onClick={() => {
                      if (!d_isUsed) {
                        navigator.clipboard.writeText(coupon.code);
                        toast.success(t.copied);
                      }
                    }}
                  >
                    <i className="fa-regular fa-copy text-lg"></i>
                    <span style={fontStyle}>
                      {d_isUsed ? t.alreadyRedeemed : t.copyCode}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 flex items-center gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm flex-shrink-0 z-10 transition-transform group-hover:rotate-12">
            <i className="fa-solid fa-circle-info"></i>
          </div>
          <p className="text-blue-700 text-[11px] font-bold m-0 leading-relaxed z-10" style={fontStyle}>
            {t.infoBox}
          </p>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
        </div>
      </div>
    </div>
  );
};

export default RewardsTab;


