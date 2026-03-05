import React, { useState } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { profileTranslations } from '@/lib/translations/profile';
import { Button } from "@repo/ui";
import PhoneVerifyModal from './PhoneVerifyModal';

interface ProfileFormProps {
    profileData: any;
    clientUser: any;
    editingSections: {
        personal: boolean;
        address: boolean;
        astro: boolean;
        settings: boolean;
    };
    setEditingSections: React.Dispatch<React.SetStateAction<{
        personal: boolean;
        address: boolean;
        astro: boolean;
        settings: boolean;
    }>>;
    savingSections: {
        personal: boolean;
        address: boolean;
        astro: boolean;
        settings: boolean;
    };
    handleInputChange: (key: any, value: any) => void;
    handleAddressChange: (index: number, key: any, value: string) => void;
    handleSaveSection: (section: 'personal' | 'address' | 'astro' | 'settings') => void;
    refreshProfile?: () => Promise<void>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    profileData,
    clientUser,
    editingSections,
    setEditingSections,
    savingSections,
    handleInputChange,
    handleAddressChange,
    handleSaveSection,
    refreshProfile,
}) => {
    const { lang } = useLanguageStore();
    const t = profileTranslations[lang as keyof typeof profileTranslations] || profileTranslations.en;

    const [copied, setCopied] = useState(false);
    const [showPhoneVerify, setShowPhoneVerify] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(clientUser.uid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {/* Personal Details Card */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5
                        className="fw-bold mb-0"
                        style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                    >
                        <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "rgba(242, 94, 10, 0.1)", color: "var(--primary)" }}>
                            <i className="fa-regular fa-id-card"></i>
                        </span>
                        {t.personalDetails.title}
                    </h5>
                    {!editingSections.personal ? (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setEditingSections(prev => ({ ...prev, personal: true }))}
                            className="shadow-orange-200"
                            style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                            {t.personalDetails.edit}
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setEditingSections(prev => ({ ...prev, personal: false }))}
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.personalDetails.cancel}
                            </Button>
                            <Button
                                variant="success"
                                size="md"
                                loading={savingSections.personal}
                                onClick={() => handleSaveSection('personal')}
                                className="shadow-green-200"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.personalDetails.save}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="card-body p-4">
                    <div className="row g-4">


                        <div className="col-md-12">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.personalDetails.userId}
                            </label>
                            <div className="d-flex align-items-center gap-2">
                                <span
                                    className="fw-bold mb-0 px-3 py-1 rounded-full text-sm"
                                    style={{ backgroundColor: "rgba(255,107,0,0.1)", color: "#FF6B00", letterSpacing: "0.05em", fontFamily: "monospace" }}
                                >
                                    {clientUser?.uid || t.personalDetails.notAssigned}
                                </span>
                                {clientUser?.uid && (
                                    <button
                                        type="button"
                                        title={copied ? t.personalDetails.copied : t.personalDetails.copyId}
                                        className={`btn btn-sm px-2 py-1 ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
                                        style={{ fontSize: "11px", transition: "all 0.2s" }}
                                        onClick={handleCopy}
                                    >
                                        <i className={`fa-${copied ? 'solid fa-check' : 'regular fa-copy'}`}></i>
                                        {copied && <span className="ms-1" style={{ fontSize: "10px", fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>{t.personalDetails.copied}</span>}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.personalDetails.userName}
                            </label>
                            {editingSections.personal ? (
                                <input
                                    type="text"
                                    className="form-control fw-bold"
                                    value={profileData.username || ""}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                />
                            ) : (
                                <p className="fw-bold mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {profileData.username || t.personalDetails.notSet}
                                </p>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.personalDetails.email}
                            </label>
                            <p className="fw-bold mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {clientUser?.email || t.personalDetails.notSet}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <label className="text-muted small fw-bold text-uppercase mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.personalDetails.phone}
                                </label>
                                {profileData.phone && (
                                    profileData.phone_verified_at ? (
                                        <span
                                            className="badge px-2 py-1 d-inline-flex align-items-center gap-1"
                                            style={{ backgroundColor: "rgba(25,135,84,0.1)", color: "#198754", fontSize: "10px", fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                        >
                                            <i className="fa-solid fa-circle-check"></i> {t.personalDetails.verified}
                                        </span>
                                    ) : (
                                        <span
                                            className="badge px-2 py-1 d-inline-flex align-items-center gap-1"
                                            style={{ backgroundColor: "rgba(220,53,69,0.1)", color: "#dc3545", fontSize: "10px", fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                        >
                                            <i className="fa-solid fa-circle-xmark"></i> {t.personalDetails.unverified}
                                        </span>
                                    )
                                )}
                            </div>
                            {editingSections.personal ? (
                                <input
                                    type="text"
                                    className="form-control fw-bold"
                                    value={profileData.phone || ""}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                            ) : (
                                <div className="d-flex align-items-center gap-2">
                                    <p className="fw-bold mb-0">{profileData.phone || t.personalDetails.notSet}</p>
                                    {profileData.phone && !profileData.phone_verified_at && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPhoneVerify(true)}
                                            className="btn btn-sm px-3 py-1 lh-1 text-white fw-bold"
                                            style={{ fontSize: "11px", backgroundColor: "#fd6410", borderColor: "#fd6410", fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                        >
                                            {t.personalDetails.verifyNow}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.personalDetails.gender}
                            </label>
                            {editingSections.personal ? (
                                <select
                                    className="form-select fw-bold"
                                    value={profileData.gender || ""}
                                    onChange={(e) => handleInputChange('gender', e.target.value as any)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                >
                                    <option value="male">{t.personalDetails.genders.male}</option>
                                    <option value="female">{t.personalDetails.genders.female}</option>
                                    <option value="other">{t.personalDetails.genders.other}</option>
                                </select>
                            ) : (
                                <p className="fw-bold mb-0 text-capitalize" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {profileData.gender ? t.personalDetails.genders[profileData.gender as keyof typeof t.personalDetails.genders] : t.personalDetails.notSet}
                                </p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.personalDetails.maritalStatus}
                            </label>
                            {editingSections.personal ? (
                                <select
                                    className="form-select fw-bold"
                                    value={profileData.marital_status || ""}
                                    onChange={(e) => handleInputChange('marital_status', e.target.value)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                >
                                    <option value="">{t.personalDetails.maritalStatuses.select}</option>
                                    <option value="single">{t.personalDetails.maritalStatuses.single}</option>
                                    <option value="married">{t.personalDetails.maritalStatuses.married}</option>
                                    <option value="divorced">{t.personalDetails.maritalStatuses.divorced}</option>
                                    <option value="widowed">{t.personalDetails.maritalStatuses.widowed}</option>
                                    <option value="other">{t.personalDetails.maritalStatuses.other}</option>
                                </select>
                            ) : (
                                <p className="fw-bold mb-0 text-capitalize" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {profileData.marital_status ? t.personalDetails.maritalStatuses[profileData.marital_status as keyof typeof t.personalDetails.maritalStatuses] : t.personalDetails.notSet}
                                </p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.personalDetails.occupation}
                            </label>
                            {editingSections.personal ? (
                                <input
                                    type="text"
                                    className="form-control fw-bold"
                                    value={profileData.occupation || ""}
                                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                                    placeholder={t.personalDetails.occupationPlaceholder}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            ) : (
                                <p className="fw-bold mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {profileData.occupation || t.personalDetails.notSet}
                                </p>
                            )}
                        </div>

                        <div className="col-md-12">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.personalDetails.aboutMe}
                            </label>
                            {editingSections.personal ? (
                                <textarea
                                    className="form-control fw-bold"
                                    rows={3}
                                    value={profileData.about_me || ""}
                                    onChange={(e) => handleInputChange('about_me', e.target.value)}
                                    placeholder={t.personalDetails.aboutMePlaceholder}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            ) : (
                                <p className="fw-medium mb-0 text-gray-600 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {profileData.about_me || t.personalDetails.aboutMeFallback}
                                </p>
                            )}
                        </div>
                    </div>
                </div >
            </div >

            {/* Address Details Card */}
            < div className="card border-0 shadow-sm rounded-4 mb-4" >
                <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5
                        className="fw-bold mb-0"
                        style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                    >
                        <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#e2f8ff", color: "#00b4d8" }}>
                            <i className="fa-solid fa-location-dot"></i>
                        </span>
                        {t.addressDetails.title}
                    </h5>
                    {!editingSections.address ? (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setEditingSections(prev => ({ ...prev, address: true }))}
                            className="shadow-orange-200"
                            style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                        >
                            <i className="fa-solid fa-location-dot"></i>
                            {t.addressDetails.edit}
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setEditingSections(prev => ({ ...prev, address: false }))}
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.addressDetails.cancel}
                            </Button>
                            <Button
                                variant="success"
                                size="md"
                                loading={savingSections.address}
                                onClick={() => handleSaveSection('address')}
                                className="shadow-green-200"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.addressDetails.save}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="card-body p-4">
                    {editingSections.address ? (
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.addressDetails.line1}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.line1 || ""}
                                    onChange={(e) => handleAddressChange(0, 'line1', e.target.value)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.addressDetails.line2}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.line2 || ""}
                                    onChange={(e) => handleAddressChange(0, 'line2', e.target.value)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.addressDetails.city}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.city || ""}
                                    onChange={(e) => handleAddressChange(0, 'city', e.target.value)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.addressDetails.state}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.state || ""}
                                    onChange={(e) => handleAddressChange(0, 'state', e.target.value)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.addressDetails.country}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.country || ""}
                                    onChange={(e) => handleAddressChange(0, 'country', e.target.value)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.addressDetails.zipCode}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.zipCode || ""}
                                    onChange={(e) => handleAddressChange(0, 'zipCode', e.target.value)}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            {profileData.addresses && profileData.addresses.length > 0 ? (
                                <div className="d-flex align-items-start gap-3">
                                    <i className="fa-solid fa-map-location-dot text-muted mt-1"></i>
                                    <div>
                                        <p className="fw-bold mb-0">{profileData.addresses[0]?.line1}</p>
                                        {profileData.addresses[0]?.line2 && <p className="text-muted mb-0">{profileData.addresses[0]?.line2}</p>}
                                        <p className="text-muted mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                            {profileData.addresses[0]?.city}, {profileData.addresses[0]?.state}, {profileData.addresses[0]?.country} - {profileData.addresses[0]?.zipCode}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted italic mb-0" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    {t.addressDetails.noAddress}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div >

            {/* Astro Birth Details Card */}
            < div className="card border-0 shadow-sm rounded-4 mb-4" >
                <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5
                        className="fw-bold mb-0"
                        style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                    >
                        <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#f0f2f5", color: "#333" }}>
                            <i className="fa-regular fa-calendar"></i>
                        </span>
                        {t.astroDetails.title}
                    </h5>
                    {!editingSections.astro ? (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setEditingSections(prev => ({ ...prev, astro: true }))}
                            className="bg-purple-500 hover:bg-purple-600 shadow-purple-100"
                            style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                        >
                            <i className="fa-solid fa-moon"></i>
                            {t.astroDetails.edit}
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setEditingSections(prev => ({ ...prev, astro: false }))}
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.astroDetails.cancel}
                            </Button>
                            <Button
                                variant="success"
                                size="md"
                                loading={savingSections.astro}
                                onClick={() => handleSaveSection('astro')}
                                className="shadow-green-200"
                                style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                            >
                                {t.astroDetails.save}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="card-body p-4">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.astroDetails.dob}
                            </label>
                            {editingSections.astro ? (
                                <input
                                    type="date"
                                    className="form-control fw-bold"
                                    value={profileData.date_of_birth ? profileData.date_of_birth.split('T')[0] : ""}
                                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                                />
                            ) : (
                                <p className="fw-bold mb-0 text-dark">
                                    <i className="fa-regular fa-calendar me-2 text-warning"></i>
                                    {profileData.date_of_birth ? (
                                        new Date(profileData.date_of_birth).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                    ) : t.astroDetails.notSet}
                                </p>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.astroDetails.tob}
                            </label>
                            {editingSections.astro ? (
                                <input
                                    type="time"
                                    className="form-control fw-bold"
                                    value={profileData.time_of_birth || ""}
                                    onChange={(e) => handleInputChange('time_of_birth', e.target.value)}
                                />
                            ) : (
                                <p className="fw-bold mb-0 text-dark">
                                    <i className="fa-regular fa-clock me-2 text-warning"></i>{profileData.time_of_birth || t.astroDetails.notSet}
                                </p>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="text-muted small fw-bold text-uppercase mb-1" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                {t.astroDetails.pob}
                            </label>
                            {editingSections.astro ? (
                                <input
                                    type="text"
                                    className="form-control fw-bold"
                                    value={profileData.place_of_birth || ""}
                                    onChange={(e) => handleInputChange('place_of_birth', e.target.value)}
                                    placeholder={t.astroDetails.pobPlaceholder}
                                    style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}
                                />
                            ) : (
                                <p className="fw-bold mb-0 text-dark" style={{ fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit" }}>
                                    <i className="fa-solid fa-location-dot me-2 text-warning"></i>{profileData.place_of_birth || t.astroDetails.notSet}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Phone Verification Modal */}
            <PhoneVerifyModal
                isOpen={showPhoneVerify}
                onClose={() => setShowPhoneVerify(false)}
                phone={profileData.phone || ""}
                onSuccess={() => {
                    setShowPhoneVerify(false);
                    if (refreshProfile) refreshProfile();
                }}
            />
        </>
    );
};

export default ProfileForm;


