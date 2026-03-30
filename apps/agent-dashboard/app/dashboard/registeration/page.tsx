"use client";
import React, { useState } from "react";
import { Button } from "@repo/ui";
import {
    UserPlus, Copy, CheckCircle, Eye, EyeOff, X,
    Star, Users, Building2, ShoppingBag,
    MapPin, Phone, Clock, Flame,
} from "lucide-react";
import { toast } from "react-toastify";
import { registerUserByAgent, createListing } from "@/src/services/agent.service";

// ── Tab types ────────────────────────────────────────────────────────────────

type TabId = "expert" | "client" | "mandir" | "puja_shop";

interface TabConfig {
    id: TabId;
    label: string;
    emoji: string;
    icon: React.ElementType;
    activeBg: string;
    activeText: string;
    borderColor: string;
    infoText: string;
}

const TABS: TabConfig[] = [
    {
        id: "expert",
        label: "Astrologer",
        emoji: "⭐",
        icon: Star,
        activeBg: "bg-yellow-700",
        activeText: "text-white",
        borderColor: "border-yellow-700",
        infoText: "A temporary password will be generated. Share it with the astrologer — it won't be shown again.",
    },
    {
        id: "client",
        label: "Client",
        emoji: "👤",
        icon: Users,
        activeBg: "bg-primary",
        activeText: "text-white",
        borderColor: "border-primary",
        infoText: "A temporary password will be generated. Share it with the client — it won't be shown again.",
    },
    {
        id: "mandir",
        label: "Mandir",
        emoji: "🛕",
        icon: Building2,
        activeBg: "bg-orange-700",
        activeText: "text-white",
        borderColor: "border-orange-700",
        infoText: "Register a new mandir listing. It will be submitted for review before going live.",
    },
    {
        id: "puja_shop",
        label: "Puja Shop",
        emoji: "🪔",
        icon: ShoppingBag,
        activeBg: "bg-purple-800",
        activeText: "text-white",
        borderColor: "border-purple-800",
        infoText: "Register a new puja shop listing. It will be submitted for review before going live.",
    },
];

// ── Empty forms ──────────────────────────────────────────────────────────────
const EMPTY_USER_FORM = { name: "", email: "", phone: "" };

interface MandirForm {
    name: string;
    location: string;
    mainDeity: string;
    contact: string;
    openingTime: string;
    closingTime: string;
}
const EMPTY_MANDIR: MandirForm = {
    name: "", location: "", mainDeity: "",
    contact: "", openingTime: "", closingTime: "",
};

// ── Shared input style ───────────────────────────────────────────────────────
const INPUT_CLS =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition placeholder:text-gray-400";

// ── Label ────────────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">
            {children}
        </label>
    );
}

