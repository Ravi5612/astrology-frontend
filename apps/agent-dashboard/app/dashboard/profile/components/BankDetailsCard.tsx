import React from "react";
import { Button } from "@repo/ui";
import { Landmark, PiggyBank, UserCircle2, Hash, BadgeCheck, Save, X } from "lucide-react";

interface BankDetailsCardProps {
    agent: any;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    formData: any;
    setFormData: (data: any) => void;
    onSave: (e: React.FormEvent) => void;
    saving: boolean;
}

export const BankDetailsCard: React.FC<BankDetailsCardProps> = ({
    agent,
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    onSave,
    saving
}) => {
    return (
        <div className="group bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden h-full flex flex-col transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30 group-hover:bg-gray-50/50 transition-colors duration-700">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white group-hover:rotate-[360deg] transition-transform duration-1000">
                        <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em]">Settlement</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 group-hover:text-[#F25E0A] transition-colors">Bank Account Settings</p>
                    </div>
                </div>
                
                {!isEditing ? (
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl font-black uppercase tracking-widest text-[9px] border-2 border-gray-100 text-gray-600 hover:border-[#F25E0A] hover:text-[#F25E0A] px-6 py-4 h-auto transition-all"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Details
                    </Button>
                ) : (
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="p-3 hover:bg-red-50 text-red-500 rounded-2xl transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                )}
            </div>

            <div className="p-8 flex-grow">
                {isEditing ? (
                    <form onSubmit={onSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup
                                label="Bank Name"
                                icon={PiggyBank}
                                value={formData.bank_name}
                                onChange={(val: string) => setFormData({...formData, bank_name: val})}
                                placeholder="e.g. HDFC Bank"
                            />
                            <InputGroup
                                label="Account Holder"
                                icon={UserCircle2}
                                value={formData.account_holder}
                                onChange={(val: string) => setFormData({...formData, account_holder: val})}
                                placeholder="e.g. Rajan Kumar"
                            />
                            <InputGroup
                                label="Account Number"
                                icon={Hash}
                                value={formData.account_number}
                                onChange={(val: string) => setFormData({...formData, account_number: val})}
                                placeholder="e.g. 501000XXXXXXXX"
                            />
                            <InputGroup
                                label="IFSC Code"
                                icon={BadgeCheck}
                                value={formData.ifsc_code}
                                onChange={(val: string) => setFormData({...formData, ifsc_code: val.toUpperCase()})}
                                placeholder="e.g. HDFC0001234"
                                uppercase
                            />
                        </div>
                        
                        <div className="pt-6 border-t border-gray-100">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="w-full rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] h-14 bg-[#F25E0A] hover:bg-[#D94E00] shadow-2xl shadow-[#F25E0A]/20 transition-all active:scale-95"
                            >
                                {saving ? "Securing Info..." : (
                                    <span className="flex items-center justify-center gap-4">
                                        <Save className="w-5 h-5" /> Confirm Settlement Details
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full items-center">
                        <DisplayGroup label="Bank Institution" value={agent?.bank_name} icon={PiggyBank} />
                        <DisplayGroup label="Account Holder" value={agent?.account_holder} icon={UserCircle2} />
                        <DisplayGroup label="Account Registry" value={agent?.account_number ? `•••• •••• ${agent.account_number.slice(-4)}` : null} icon={Hash} />
                        <DisplayGroup label="IFSC Protocol" value={agent?.ifsc_code} icon={BadgeCheck} />
                    </div>
                )}
            </div>
        </div>
    );
};

const InputGroup = ({ label, icon: Icon, value, onChange, placeholder, uppercase }: any) => (
    <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">{label}</label>
        <div className="relative group">
            <Icon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200 group-focus-within:text-[#F25E0A] transition-colors" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent focus:border-[#F25E0A]/10 focus:bg-white rounded-[1.5rem] text-[15px] font-black transition-all outline-none ${uppercase ? 'uppercase' : ''}`}
                required
            />
        </div>
    </div>
);

const DisplayGroup = ({ label, value, icon: Icon }: any) => (
    <div className="group p-8 rounded-[2rem] bg-gray-50 border-2 border-transparent hover:border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">
            <Icon className="w-4 h-4 text-gray-300" />
            {label}
        </div>
        <div className="text-[19px] font-black text-gray-900 tracking-tighter">
            {value || <span className="text-gray-200 italic font-bold">Pending Setup</span>}
        </div>
    </div>
);
