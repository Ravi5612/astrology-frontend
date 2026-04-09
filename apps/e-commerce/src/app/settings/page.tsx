"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Camera, 
  Store, 
  Phone, 
  MapPin, 
  User as UserIcon, 
  Save, 
  ShieldCheck,
  ChevronRight,
  Video,
  Play,
  ShoppingBag,
  ExternalLink,
  Eye,
  Loader2
} from "lucide-react";
import { useMerchantProfile, useUpdateProfile, useMerchantProducts } from "@/hooks/useSettings";

export default function ShopProfileSettings() {
  const { data: profile, isLoading: isProfileLoading } = useMerchantProfile();
  const updateProfileMutation = useUpdateProfile();
  const { data: productsData, isLoading: isProductsLoading } = useMerchantProducts();

  const products = useMemo(() => {
    console.log('Raw productsData in UI:', productsData);
    if (!productsData) return [];
    if (Array.isArray(productsData)) return productsData;
    const data = (productsData as any);
    const list = data?.data || data?.products || [];
    console.log('Extracted products list:', list);
    return Array.isArray(list) ? list : [];
  }, [productsData]);
  
  const [shopImagePreview, setShopImagePreview] = useState<string | null>(null);
  const [shopVideoPreview, setShopVideoPreview] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-Slider Logic
  useEffect(() => {
    if (products.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        // If we are at the end (with a small buffer for subpixel rendering), reset to start
        if (scrollLeft >= maxScroll - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by roughly one product width + gap
          scrollRef.current.scrollBy({ left: 120, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length, isPaused]);
  
  // Local state for files to be uploaded
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  // Real-time Preview State
  const [formData, setFormData] = useState({
    storeName: "",
    managerName: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  // Sync profile data to form on load
  useEffect(() => {
    if (profile) {
      setFormData({
        storeName: profile.name || "",
        managerName: profile.managerName || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        pincode: profile.pincode || ""
      });
      if (profile.image) setShopImagePreview(profile.image);
      if (profile.video) setShopVideoPreview(profile.video);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       setSelectedVideo(file);
       setShopVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('name', formData.storeName);
    data.append('managerName', formData.managerName);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('city', formData.city);
    data.append('pincode', formData.pincode);
    
    if (selectedImage) data.append('image', selectedImage);
    if (selectedVideo) data.append('video', selectedVideo);

    updateProfileMutation.mutate(data);
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#fd6410] animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Loading Shop Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-black text-[#fd6410] uppercase tracking-widest mb-1">
            <span>Settings</span>
            <ChevronRight className="w-3 h-3" />
            <span>Shop Profile</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Shop Profile Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your shop's identity and location details for customers.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={updateProfileMutation.isPending}
          className="flex items-center justify-center space-x-2 bg-[#fd6410] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20 active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateProfileMutation.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5 group-hover:animate-pulse" />
          )}
          <span>{updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (8 out of 12) */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-8">
          
          {/* Main Info Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#fd6410]" />
              Branding & Media
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Shop Photo</label>
                <div className="relative group w-full h-48">
                  <div className="w-full h-full rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#fd6410]/50">
                    {shopImagePreview ? (
                      <img src={shopImagePreview} alt="Shop Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <Store className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Add Main Photo</span>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 p-3 bg-[#fd6410] text-white rounded-xl cursor-pointer hover:bg-orange-600 transition-all shadow-lg group-hover:scale-105">
                    <Camera className="w-5 h-5" />
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
              </div>

              {/* Video Upload */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Store Video</label>
                <div className="relative group w-full h-48">
                  <div className="w-full h-full rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#fd6410]/50">
                    {shopVideoPreview ? (
                      <video src={shopVideoPreview} className="w-full h-full object-cover" autoPlay muted loop />
                    ) : (
                      <div className="text-center p-4">
                        <Video className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Add Shop Tour Video</span>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 p-3 bg-[#fd6410] text-white rounded-xl cursor-pointer hover:bg-orange-600 transition-all shadow-lg group-hover:scale-105">
                    <Video className="w-5 h-5" />
                    <input type="file" className="hidden" onChange={handleVideoChange} accept="video/*" />
                  </label>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Store Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <Store className="w-4 h-4 text-gray-300 group-focus-within:text-[#fd6410] transition-colors" />
                  </div>
                  <input 
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6410]/20 focus:border-[#fd6410] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Manager Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <UserIcon className="w-4 h-4 text-gray-300 group-focus-within:text-[#fd6410] transition-colors" />
                  </div>
                  <input 
                    name="managerName"
                    value={formData.managerName}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6410]/20 focus:border-[#fd6410] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Mobile Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <Phone className="w-4 h-4 text-gray-300 group-focus-within:text-[#fd6410] transition-colors" />
                  </div>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6410]/20 focus:border-[#fd6410] transition-all font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#fd6410]" />
              Store Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3} 
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6410]/20 focus:border-[#fd6410] transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">City</label>
                <input 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6410]/20 focus:border-[#fd6410] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Pincode</label>
                <input 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6410]/20 focus:border-[#fd6410] transition-all font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Shop Preview (Sticky) */}
        <div className="lg:col-span-12 xl:col-span-4 self-start sticky top-24 space-y-6">
           <div className="flex items-center justify-between px-4 mb-2">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Eye className="w-3 h-3" /> Live Shop Preview
              </h3>
              <div className="flex items-center space-x-1.5 py-1 px-3 bg-green-50 rounded-full border border-green-100">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Connected</span>
              </div>
           </div>

           {/* Preview Mock Frame */}
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group">
             {/* Main Shop Header Image */}
             <div className="relative h-48 bg-gray-50 overflow-hidden">
                {shopImagePreview ? (
                  <img src={shopImagePreview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Banner" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                    <Store className="w-12 h-12 text-orange-200" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-6 flex-col justify-end">
                   <h2 className="text-white font-bold text-xl drop-shadow-md truncate">{formData.storeName || "Shop Name"}</h2>
                   <div className="flex items-center text-orange-200 text-[10px] font-bold uppercase tracking-widest mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {formData.city || "City"}
                   </div>
                </div>
                {shopVideoPreview && (
                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                      <Play className="w-4 h-4 text-white fill-current" />
                   </div>
                )}
             </div>

             {/* Content In Preview */}
             <div className="p-6 space-y-6">
                {/* Store Intro */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">About Store</span>
                     <div className="flex items-center text-rose-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[9px] font-bold ml-1 uppercase">Trusted</span>
                     </div>
                   </div>
                   
                   <div className="flex items-start space-x-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#fd6410] shrink-0 mt-0.5" />
                      <p className="line-clamp-2 text-xs leading-relaxed">{formData.address || "Shop Address"}{formData.pincode ? `, ${formData.pincode}` : ""}</p>
                   </div>
                   
                   <div className="flex items-center space-x-3 text-xs text-gray-600">
                      <Phone className="w-4 h-4 text-[#fd6410] shrink-0" />
                      <p className="font-mono">{formData.phone || "+91 XXXXXXXXXX"}</p>
                   </div>
                </div>

                {/* Video/Media Integration */}
                {shopVideoPreview && (
                  <div className="rounded-2xl overflow-hidden h-32 bg-gray-900 relative group/video">
                     <video src={shopVideoPreview} className="w-full h-full object-cover opacity-70 group-hover/video:opacity-100 transition-opacity" muted loop autoPlay />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/40">
                           <Play className="w-5 h-5 text-white" />
                        </div>
                     </div>
                  </div>
                )}

                {/* Mock Products Grid */}
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Popular Products</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    {isProductsLoading ? (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-20 bg-gray-50 rounded-xl animate-pulse" />
                        <div className="h-20 bg-gray-50 rounded-xl animate-pulse" />
                      </div>
                    ) : products?.length > 0 ? (
                      <div 
                        ref={scrollRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none snap-x cursor-grab active:cursor-grabbing transition-all duration-500"
                      >
                        {products.map((product: any, idx: number) => (
                          <div key={idx} className="h-20 w-24 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 snap-start shadow-sm">
                             {product.productImage ? (
                               <img 
                                 src={product.productImage} 
                                 alt={product.productName} 
                                 className="w-full h-full object-cover transition-transform group-hover:scale-110"
                               />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                 <ShoppingBag className="w-4 h-4 text-gray-300" />
                               </div>
                             )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-20 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">No Products Found</span>
                      </div>
                    )}
                 </div>

                <button className="w-full py-3 bg-gray-900 text-white text-[10px] font-black rounded-xl uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black transition-all">
                  Visit Full Store <ExternalLink className="w-3 h-3" />
                </button>
             </div>
           </div>

           <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 space-y-2">
              <p className="text-[10px] text-orange-900 font-bold uppercase tracking-widest">Developer Note</p>
              <p className="text-[11px] text-orange-800/70 leading-relaxed italic">"The changes you make on the left will reflect here instantly. This is exactly how your customer sees your shop."</p>
           </div>
        </div>
      </div>
    </div>
  );
}
