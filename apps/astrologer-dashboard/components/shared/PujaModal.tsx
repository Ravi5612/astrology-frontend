"use client";

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Loader2, Info } from 'lucide-react';
import { PujaService, SamagriItem } from '../ProfileManagement/types';
import { upsertPujaApi } from '@/lib/profile';
import { toast } from 'react-toastify';

interface PujaModalProps {
  mode: 'add' | 'edit';
  puja?: PujaService;
  onClose: () => void;
  onSaved: (updatedProfile: any) => void;
}

export const PujaModal = ({ mode, puja, onClose, onSaved }: PujaModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<PujaService>>({
    type: 'online',
    name: '',
    min_duration_hours: 1,
    max_duration_hours: 2,
    cost: 0,
    description: '',
    districts: [],
    samagri_list: [],
  });

  const [newSamagri, setNewSamagri] = useState<SamagriItem>({ name: '', quantity: '' });
  const [newDistrict, setNewDistrict] = useState('');

  useEffect(() => {
    if (puja) {
      setFormData(prev => ({
        ...prev,
        ...puja,
        min_duration_hours: puja.min_duration_hours || prev.min_duration_hours || 1,
        max_duration_hours: puja.max_duration_hours || prev.max_duration_hours || 2,
        samagri_list: puja.samagri_list || prev.samagri_list || [],
        districts: puja.districts || prev.districts || [],
      }));
    }
  }, [mode, puja]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((formData.min_duration_hours || 0) > (formData.max_duration_hours || 0)) {
      toast.error('Minimum duration cannot be greater than maximum duration.');
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        type: formData.type,
        name: formData.name,
        min_duration_hours: formData.min_duration_hours,
        max_duration_hours: formData.max_duration_hours,
        cost: formData.cost,
        description: formData.description,
        districts: formData.districts,
        samagri_list: formData.samagri_list,
      };

      const data = await upsertPujaApi(payload, puja?.id);
      toast.success(`Puja service ${mode === 'add' ? 'added' : 'updated'} successfully!`);
      onSaved(data);
      onClose();
    } catch (error: any) {
      console.error('Failed to save puja:', error);
      toast.error(error?.response?.data?.message || 'Failed to save puja service.');
    } finally {
      setLoading(false);
    }
  };

  const addSamagri = () => {
    if (!newSamagri.name || !newSamagri.quantity) return;
    setFormData({
      ...formData,
      samagri_list: [...(formData.samagri_list || []), newSamagri],
    });
    setNewSamagri({ name: '', quantity: '' });
  };

  const removeSamagri = (index: number) => {
    setFormData({
      ...formData,
      samagri_list: (formData.samagri_list || []).filter((_, i) => i !== index),
    });
  };

  const addDistrict = () => {
    if (!newDistrict) return;
    if (formData.districts?.includes(newDistrict)) return;
    setFormData({
      ...formData,
      districts: [...(formData.districts || []), newDistrict],
    });
    setNewDistrict('');
  };

  const removeDistrict = (index: number) => {
    setFormData({
      ...formData,
      districts: (formData.districts || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative my-8">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-3xl">
          <h3 className="text-xl font-bold text-gray-800">
            {mode === 'add' ? 'Add New Puja Service' : 'Edit Puja Service'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Type Selection */}
          <div className="flex gap-4 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'online' })}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${formData.type === 'online' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-500'}`}
            >
              Online Puja
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'home_visit' })}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${formData.type === 'home_visit' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-500'}`}
            >
              Home Visit Puja
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Puja Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="e.g. Satyanarayan Puja"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cost (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Min Duration (Hours)</label>
              <input
                type="number"
                required
                step="0.5"
                min="0.5"
                value={formData.min_duration_hours}
                onChange={(e) => setFormData({ ...formData, min_duration_hours: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="e.g. 1"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Max Duration (Hours)</label>
              <input
                type="number"
                required
                step="0.5"
                min="0.5"
                value={formData.max_duration_hours}
                onChange={(e) => setFormData({ ...formData, max_duration_hours: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="e.g. 2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
              placeholder="Describe the significance and process..."
            />
          </div>

          {/* Districts (Only for Home Visit) */}
          {formData.type === 'home_visit' && (
            <div className="space-y-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <label className="block text-sm font-bold text-blue-800">Available Districts</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  className="flex-1 px-4 py-2 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter district name"
                />
                <button
                  type="button"
                  onClick={addDistrict}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.districts?.map((d, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-xs font-semibold shadow-sm">
                    {d}
                    <button type="button" onClick={() => removeDistrict(i)}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Samagri List */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              Samagri List
              <span className="text-xs font-normal text-gray-500">(Items required for puja)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newSamagri.name}
                onChange={(e) => setNewSamagri({ ...newSamagri, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-xl outline-none"
                placeholder="Item name"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSamagri.quantity}
                  onChange={(e) => setNewSamagri({ ...newSamagri, quantity: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl outline-none"
                  placeholder="Qty/Weight"
                />
                <button
                  type="button"
                  onClick={addSamagri}
                  className="p-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Samagri Table View */}
            {(formData.samagri_list?.length || 0) > 0 && (
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {formData.samagri_list?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50/50">
                        <td className="px-4 py-2 text-gray-700">{item.name}</td>
                        <td className="px-4 py-2 text-gray-500">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => removeSamagri(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-yellow-600 text-white font-bold rounded-2xl hover:bg-yellow-700 transition-all shadow-lg flex items-center justify-center gap-2 hover:translate-y-[-2px] active:translate-y-0"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'add' ? 'Save Service' : 'Update Service')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
