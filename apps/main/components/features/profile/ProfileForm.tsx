import React, { useState } from 'react';
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
                    <h5 className="fw-bold mb-0">
                        <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "rgba(242, 94, 10, 0.1)", color: "var(--primary)" }}>
                            <i className="fa-regular fa-id-card"></i>
                        </span>
                        Personal Details
                    </h5>
                    {!editingSections.personal ? (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setEditingSections(prev => ({ ...prev, personal: true }))}
                            className="shadow-orange-200"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setEditingSections(prev => ({ ...prev, personal: false }))}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                size="md"
                                loading={savingSections.personal}
                                onClick={() => handleSaveSection('personal')}
                                className="shadow-green-200"
                            >
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>
                <div className="card-body p-4">
                    <div className="row g-4">


                        <div className="col-md-12">
                            <label className="text-muted small fw-bold text-uppercase mb-1">User ID</label>
                            <div className="d-flex align-items-center gap-2">
                                <span
                                    className="fw-bold mb-0 px-3 py-1 rounded-full text-sm"
                                    style={{ backgroundColor: "rgba(255,107,0,0.1)", color: "#FF6B00", letterSpacing: "0.05em", fontFamily: "monospace" }}
                                >
                                    {clientUser?.uid || "Not assigned"}
                                </span>
                                {clientUser?.uid && (
                                    <button
                                        type="button"
                                        title={copied ? "Copied!" : "Copy ID"}
                                        className={`btn btn-sm px-2 py-1 ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
                                        style={{ fontSize: "11px", transition: "all 0.2s" }}
                                        onClick={handleCopy}
                                    >
                                        <i className={`fa-${copied ? 'solid fa-check' : 'regular fa-copy'}`}></i>
                                        {copied && <span className="ms-1" style={{ fontSize: "10px" }}>Copied!</span>}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1">User Name</label>
                            {editingSections.personal ? (
                                <input
                                    type="text"
                                    className="form-control fw-bold"
                                    value={profileData.username || ""}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                />
                            ) : (
                                <p className="fw-bold mb-0">{profileData.username || "Not set"}</p>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1">EMAIL ADDRESS</label>
                            <p className="fw-bold mb-0">{clientUser?.email || "Not set"}</p>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <label className="text-muted small fw-bold text-uppercase mb-0">PHONE NUMBER</label>
                                {profileData.phone && (
                                    profileData.phone_verified_at ? (
                                        <span
                                            className="badge px-2 py-1 d-inline-flex align-items-center gap-1"
                                            style={{ backgroundColor: "rgba(25,135,84,0.1)", color: "#198754", fontSize: "10px" }}
                                        >
                                            <i className="fa-solid fa-circle-check"></i> VERIFIED
                                        </span>
                                    ) : (
                                        <span
                                            className="badge px-2 py-1 d-inline-flex align-items-center gap-1"
                                            style={{ backgroundColor: "rgba(220,53,69,0.1)", color: "#dc3545", fontSize: "10px" }}
                                        >
                                            <i className="fa-solid fa-circle-xmark"></i> UNVERIFIED
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
                                    <p className="fw-bold mb-0">{profileData.phone || "Not set"}</p>
                                    {profileData.phone && !profileData.phone_verified_at && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPhoneVerify(true)}
                                            className="btn btn-sm px-3 py-1 lh-1 text-white fw-bold"
                                            style={{ fontSize: "11px", backgroundColor: "#fd6410", borderColor: "#fd6410" }}
                                        >
                                            Verify Now
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1">GENDER</label>
                            {editingSections.personal ? (
                                <select
                                    className="form-select fw-bold"
                                    value={profileData.gender || ""}
                                    onChange={(e) => handleInputChange('gender', e.target.value as any)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : (
                                <p className="fw-bold mb-0 text-capitalize">{profileData.gender || "Not set"}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1">MARITAL STATUS</label>
                            {editingSections.personal ? (
                                <select
                                    className="form-select fw-bold"
                                    value={profileData.marital_status || ""}
                                    onChange={(e) => handleInputChange('marital_status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : (
                                <p className="fw-bold mb-0 text-capitalize">{profileData.marital_status || "Not set"}</p>
                            )}
                        </div>

                        <div className="col-md-6">
                            <label className="text-muted small fw-bold text-uppercase mb-1">OCCUPATION</label>
                            {editingSections.personal ? (
                                <input
                                    type="text"
                                    className="form-control fw-bold"
                                    value={profileData.occupation || ""}
                                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                                    placeholder="e.g. Software Engineer, Business Owner"
                                />
                            ) : (
                                <p className="fw-bold mb-0">{profileData.occupation || "Not set"}</p>
                            )}
                        </div>

                        <div className="col-md-12">
                            <label className="text-muted small fw-bold text-uppercase mb-1">ABOUT ME / NOTES FOR ASTROLOGER</label>
                            {editingSections.personal ? (
                                <textarea
                                    className="form-control fw-bold"
                                    rows={3}
                                    value={profileData.about_me || ""}
                                    onChange={(e) => handleInputChange('about_me', e.target.value)}
                                    placeholder="Share your spiritual journey or specific problems you're seeking guidance for..."
                                />
                            ) : (
                                <p className="fw-medium mb-0 text-gray-600 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200">
                                    {profileData.about_me || "Share details about yourself to help astrologers provide better guidance."}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Details Card */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">
                        <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#e2f8ff", color: "#00b4d8" }}>
                            <i className="fa-solid fa-location-dot"></i>
                        </span>
                        Address Details
                    </h5>
                    {!editingSections.address ? (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setEditingSections(prev => ({ ...prev, address: true }))}
                            className="shadow-orange-200"
                        >
                            <i className="fa-solid fa-location-dot"></i>
                            Edit Address
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setEditingSections(prev => ({ ...prev, address: false }))}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                size="md"
                                loading={savingSections.address}
                                onClick={() => handleSaveSection('address')}
                                className="shadow-green-200"
                            >
                                Save Address
                            </Button>
                        </div>
                    )}
                </div>
                <div className="card-body p-4">
                    {editingSections.address ? (
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="text-muted small fw-bold text-uppercase mb-1">Address Line 1</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.line1 || ""}
                                    onChange={(e) => handleAddressChange(0, 'line1', e.target.value)}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="text-muted small fw-bold text-uppercase mb-1">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.line2 || ""}
                                    onChange={(e) => handleAddressChange(0, 'line2', e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted small fw-bold text-uppercase mb-1">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.city || ""}
                                    onChange={(e) => handleAddressChange(0, 'city', e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted small fw-bold text-uppercase mb-1">State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.state || ""}
                                    onChange={(e) => handleAddressChange(0, 'state', e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="text-muted small fw-bold text-uppercase mb-1">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.country || ""}
                                    onChange={(e) => handleAddressChange(0, 'country', e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="text-muted small fw-bold text-uppercase mb-1">Zip Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profileData.addresses?.[0]?.zipCode || ""}
                                    onChange={(e) => handleAddressChange(0, 'zipCode', e.target.value)}
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
                                        <p className="text-muted mb-0">
                                            {profileData.addresses[0]?.city}, {profileData.addresses[0]?.state}, {profileData.addresses[0]?.country} - {profileData.addresses[0]?.zipCode}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted italic mb-0">No address set. Click Edit to add one.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Astro Birth Details Card */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">
                        <span className="me-2 p-2 rounded-circle" style={{ backgroundColor: "#f0f2f5", color: "#333" }}>
                            <i className="fa-regular fa-calendar"></i>
                        </span>
                        Astro Birth Details
                    </h5>
                    {!editingSections.astro ? (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setEditingSections(prev => ({ ...prev, astro: true }))}
                            className="bg-purple-500 hover:bg-purple-600 shadow-purple-100"
                        >
                            <i className="fa-solid fa-moon"></i>
                            Edit Birth Data
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setEditingSections(prev => ({ ...prev, astro: false }))}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                size="md"
                                loading={savingSections.astro}
                                onClick={() => handleSaveSection('astro')}
                                className="shadow-green-200"
                            >
                                Save Birth Data
                            </Button>
                        </div>
                    )}
                </div>
                <div className="card-body p-4">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label className="text-muted small fw-bold text-uppercase mb-1">DATE OF BIRTH</label>
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
                                    ) : "Not set"}
                                </p>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="text-muted small fw-bold text-uppercase mb-1">TIME OF BIRTH</label>
                            {editingSections.astro ? (
                                <input
                                    type="time"
                                    className="form-control fw-bold"
                                    value={profileData.time_of_birth || ""}
                                    onChange={(e) => handleInputChange('time_of_birth', e.target.value)}
                                />
                            ) : (
                                <p className="fw-bold mb-0 text-dark"><i className="fa-regular fa-clock me-2 text-warning"></i>{profileData.time_of_birth || "Not set"}</p>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="text-muted small fw-bold text-uppercase mb-1">BIRTH PLACE</label>
                            {editingSections.astro ? (
                                <input
                                    type="text"
                                    className="form-control fw-bold"
                                    value={profileData.place_of_birth || ""}
                                    onChange={(e) => handleInputChange('place_of_birth', e.target.value)}
                                    placeholder="City, Country"
                                />
                            ) : (
                                <p className="fw-bold mb-0 text-dark"><i className="fa-solid fa-location-dot me-2 text-warning"></i>{profileData.place_of_birth || "Not set"}</p>
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


