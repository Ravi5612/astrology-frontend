"use client";
import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle, Loader2 } from "lucide-react";
import { getPendingWithdrawals, updateWithdrawalStatus, getWithdrawalStats } from "@/src/services/admin.service";
import { toast } from "react-toastify";

export default function AdminPayoutsPage() {
    const [payoutRequests, setPayoutRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [stats, setStats] = useState({
        totalPending: 0,
        totalApproved: 0,
        totalRejected: 0,
        totalAmount: 0,
        totalPaid: 0,
    });

    const fetchPayouts = async () => {
        setLoading(true);
        console.log("DEBUG: Fetching payouts and stats...");
        
        try {
            const [[payoutsData, payoutsError], [statsData, statsError]] = await Promise.all([
                getPendingWithdrawals(),
                getWithdrawalStats()
            ]);

            console.log("DEBUG: Payouts response:", { payoutsData, payoutsError });
            console.log("DEBUG: Stats response:", { statsData, statsError });

            if (payoutsError || statsError) {
                console.error("DEBUG: Failed to fetch payouts or stats:", payoutsError || statsError);
                toast.error("Failed to load payout data");
                setLoading(false);
                return;
            }

            setPayoutRequests((payoutsData as any)?.items || payoutsData || []);
            
            if (statsData) {
                setStats({
                    totalPending: (statsData as any).totalPending || 0,
                    totalApproved: (statsData as any).totalApproved || 0,
                    totalRejected: (statsData as any).totalRejected || 0,
                    totalAmount: (statsData as any).totalAmountPending || 0,
                    totalPaid: (statsData as any).totalAmountApproved || 0,
                });
            }
        } catch (err) {
            console.error("DEBUG: Unexpected error in fetchPayouts:", err);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayouts();
    }, []);

    const handleAction = async (id: number, status: 'approved' | 'rejected') => {
        setProcessingId(id);
        const [_, error] = await updateWithdrawalStatus(id, { status });
        
        if (error) {
            console.error(`Failed to ${status} withdrawal:`, error);
            toast.error(`Failed to ${status} withdrawal`);
            setProcessingId(null);
            return;
        }

        toast.success(`Withdrawal ${status === 'approved' ? 'Approved' : 'Rejected'} successfully`);
        await fetchPayouts(); // Refresh list
        setProcessingId(null);
    };


    return (
        <div className="min-h-screen bg-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Payout Requests</h1>
                    <p className="text-gray-600">Manage expert payout requests and wallet transactions</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-medium text-gray-600">Pending Requests</h3>
                            <Wallet className="w-4 h-4 text-yellow-600" />
                        </div>
                        <p className="text-xl font-bold text-gray-800">{stats.totalPending}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Awaiting approval</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-medium text-gray-600">Approved</h3>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-xl font-bold text-gray-800">{stats.totalApproved}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Ready for transfer</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-medium text-gray-600">Rejected</h3>
                            <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <p className="text-xl font-bold text-gray-800">{stats.totalRejected}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Declined requests</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-medium text-gray-600">Pending Amount</h3>
                            <DollarSign className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xl font-bold text-gray-800">₹{stats.totalAmount.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Total pending volume</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-medium text-gray-600">Total Paid</h3>
                            <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-xl font-bold text-green-600">₹{stats.totalPaid.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500 mt-1">Total cash outflow</p>
                    </div>
                </div>

                {/* Payout Requests Table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Payout Requests</h2>
                    </div>

                    {loading ? (
                        <div className="p-12 flex justify-center items-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : payoutRequests.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Wallet className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No Payout Requests</h3>
                            <p className="text-gray-600 mb-6">Currently, there are no payout requests from experts.</p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-blue-800 mb-1">Expert Payouts</p>
                                        <p className="text-sm text-blue-700">Requests will appear here when experts withdraw their earnings from the dashboard.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expert</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Details</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {payoutRequests.map((request) => (
                                        <tr key={request.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{request.expertName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">
                                                ₹{request.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {request.bankAccount ? (
                                                    <div className="text-xs text-gray-700">
                                                        <p className="font-bold">{request.bankAccount.bankName}</p>
                                                        <p>A/C: {request.bankAccount.accountNumber}</p>
                                                        <p>IFSC: {request.bankAccount.ifsc}</p>
                                                    </div>
                                                ) : <span className="text-red-500 text-xs">Missing Info</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{new Date(request.date).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleAction(request.id, 'approved')}
                                                    disabled={processingId === request.id}
                                                    className="text-green-600 hover:text-green-900 mr-4 disabled:opacity-50"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(request.id, 'rejected')}
                                                    disabled={processingId === request.id}
                                                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}





