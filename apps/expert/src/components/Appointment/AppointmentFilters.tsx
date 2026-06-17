import React from "react";
import { Search, List, LayoutGrid } from "lucide-react";
import Button from "../ui/Button";

interface AppointmentFiltersProps {
    view: "list" | "calendar";
    setView: (view: "list" | "calendar") => void;
    searchTerm: string;
    onSearch: (value: string) => void;
    activeStatus: string;
    onStatusChange: (status: string) => void;
}

export default function AppointmentFilters({
    view,
    setView,
    searchTerm,
    onSearch,
    activeStatus,
    onStatusChange,
}: AppointmentFiltersProps) {
    // Utility function for classnames
    const cn = (...classes: (string | undefined | null | boolean)[]) =>
        classes.filter(Boolean).join(" ");

    return (
        <section aria-labelledby="appointment-filters-heading">
            <h2 id="appointment-filters-heading" className="sr-only">
                Appointment Filters
            </h2>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 bg-linear-to-br from-white to-gray-50/50 flex flex-col gap-4">
                {/* Search Input */}
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Search by name or service..."
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        aria-label="Search appointments"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">
                        {/* @ts-ignore */}
                        <Search size={20} />
                    </span>
                </div>

                {/* Controls Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Status Filters */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={() => onStatusChange('all')}
                            variant={activeStatus === 'all' ? "primary" : "secondary"}
                            size="sm"
                            className="rounded-full cursor-pointer hover:cursor-pointer"
                        >
                            All
                        </Button>
                        <Button
                            onClick={() => onStatusChange('today')}
                            variant={activeStatus === 'today' ? "primary" : "secondary"}
                            size="sm"
                            className={cn("rounded-full cursor-pointer hover:cursor-pointer", activeStatus === 'today' ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600")}
                        >
                            Today
                        </Button>
                        <Button
                            onClick={() => onStatusChange('completed')}
                            variant={activeStatus === 'completed' ? "primary" : "secondary"}
                            size="sm"
                            className={cn("rounded-full cursor-pointer hover:cursor-pointer", activeStatus === 'completed' ? "bg-green-600 hover:bg-green-700" : "text-green-600")}
                        >
                            Completed
                        </Button>
                        <Button
                            onClick={() => onStatusChange('expired')}
                            variant={activeStatus === 'expired' ? "primary" : "secondary"}
                            size="sm"
                            className={cn("rounded-full cursor-pointer hover:cursor-pointer", activeStatus === 'expired' ? "bg-red-600 hover:bg-red-700" : "text-red-600")}
                        >
                            Expired
                        </Button>
                    </div>

                    {/* Sort and View */}
                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            className="px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-black cursor-pointer hover:cursor-pointer"
                            aria-label="Sort appointments"
                            defaultValue="earliest"
                        >
                            <option value="earliest">Sort by Time (Earliest)</option>
                            <option value="latest">Sort by Time (Latest)</option>
                        </select>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => setView("list")}
                                variant={view === "list" ? "primary" : "secondary"}
                                size="md"
                                className="p-2.5 rounded-lg cursor-pointer hover:cursor-pointer"
                                aria-label="Switch to list view"
                            >
                                <List className="w-5 h-5" />
                            </Button>
                            <Button
                                onClick={() => setView("calendar")}
                                variant={view === "calendar" ? "primary" : "secondary"}
                                size="md"
                                className="p-2.5 rounded-lg cursor-pointer hover:cursor-pointer"
                                aria-label="Switch to calendar view"
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
