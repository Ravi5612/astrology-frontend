"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { getErrorMessage } from "@repo/lib";
import PersonalInfo from "./PersonalInfo";
import TodoList from "./TodoList";
import PayoutInfo from "./PayoutInfo";
import PortfolioGallery from "./PortfolioGallery";
import VerificationAndDocuments from "./VerificationAndDocuments";
import ExpertiseAvailability from "./ExpertiseAvailability";
import { 
    Profile, 
    Todo, 
    DocumentItem, 
    ExperienceItem, 
    Gender 
} from "@/types/profile";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfile, constructProfilePayload } from "@/hooks/useProfile";
import { uploadDocument } from "@/lib/profile";
import { ProfileSkeleton } from "../dashboard/DashboardSkeletons";

const ProfileManagement = () => {
    const { user: authUser } = useAuthStore();
    const { 
        profile: fetchedProfile, 
        isLoading, 
        hasProfile, 
        todos, 
        updateSection, 
        todoActions 
    } = useProfile();

    const [editMode, setEditMode] = useState<string | null>(null);
    const [tempProfile, setTempProfile] = useState<Profile | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [pendingProfilePicFile, setPendingProfilePicFile] = useState<File | null>(null);

    // Sync tempProfile when fetchedProfile arrives
    useEffect(() => {
        if (fetchedProfile && !tempProfile) {
            setTempProfile(fetchedProfile);
        }
    }, [fetchedProfile, tempProfile]);

    const handleEditClick = (section: string) => {
        setEditMode(section);
        setTempProfile(fetchedProfile || null);
    };

    const handleCancel = () => {
        setEditMode(null);
        if (tempProfile?.profilePic?.startsWith('blob:')) {
            URL.revokeObjectURL(tempProfile.profilePic);
        }
        setPendingProfilePicFile(null);
        setTempProfile(fetchedProfile || null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setTempProfile((prev) => prev ? ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }) : null);
    };

    const handleSave = async (section: string, updatedData?: Partial<Profile>) => {
        if (!tempProfile) return;
        setIsSaving(true);
        
        try {
            const dataToSave = updatedData ? { ...tempProfile, ...updatedData } : tempProfile;
            let finalProfilePic = dataToSave.profilePic;

            // Handle pending profile pic upload
            if (section === 'personal' && pendingProfilePicFile) {
                const [uploadRes, uploadError] = await uploadDocument(pendingProfilePicFile);
                if (uploadError) throw uploadError;
                finalProfilePic = uploadRes.fileUrl || uploadRes.url || uploadRes.path;
                setPendingProfilePicFile(null);
            }

            const payload = constructProfilePayload({ ...dataToSave, profilePic: finalProfilePic || "" });
            
            await updateSection({ 
                section, 
                data: payload, 
                isNew: !hasProfile 
            });
            
            setEditMode(null);
        } catch (error: any) {
            toast.error(getErrorMessage(error) || "Failed to save profile");
        } finally {
            setIsSaving(false);
        }
    };

    // File Handlers
    const handleUploadDoc = async (file: File, category?: 'aadhar' | 'pan' | 'other', side?: 'front' | 'back') => {
        const [data, error] = await uploadDocument(file);
        if (error) { 
            toast.error(getErrorMessage(error) || "Upload failed"); 
            return; 
        }
        
        const newDoc: DocumentItem = {
            id: Date.now(),
            name: file.name,
            type: file.type,
            url: data.fileUrl || data.url || data.path,
            category,
            side
        };
        const updatedDocs = [...(fetchedProfile?.documents || []), newDoc];
        handleSave("documents", { documents: updatedDocs });
    };

    const handleProfilePicUpdate = (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        setTempProfile(prev => prev ? ({ ...prev, profilePic: previewUrl }) : null);
        setPendingProfilePicFile(file);
        toast.info("Preview updated. Click 'Save' to upload.");
    };

    if (isLoading || !fetchedProfile || !tempProfile) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Profile Management</h1>
                <p className="text-gray-600 text-sm sm:text-base">Manage your personal info, expertise, availability, and payout details.</p>
            </div>

            {/* Verification Status Alerts */}
            {(() => {
                const kycStatus = (authUser?.kycStatus || authUser?.status || "").toString().toLowerCase();
                const reason = authUser?.rejectionReason || authUser?.profile_expert?.rejectionReason;
                const isApproved = kycStatus === 'active' || kycStatus === 'approved';
                const isRejected = kycStatus === 'rejected' || (kycStatus === 'pending' && !!reason);

                if (isApproved) return null;
                if (isRejected) {
                    return (
                        <div className="mb-6 bg-rose-50 border-2 border-rose-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center text-white shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-bold text-rose-900 mb-1">Update Required: Profile Rejected</h4>
                                <p className="text-sm text-rose-700 leading-relaxed italic">&quot;{reason || "Please verify your information and try again."}&quot;</p>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
                        <p className="text-orange-800 font-medium text-sm">Your account is currently inactive. Complete profile and KYC for review.</p>
                    </div>
                );
            })()}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PersonalInfo
                    profile={fetchedProfile}
                    tempProfile={tempProfile}
                    isEditing={editMode === "personal"}
                    onEdit={() => handleEditClick("personal")}
                    onSave={() => handleSave("personal")}
                    onCancel={handleCancel}
                    onChange={handleChange}
                    onProfilePicUpdate={handleProfilePicUpdate}
                    onLanguageChange={(e) => setTempProfile(p => p ? ({ ...p, languages: e.target.value.split(',') }) : null)}
                />

                <ExpertiseAvailability
                    profile={fetchedProfile}
                    tempProfile={tempProfile}
                    isEditing={editMode === "pricing"}
                    onEdit={() => handleEditClick("pricing")}
                    onSave={() => handleSave("pricing")}
                    onCancel={handleCancel}
                    onChange={handleChange}
                    onLanguageChange={(langs) => setTempProfile(p => p ? ({ ...p, languages: langs }) : null)}
                />

                <PortfolioGallery
                    images={fetchedProfile.gallery}
                    videos={fetchedProfile.videos}
                    introVideo={fetchedProfile.video || ""}
                    tempIntroVideo={tempProfile.video || ""}
                    isEditingIntro={editMode === "video"}
                    onEditIntro={() => handleEditClick("video")}
                    onSaveIntro={() => handleSave("video")}
                    onCancelIntro={handleCancel}
                    onIntroVideoChange={handleChange}
                    onUploadIntroVideo={async (f) => {
                        const [d, e] = await uploadDocument(f);
                        if (!e) handleSave("video", { video: d.fileUrl || d.url });
                        else toast.error(getErrorMessage(e) || "Video upload failed");
                    }}
                    onRemoveIntro={() => handleSave("video", { video: "" })}
                    onAddImage={async (f) => {
                        const [d, e] = await uploadDocument(f);
                        if (!e) handleSave("portfolio", { gallery: [...fetchedProfile.gallery, d.fileUrl || d.url] });
                        else toast.error(getErrorMessage(e) || "Image upload failed");
                    }}
                    onRemoveImage={(idx) => handleSave("portfolio", { gallery: fetchedProfile.gallery.filter((_, i) => i !== idx) })}
                    onAddVideo={(url) => handleSave("portfolio", { videos: [...fetchedProfile.videos, url] })}
                    onRemoveVideo={(idx) => handleSave("portfolio", { videos: fetchedProfile.videos.filter((_, i) => i !== idx) })}
                    onUploadVideoFile={async (f) => {
                        const [d, e] = await uploadDocument(f);
                        if (!e) handleSave("portfolio", { videos: [...fetchedProfile.videos, d.fileUrl || d.url] });
                        else toast.error(getErrorMessage(e) || "Video upload failed");
                    }}
                />

                <PayoutInfo />

                <VerificationAndDocuments
                    kycCompleted={fetchedProfile.kycCompleted}
                    onStartKYC={() => toast.info("KYC verification process initiated.")}
                    documents={fetchedProfile.documents || []}
                    onUploadDocument={handleUploadDoc}
                    onDeleteDocument={(id) => handleSave("documents", { documents: fetchedProfile.documents?.filter(d => d.id !== id) })}
                    certificates={fetchedProfile.certificates || []}
                    onUploadCertificate={async (f) => {
                        const [d, e] = await uploadDocument(f);
                        if (!e) handleSave("certificates", { certificates: [...(fetchedProfile.certificates || []), d.fileUrl || d.url] });
                        else toast.error(getErrorMessage(e) || "Certificate upload failed");
                    }}
                />

                <TodoList
                    todos={todos}
                    onAdd={(t: string) => { todoActions.add(t); }}
                    onToggle={(id: number) => { 
                        const todo = todos.find(t => t.id === id);
                        if (todo) todoActions.toggle({ id, completed: !todo.completed }); 
                    }}
                    onDelete={(id: number) => { todoActions.remove(id); }}
                />
            </div>
        </div>
    );
};

export default ProfileManagement;


