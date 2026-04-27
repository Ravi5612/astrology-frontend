"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Package,
  ArrowUpDown,
  Check,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { productService } from "@/services/product.service";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "out_of_stock";
  imageUrl?: string;
  sku?: string;
}

export default function ProductListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ['merchant-products', activeTab, searchTerm],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (activeTab !== "All") {
        params.status = activeTab === "Out of Stock" ? "out_of_stock" : activeTab.toLowerCase();
      }
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      const [data, error] = await productService.getProducts(params);
      if (error) throw new Error(error.message || "Failed to fetch products");
      return data;
    }
  });

  const products: Product[] = data?.products || [];

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const [data, error] = await productService.deleteProduct(id);
      if (error) throw new Error(error.message || "Failed to delete product");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant-products'] });
      setSelectedIds([]);
    }
  });

  const bulkStatusMutation = useMutation({
    mutationFn: async ({ ids, status }: { ids: string[], status: 'active' | 'out_of_stock' }) => {
      const [data, error] = await productService.bulkUpdateStatus(ids, status);
      if (error) throw new Error(error.message || "Failed to update status");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant-products'] });
      setSelectedIds([]);
    }
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === products.length && products.length > 0 ? [] : products.map(p => p.id));
  };

  const getFrontendStatus = (status: string) => {
    if (status === 'out_of_stock') return 'Out of Stock';
    if (status === 'active') return 'Active';
    if (status === 'draft') return 'Draft';
    return status;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return "bg-green-50 text-green-700 border-green-100 ring-green-500/20";
      case "out_of_stock": return "bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/20";
      case "draft": return "bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/20";
      default: return "bg-gray-50 text-gray-700 border-gray-100 ring-gray-400/20";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const tabs = ["All", "Active", "Out of Stock", "Draft"];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Product Inventory</h2>
          <div className="flex items-center text-gray-500 text-sm mt-1">
             {isLoading ? (
               <Loader2 className="w-4 h-4 animate-spin text-[#fd6410] mr-2" />
             ) : (
               <span className="font-bold text-[#fd6410]">{data?.total || 0}</span>
             )}
             <span className="ml-1 italic">Total Products in current catalog</span>
          </div>
        </div>
        <Link 
          href="/products/add" 
          className="flex items-center justify-center space-x-2 bg-[#fd6410] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20 active:scale-95 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Control Bar (Tabs & Search) */}
      <div className="space-y-4">
        {/* Bulk Action Bar (Floating) */}
        {selectedIds.length > 0 && (
          <div className="bg-gray-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl animate-in slide-in-from-top-4 duration-300 ring-4 ring-gray-900/10">
             <div className="flex items-center space-x-4 pl-2">
                <div className="w-8 h-8 bg-[#fd6410] rounded-full flex items-center justify-center shadow-inner">
                   <Check className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm tracking-tight">{selectedIds.length} Products Selected</span>
             </div>
             <div className="flex items-center space-x-3 pr-2">
                <button 
                  onClick={() => bulkStatusMutation.mutate({ ids: selectedIds, status: 'active' })}
                  disabled={bulkStatusMutation.isPending}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                   <CheckCircle2 className="w-3.5 h-3.5" /> Mark Active
                </button>
                <button 
                  onClick={() => bulkStatusMutation.mutate({ ids: selectedIds, status: 'out_of_stock' })}
                  disabled={bulkStatusMutation.isPending}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                   <XCircle className="w-3.5 h-3.5" /> Out of Stock
                </button>
                <div className="w-[1px] h-6 bg-white/10" />
                <button 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete these products?")) {
                      selectedIds.forEach(id => deleteMutation.mutate(id));
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-xl text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                   <Trash2 className="w-3.5 h-3.5" /> Delete Selected
                </button>
             </div>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
          {/* Tabs */}
          <div className="flex p-1.5 bg-white border border-gray-100 rounded-2xl shadow-sm space-x-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 uppercase tracking-widest text-[10px]",
                  activeTab === tab 
                    ? "bg-[#fd6410] text-white shadow-md" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#fd6410] transition-colors" />
              <input 
                type="text" 
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#fd6410] transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Advanced Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden overflow-x-auto ring-1 ring-gray-200/50">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
            <tr>
              <th className="pl-8 pr-4 py-5 w-10">
                <button 
                  onClick={toggleSelectAll}
                  className={cn(
                    "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                    selectedIds.length === products.length && products.length > 0
                      ? "bg-[#fd6410] border-[#fd6410] text-white" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  {selectedIds.length === products.length && products.length > 0 && <Check className="w-3.5 h-3.5 stroke-[4]" />}
                </button>
              </th>
              <th className="px-4 py-5">Product Info</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">
                 <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-600 transition-colors">
                    Price <ArrowUpDown className="w-3 h-3" />
                 </div>
              </th>
              <th className="px-6 py-5">Stock</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-10">
                   <TableSkeleton rows={8} cols={7} />
                </td>
              </tr>
            ) : products.map((p: Product) => {
              const isSelected = selectedIds.includes(p.id);
              return (
                <tr 
                   key={p.id} 
                   className={cn(
                     "group transition-all duration-300",
                     isSelected ? "bg-orange-50/50" : "hover:bg-gray-50/50"
                   )}
                >
                  <td className="pl-8 pr-4 py-6">
                    <button 
                      onClick={() => toggleSelect(p.id)}
                      className={cn(
                        "w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center",
                        isSelected 
                          ? "bg-[#fd6410] border-[#fd6410] text-white" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[4]" />}
                    </button>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 overflow-hidden flex-shrink-0 shadow-sm relative">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-orange-50/50 flex items-center justify-center">
                             <Package className="w-6 h-6 text-orange-200" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#fd6410] transition-colors">{p.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">ID: {String(p.id).substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                     <span className="py-1.5 px-3 bg-gray-50 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500 border border-gray-100">
                       {p.category}
                     </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-sm text-gray-900 tracking-tight">{formatPrice(p.price)}</td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                       <span className="font-bold text-xs text-gray-700">{p.stock} units</span>
                       <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                          <div 
                             className={cn("h-full rounded-full transition-all duration-1000", p.stock > 0 ? "bg-[#fd6410]" : "bg-gray-300")} 
                             style={{ width: `${Math.min(100, (p.stock / 20) * 100)}%` }}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ring-2 ring-offset-0 transition-all", getStatusBadge(p.status))}>
                      {getFrontendStatus(p.status)}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-1 transition-all duration-300">
                      <Link href={`/products/view/${p.id}`}>
                        <button className="p-2.5 text-gray-400 hover:text-orange-500 hover:bg-orange-100/50 rounded-xl transition-all" title="View">
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                      <Link href={`/products/edit/${p.id}`}>
                        <button className="p-2.5 text-gray-400 hover:text-[#fd6410] hover:bg-orange-100/50 rounded-xl transition-all" title="Edit">
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => {
                          if (window.confirm("Delete this product?")) {
                            deleteMutation.mutate(p.id);
                          }
                        }}
                        className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" 
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <div className="bg-white py-24 px-8 flex flex-col items-center justify-center text-center rounded-[2.5rem] border border-gray-100 shadow-xl">
           <div className="p-8 bg-orange-50 rounded-full mb-8 relative">
              <Package className="w-12 h-12 text-[#fd6410]" />
              <div className="absolute -top-1 -right-1 bg-white p-1.5 rounded-full shadow-sm">
                 <XCircle className="w-4 h-4 text-rose-400" />
              </div>
           </div>
           <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">No matching products</h3>
           <p className="text-gray-500 text-sm max-w-xs mt-3 italic leading-relaxed">No results found for your search or filters. Try adjusting your criteria or add a new product.</p>
           <button 
              onClick={() => {setSearchTerm(""); setActiveTab("All");}}
              className="mt-8 text-xs font-black text-[#fd6410] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              Clear all filters <ChevronRight className="w-3 h-3" />
            </button>
        </div>
      )}
    </div>
  );
}
