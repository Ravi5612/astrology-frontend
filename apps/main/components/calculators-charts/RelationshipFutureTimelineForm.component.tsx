import React from "react";
import { FaUser, FaArrowRight, FaSpinner } from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";
import { GiLotus } from "react-icons/gi";

type RelationshipType = "Crush" | "Dating" | "Married";

interface RelationshipFutureTimelineFormProps {
  yourName: string;
  setYourName: (val: string) => void;
  partnerName: string;
  setPartnerName: (val: string) => void;
  relationshipType: RelationshipType;
  setRelationshipType: (val: RelationshipType) => void;
  loading: boolean;
  canCalculate: boolean;
  handleCalculate: (e: React.FormEvent) => void;
}

const RelationshipFutureTimelineForm: React.FC<RelationshipFutureTimelineFormProps> = ({
  yourName,
  setYourName,
  partnerName,
  setPartnerName,
  relationshipType,
  setRelationshipType,
  loading,
  canCalculate,
  handleCalculate,
}) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-6">
        <div className="glass-card rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(48,17,24,0.1)] border-t-4 border-t-primary/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
            <GiLotus size={150} />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-xl md:text-3xl font-black text-[#301118] mb-2 tracking-tight">
              Relationship <span className="text-primary">Future</span> Timeline
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2"></div>
          </div>

          <form onSubmit={handleCalculate} className="max-w-3xl mx-auto">
            <div className="glass-card rounded-[2.5rem] p-6 md:p-10 shadow-[0_15px_40px_rgba(48,17,24,0.08)] border border-[#301118]/5 relative overflow-hidden bg-white space-y-6">
              {/* Names */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1">
                    Your Name
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      required
                      style={{ borderRadius: "9999px" }}
                      className="w-full bg-[#fdf2f2] border-2 border-[#301118]/5 px-5 py-3.5 text-[#301118] font-bold focus:border-red-500 outline-none transition-all placeholder:text-gray-300 shadow-sm text-sm"
                      placeholder="Type your name..."
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#301118]/30">
                      <FaUser size={14} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1">
                    Partner Name
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      required
                      style={{ borderRadius: "9999px" }}
                      className="w-full bg-[#fdf2f2] border-2 border-[#301118]/5 px-5 py-3.5 text-[#301118] font-bold focus:border-red-500 outline-none transition-all placeholder:text-gray-300 shadow-sm text-sm"
                      placeholder="Type partner name..."
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#301118]/30">
                      <FaUser size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Relationship Type */}
              <div>
                <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1">
                  Relationship Type
                </label>

                <div className="mt-2">
                  <select
                    value={relationshipType}
                    onChange={(e) =>
                      setRelationshipType(e.target.value as RelationshipType)
                    }
                    className="w-full bg-white border-2 border-[#301118]/5 rounded-2xl px-5 py-4 text-[#301118] font-black outline-none focus:border-primary transition-all"
                  >
                    <option value="Crush">Crush</option>
                    <option value="Dating">Dating</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              </div>

              {/* Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading || !canCalculate}
                  style={{ borderRadius: "9999px" }}
                  className="relative group inline-flex items-center gap-3 bg-red-600 text-white px-10 py-4 font-black uppercase tracking-[2px] text-xs hover:bg-red-700 transition-all duration-500 shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <TbCrystalBall size={18} />
                  )}
                  {loading ? "Predicting..." : "Generate Timeline"}
                  <FaArrowRight className="opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="w-full h-2 bg-red-500/20 rounded-full blur-lg translate-y-2 opacity-50"></div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RelationshipFutureTimelineForm;