// ── Success Modal (for user registration) ────────────────────────────────────
function SuccessModal({
    tempPassword,
    registeredUser,
    onClose,
}: {
    tempPassword: string;
    registeredUser: any;
    onClose: () => void;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyPassword = () => {
        navigator.clipboard.writeText(tempPassword);
        setCopied(true);
        toast.success("Password copied!");
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-5">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900">Registration Successful!</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {registeredUser.name} has been registered as{" "}
                        <span className="font-bold text-primary capitalize">
                            {registeredUser.roles?.[0]?.name || registeredUser.role || "user"}
                        </span>
                    </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-1.5">
                    <p className="text-xs text-gray-500">Name: <span className="font-bold text-gray-800">{registeredUser.name}</span></p>
                    <p className="text-xs text-gray-500">Email: <span className="font-bold text-gray-800">{registeredUser.email}</span></p>
                    <p className="text-xs text-gray-500">Role: <span className="font-bold text-gray-800 capitalize">{registeredUser.roles?.[0]?.name || registeredUser.role || "user"}</span></p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">⚠️ Temporary Password — Share Once Only!</p>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 text-lg font-black text-amber-900 tracking-widest">
                            {showPassword ? tempPassword : "••••••••"}
                        </code>
                        <button onClick={() => setShowPassword((v) => !v)} className="text-amber-600 hover:text-amber-800 p-1 transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={copyPassword}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied ? "bg-green-100 text-green-700" : "bg-amber-200 text-amber-800 hover:bg-amber-300"}`}
                        >
                            {copied ? <><CheckCircle className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                        </button>
                    </div>
                </div>

                <p className="text-xs text-gray-400 text-center mb-4">
                    This password will <strong>not be shown again</strong> after you close this window.
                </p>

                <Button variant="primary" fullWidth onClick={onClose}>
                    Done — I&apos;ve noted the password
                </Button>
            </div>
        </div>
    );
}

// ── Listing Success Modal (mandir / puja shop) ────────────────────────────────
function ListingSuccessModal({ name, type, onClose }: { name: string; type: string; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900">Listing Submitted!</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        <span className="font-bold text-gray-800">{name}</span> has been submitted as a{" "}
                        <span className="font-bold text-primary capitalize">{type === "puja_shop" ? "Puja Shop" : "Mandir"}</span> listing.
                    </p>
                    <p className="text-xs text-gray-400 mt-3 mb-6">
                        Your listing is pending review and will go live once approved by the admin.
                    </p>
                    <Button variant="primary" fullWidth onClick={onClose}>
                        Great, Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ── Expert / Client Form ──────────────────────────────────────────────────────
function UserForm({ userType }: { userType: "expert" | "client" }) {
    const [form, setForm] = useState(EMPTY_USER_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [tempPassword, setTempPassword] = useState<string | null>(null);
    const [registeredUser, setRegisteredUser] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            toast.error("Please fill all required fields");
            return;
        }
        setSubmitting(true);
        const [res, error] = await registerUserByAgent({ ...form, userType });
        
        if (error) {
            toast.error(error.message || "Registration failed. Try again.");
        } else if (res) {
            setTempPassword(res.tempPassword);
            setRegisteredUser(res.user);
            setForm(EMPTY_USER_FORM);
            if (res.emailSent === false) {
                toast.warning(`Registered, but credentials email failed: ${res.emailError || "Unknown error"}. Share the password manually.`);
            } else {
                toast.success(`${userType === "expert" ? "Astrologer" : "Client"} registered successfully! ✅`);
            }
        }
        setSubmitting(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        { key: "name", label: "Full Name *", placeholder: userType === "expert" ? "Pt. Ramesh Sharma" : "Rakesh Kumar", type: "text", full: true },
                        { key: "email", label: "Email *", placeholder: "example@gmail.com", type: "email", full: false },
                        { key: "phone", label: "Phone *", placeholder: "9876543210", type: "tel", full: false },
                    ].map(({ key, label, placeholder, type, full }) => (
                        <div key={key} className={full ? "sm:col-span-2" : ""}>
                            <FieldLabel>{label}</FieldLabel>
                            <input
                                type={type}
                                placeholder={placeholder}
                                value={(form as any)[key]}
                                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                                className={INPUT_CLS}
                            />
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 font-medium">
                    ℹ️ A temporary password will be generated after registration. Share it with the {userType === "expert" ? "astrologer" : "client"} —{" "}
                    <strong>it won&apos;t be shown again.</strong>
                </div>

                <Button variant="primary" type="submit" icon={UserPlus} disabled={submitting} fullWidth>
                    {submitting ? "Registering…" : `Register ${userType === "expert" ? "Astrologer" : "Client"}`}
                </Button>
            </form>

            {tempPassword && registeredUser && (
                <SuccessModal
                    tempPassword={tempPassword}
                    registeredUser={registeredUser}
                    onClose={() => { setTempPassword(null); setRegisteredUser(null); }}
                />
            )}
        </>
    );
}

// ── Mandir / Puja Shop Form ──────────────────────────────────────────────────
function PlaceForm({ type }: { type: "mandir" | "puja_shop" }) {
    const [form, setForm] = useState<MandirForm>(EMPTY_MANDIR);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const isMandir = type === "mandir";
    const entityLabel = isMandir ? "Mandir" : "Puja Shop";
    const accentColor = isMandir ? "orange" : "purple";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.location.trim()) {
            toast.error(`Please fill the ${entityLabel} name and location`);
            return;
        }
        setSubmitting(true);
        const [res, error] = await createListing({
            type: type === "mandir" ? "mandir" : "puja_shop",
            name: form.name,
            location: form.location,
            phone: form.contact,
            deity: form.mainDeity,
            // Pass opening/closing time as part of items field for now
            items: `Opening: ${form.openingTime} | Closing: ${form.closingTime}`,
        });

        if (error) {
            toast.error(error.message || "Failed to submit listing");
        } else {
            setForm(EMPTY_MANDIR);
            setSuccess(true);
            toast.success(`${entityLabel} listing submitted for review! 🙏`);
        }
        setSubmitting(false);
    };

    const inputFocusRing = isMandir
        ? "focus:ring-orange-400/40 focus:border-orange-300"
        : "focus:ring-purple-400/40 focus:border-purple-300";

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name */}
                <div>
                    <FieldLabel>{entityLabel} Name *</FieldLabel>
                    <input
                        type="text"
                        placeholder={isMandir ? "e.g. Shri Kashi Vishwanath Mandir" : "e.g. Puja Samagri Bhandar"}
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={`${INPUT_CLS} ${inputFocusRing}`}
                    />
                </div>

                {/* Row 2: Location + Main Deity */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <FieldLabel>
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" /> Location *
                            </span>
                        </FieldLabel>
                        <input
                            type="text"
                            placeholder="City, State"
                            value={form.location}
                            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                            className={`${INPUT_CLS} ${inputFocusRing}`}
                        />
                    </div>
                    <div>
                        <FieldLabel>
                            <span className="flex items-center gap-1.5">
                                <Flame className="w-3 h-3" /> Main Deity
                            </span>
                        </FieldLabel>
                        <input
                            type="text"
                            placeholder={isMandir ? "e.g. Lord Shiva" : "e.g. Ganesha Items"}
                            value={form.mainDeity}
                            onChange={(e) => setForm((f) => ({ ...f, mainDeity: e.target.value }))}
                            className={`${INPUT_CLS} ${inputFocusRing}`}
                        />
                    </div>
                </div>

                {/* Row 3: Contact + Opening + Closing */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                        <FieldLabel>
                            <span className="flex items-center gap-1.5">
                                <Phone className="w-3 h-3" /> Contact
                            </span>
                        </FieldLabel>
                        <input
                            type="tel"
                            placeholder="9876543210"
                            value={form.contact}
                            onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                            className={`${INPUT_CLS} ${inputFocusRing}`}
                        />
                    </div>
                    <div>
                        <FieldLabel>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3" /> Opening Time
                            </span>
                        </FieldLabel>
                        <input
                            type="time"
                            value={form.openingTime}
                            onChange={(e) => setForm((f) => ({ ...f, openingTime: e.target.value }))}
                            className={`${INPUT_CLS} ${inputFocusRing}`}
                        />
                    </div>
                    <div>
                        <FieldLabel>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3" /> Closing Time
                            </span>
                        </FieldLabel>
                        <input
                            type="time"
                            value={form.closingTime}
                            onChange={(e) => setForm((f) => ({ ...f, closingTime: e.target.value }))}
                            className={`${INPUT_CLS} ${inputFocusRing}`}
                        />
                    </div>
                </div>

                {/* Info box */}
                <div className={`bg-${accentColor}-50 border border-${accentColor}-100 rounded-xl p-4 text-xs font-medium text-${accentColor}-700`}>
                    🙏 This {entityLabel} listing will be reviewed by admin before it goes live on the platform.
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    icon={isMandir ? Building2 : ShoppingBag}
                    disabled={submitting}
                    fullWidth
                >
                    {submitting ? "Submitting…" : `Submit ${entityLabel} Listing`}
                </Button>
            </form>

            {success && (
                <ListingSuccessModal
                    name={form.name || entityLabel}
                    type={type}
                    onClose={() => setSuccess(false)}
                />
            )}
        </>
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterUserPage() {
    const [activeTab, setActiveTab] = useState<TabId>("expert");

    const currentTab = TABS.find((t) => t.id === activeTab)!;

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900">Register / Add Listing</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                    Register a user or add a new mandir / puja shop listing
                </p>
            </div>

            {/* 4 Tab Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            id={`register-tab-${tab.id}`}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border text-xs font-bold
                                transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/30
                                ${isActive
                                    ? `${tab.activeBg} ${tab.activeText} border-transparent shadow-md scale-[1.03]`
                                    : `bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300`
                                }
                            `}
                        >
                            <span className="text-xl leading-none">{tab.emoji}</span>
                            <Icon className={`w-4 h-4 ${isActive ? "text-white/90" : "text-gray-400"}`} />
                            <span className={isActive ? "text-white" : "text-gray-600"}>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Form Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {/* Card header strip */}
                <div className={`${currentTab.activeBg} px-6 py-3 flex items-center gap-2`}>
                    <span className="text-lg">{currentTab.emoji}</span>
                    <p className={`text-sm font-black ${currentTab.activeText}`}>
                        {activeTab === "expert" && "Register New Astrologer"}
                        {activeTab === "client" && "Register New Client"}
                        {activeTab === "mandir" && "Add New Mandir Listing"}
                        {activeTab === "puja_shop" && "Add New Puja Shop Listing"}
                    </p>
                </div>

                <div className="p-6">
                    {(activeTab === "expert" || activeTab === "client") && (
                        <UserForm key={activeTab} userType={activeTab} />
                    )}
                    {activeTab === "mandir" && <PlaceForm key="mandir" type="mandir" />}
                    {activeTab === "puja_shop" && <PlaceForm key="puja_shop" type="puja_shop" />}
                </div>
            </div>
        </div>
    );
}
