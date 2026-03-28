import React from "react";
import { Calendar, Compass, Loader2 } from "lucide-react";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";

interface PlanetFormProps {
  formData: {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    latitude: string;
    longitude: string;
    timezone: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleLocationSelect: (loc: { name: string; lat: string; lon: string }) => void;
  locationName: string;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  renderIcon: (IconComponent: any, props?: any) => React.ReactNode;
}

const PlanetForm: React.FC<PlanetFormProps> = ({
  formData,
  handleChange,
  handleLocationSelect,
  locationName,
  loading,
  handleSubmit,
  renderIcon,
}) => {
  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 sticky top-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-orange-50 p-3 rounded-2xl">
            {renderIcon(Calendar, { className: "text-primary", size: 24 })}
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Birth Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">Date</label>
              <input
                type="number"
                name="date"
                className="w-full px-4 py-3 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                placeholder="DD"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">Month</label>
              <input
                type="number"
                name="month"
                className="w-full px-4 py-3 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                placeholder="MM"
                value={formData.month}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">Year</label>
            <input
              type="number"
              name="year"
              className="w-full px-4 py-3 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all"
              placeholder="YYYY"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Hour</label>
              <input
                type="number"
                name="hours"
                className="w-full px-3 py-3 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                placeholder="HH"
                value={formData.hours}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Min</label>
              <input
                type="number"
                name="minutes"
                className="w-full px-3 py-3 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                placeholder="MM"
                value={formData.minutes}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Sec</label>
              <input
                type="number"
                name="seconds"
                className="w-full px-3 py-3 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                placeholder="SS"
                value={formData.seconds}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">Location</label>
            <LocationAutocomplete
              onSelect={handleLocationSelect}
              initialValue={locationName}
              placeholder="Search city..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">Timezone (GMT)</label>
            <input
              type="number"
              step="0.1"
              name="timezone"
              className="w-full px-4 py-3 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary transition-all"
              value={formData.timezone}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold shadow-[0_10px_20px_rgba(242,94,10,0.3)] transition-all flex items-center justify-center gap-3 group mt-8"
            disabled={loading}
          >
            {loading ? (
              renderIcon(Loader2, { className: "animate-spin", size: 20 })
            ) : (
              <>
                <span>Get Results</span>
                {renderIcon(Compass, { size: 18, className: "group-hover:rotate-45 transition-transform" })}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanetForm;
