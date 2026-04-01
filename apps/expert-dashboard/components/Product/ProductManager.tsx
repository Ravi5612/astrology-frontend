"use client";

import React, { useState, useEffect } from "react";
import {
    Plus, Package, Pencil, Trash2, Search, X,
    Upload, Link as LinkIcon, Image as ImageIcon,
    Star, Heart, ToggleLeft, ToggleRight,
} from "lucide-react";
import { Product, ProductService } from "@/services/products.service";

const parsePrice = (value: any) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
};

export default function ProductManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState<Product>({
        name: "",
        shortDescription: "",
        description: "",
        price: 0,
        originalPrice: 0,
        stock: 0,
        imageUrl: "",
        isActive: true,
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imageMode, setImageMode] = useState<"file" | "url">("file");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getProducts();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const resetForm = () => {
        setFormData({ name: "", shortDescription: "", description: "", price: 0, originalPrice: 0, stock: 0, imageUrl: "", isActive: true });
        setEditingId(null);
        setSelectedFile(null);
        setImageMode("file");
        setShowForm(false);
    };

    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name,
            shortDescription: product.shortDescription || "",
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            stock: product.stock || 0,
            imageUrl: product.imageUrl,
            isActive: product.isActive !== undefined ? product.isActive : true,
        });
        setEditingId(product.id || product._id || null);
        setImageMode(product.imageUrl?.startsWith("http") ? "url" : "file");
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await ProductService.deleteProduct(id);
            fetchProducts();
        } catch (err: any) {
            alert(err.message || "Failed to delete product");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const fd = new FormData();
            fd.append("name", formData.name);
            fd.append("shortDescription", formData.shortDescription || "");
            fd.append("description", formData.description);
            fd.append("price", String(formData.price));
            fd.append("originalPrice", String(formData.originalPrice));
            fd.append("stock", String(formData.stock || 0));
            if (formData.isActive !== undefined) fd.append("isActive", String(formData.isActive));

            if (imageMode === "file" && selectedFile) {
                fd.append("file", selectedFile);
            } else if (imageMode === "url" && formData.imageUrl) {
                fd.append("imageUrl", formData.imageUrl);
            } else if (editingId && formData.imageUrl) {
                fd.append("imageUrl", formData.imageUrl);
            } else if (!editingId && !selectedFile && !formData.imageUrl) {
                alert("Please provide an image URL or upload a file.");
                return;
            }

            if (editingId) {
                await ProductService.updateProduct(editingId, fd);
            } else {
                await ProductService.createProduct(fd);
            }
            resetForm();
            fetchProducts();
        } catch (err: any) {
            alert(err.message || "Failed to save product");
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "originalPrice" || name === "stock" ? Number(value) : value,
        }));
    };

    const discount =
        parsePrice(formData.originalPrice) > parsePrice(formData.price)
            ? Math.round(
                ((parsePrice(formData.originalPrice) - parsePrice(formData.price)) /
                    parsePrice(formData.originalPrice)) *
                100
            )
            : 0;

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Products</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage and sell your astrology products.</p>
                </div>
                <button
                    onClick={() => {
                        if (showForm) {
                            resetForm(); // this also sets showForm(false)
                        } else {
                            // Clear form data and open fresh
                            setFormData({ name: "", shortDescription: "", description: "", price: 0, originalPrice: 0, stock: 0, imageUrl: "", isActive: true });
                            setEditingId(null);
                            setSelectedFile(null);
                            setImageMode("file");
                            setShowForm(true);
                        }
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md ${showForm
                        ? "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                        : "bg-[#F25E0A] hover:bg-[#d94f00] text-white"
                        }`}
                >
                    {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Product</>}
                </button>
            </header>

            {/* ── ADD / EDIT FORM ── */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-5">
                        {editingId ? "Edit Product" : "Add New Product"}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#F25E0A]/30 focus:border-[#F25E0A] outline-none transition-all"
                                placeholder="e.g. Rudraksha Mala"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Image</label>
                            <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-2 w-fit">
                                <button
                                    type="button"
                                    onClick={() => setImageMode("file")}
                                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-colors ${imageMode === "file" ? "bg-[#F25E0A] text-white" : "text-gray-600 hover:bg-gray-50"}`}
                                >
                                    <Upload className="w-3.5 h-3.5" /> Upload File
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImageMode("url")}
                                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-colors ${imageMode === "url" ? "bg-[#F25E0A] text-white" : "text-gray-600 hover:bg-gray-50"}`}
                                >
                                    <LinkIcon className="w-3.5 h-3.5" /> Image URL
                                </button>
                            </div>
                            {imageMode === "file" ? (
                                <div className="relative border-2 border-dashed border-gray-200 rounded-lg h-[42px] flex items-center justify-center cursor-pointer hover:bg-orange-50/40 hover:border-[#F25E0A]/50 transition-all">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex items-center gap-2 text-gray-400 text-xs pointer-events-none">
                                        {selectedFile ? (
                                            <><ImageIcon className="w-4 h-4" /> {selectedFile.name}</>
                                        ) : (
                                            <><Upload className="w-4 h-4" /> Choose File</>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#F25E0A]/30 focus:border-[#F25E0A] outline-none transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                            )}
                        </div>

                        {/* Short Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Short Description (Subtitle) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleInputChange}
                                required
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#F25E0A]/30 focus:border-[#F25E0A] outline-none transition-all"
                                placeholder="e.g. Natural crystal stones for energy balance"
                            />
                            <p className="text-xs text-gray-400 mt-1">Appears right under the title in the product card.</p>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#F25E0A]/30 focus:border-[#F25E0A] outline-none transition-all resize-none"
                                placeholder="Product description..."
                            />
                        </div>

                        {/* Prices */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Actual Price / MRP (₹)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={formData.originalPrice}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#F25E0A]/30 focus:border-[#F25E0A] outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Selling Price (₹) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#F25E0A]/30 focus:border-[#F25E0A] outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Stock <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                min="0"
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#F25E0A]/30 focus:border-[#F25E0A] outline-none transition-all"
                                placeholder="10"
                            />
                        </div>

                        {/* Discount preview */}
                        {discount > 0 && (
                            <div className="md:col-span-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                                <span>🎉</span>
                                <p className="text-green-700 text-sm font-medium">
                                    {discount}% OFF will be shown to users
                                </p>
                            </div>
                        )}

                        {/* Active Status */}
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                                    className="shrink-0"
                                >
                                    {formData.isActive
                                        ? <ToggleRight className="w-8 h-8 text-[#F25E0A]" />
                                        : <ToggleLeft className="w-8 h-8 text-gray-300" />
                                    }
                                </button>
                                <span className="text-sm font-medium text-gray-700">Active Status</span>
                            </label>
                            <p className="text-xs text-gray-400 mt-1 ml-10">
                                Inactive products will be hidden from the public shop.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex justify-end gap-3 pt-2 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={submitting}
                                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-8 py-2.5 text-sm font-semibold text-white bg-[#F25E0A] hover:bg-[#d94f00] rounded-xl shadow-md transition-colors disabled:opacity-60"
                            >
                                {submitting ? "Saving..." : editingId ? "Update Product" : "Save Product"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Search */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 mb-6 flex items-center gap-2 shadow-sm">
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products by name..."
                        className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                    />
                </div>

                {/* Product Grid */}
                {loading ? (
                    <p className="text-center text-gray-400 py-16">Loading products...</p>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center flex flex-col items-center shadow-sm">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                            <Package className="w-10 h-10 text-[#F25E0A]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                        <p className="text-gray-400 max-w-sm mb-6 text-sm">
                            {searchQuery ? `No products match "${searchQuery}".` : "You haven't added any products yet."}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="border-2 border-[#F25E0A] text-[#F25E0A] hover:bg-orange-50 px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm"
                            >
                                Add Your First Product
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredProducts.map((product) => {
                            const disc =
                                product.originalPrice > product.price
                                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                                    : 0;
                            return (
                                <div
                                    key={product.id || product._id}
                                    className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                                >
                                    <div className="aspect-square bg-orange-50/30 rounded-xl relative overflow-hidden p-4 flex items-center justify-center mb-3">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    "https://via.placeholder.com/400x400?text=No+Image";
                                            }}
                                        />
                                        {disc > 0 && (
                                            <div className="absolute top-2.5 left-2.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow">
                                                {disc}% OFF
                                            </div>
                                        )}
                                        {!product.isActive && (
                                            <div className="absolute top-2.5 left-2.5 bg-gray-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow">
                                                Inactive
                                            </div>
                                        )}
                                        <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
                                            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                                        </div>
                                    </div>

                                    <div className="px-1 flex-1 flex flex-col">
                                        <h3 className="font-bold text-gray-900 text-[15px] leading-tight line-clamp-2 mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2 line-clamp-1 font-medium">
                                            {product.shortDescription || "Astrology Product"}
                                        </p>
                                        <p className="text-xs text-gray-400 mb-3 line-clamp-2 flex-1">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-end gap-2">
                                                <span className="text-xl font-black text-[#F25E0A]">₹{product.price}</span>
                                                {product.originalPrice > product.price && (
                                                    <span className="text-sm text-gray-400 line-through mb-0.5">
                                                        ₹{product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${(product.stock || 0) > 5
                                                    ? "bg-green-50 text-green-600 border border-green-100"
                                                    : (product.stock || 0) > 0
                                                        ? "bg-orange-50 text-orange-600 border border-orange-100"
                                                        : "bg-red-50 text-red-600 border border-red-100"
                                                }`}>
                                                {(product.stock || 0) > 0 ? `${product.stock} in stock` : "Out of stock"}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="flex items-center justify-center py-2 text-xs font-semibold text-[#F25E0A] border-2 border-[#F25E0A] hover:bg-orange-50 rounded-full transition-colors"
                                            >
                                                <Pencil className="w-3 h-3 mr-1" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id || product._id)}
                                                className="flex items-center justify-center py-2 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3 mr-1" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
