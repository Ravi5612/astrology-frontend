"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { getBasePath } from "@/utils/api-config";
import safeFetch from "@packages/safe-fetch/safeFetch";
import apiClient, { getClientProfile, applyCoupon } from "@/libs/api-profile";
import { loadRazorpay } from "@/libs/razorpay";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { Product, AddressDto } from "@/lib/types";

export const useCheckout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cartItems, cartTotal } = useCartStore();
  const { clientUser, clientBalance, refreshBalance } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [directProduct, setDirectProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [buyNowInfo, setBuyNowInfo] = useState<{
    productId: string | number;
    quantity: number;
  } | null>(null);

  const isOrder = searchParams.get("type") === "order";
  const astrologerName = searchParams.get("name") || "Astrologer";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const duration = searchParams.get("duration") || "15";
  const expertId = searchParams.get("expertId");

  useEffect(() => {
    if (isOrder) {
      const urlProductId = searchParams.get("productId");
      const urlQuantity = searchParams.get("quantity");

      if (urlProductId) {
        setBuyNowInfo({
          productId: urlProductId,
          quantity: parseInt(urlQuantity || "1"),
        });
      } else {
        const stored = sessionStorage.getItem("buyNowItem");
        if (stored) {
          try {
            setBuyNowInfo(JSON.parse(stored));
          } catch (e) {
            console.error("Error parsing buyNowItem:", e);
          }
        }
      }
    }
  }, [isOrder, searchParams]);

  const baseTotal = isOrder
    ? buyNowInfo
      ? Number(directProduct?.sale_price || directProduct?.price || 0) *
        buyNowInfo.quantity
      : cartTotal
    : parseInt(searchParams.get("total") || "300");

  const total = Math.max(0, baseTotal - discountAmount);

  useEffect(() => {
    if (isOrder && buyNowInfo?.productId) {
      const fetchDirectProduct = async () => {
        setLoadingProduct(true);
        const baseUrl = getBasePath();
        const [data, fetchError] = await safeFetch<any>(
          `${baseUrl}/api/v1/products/${buyNowInfo.productId}`,
        );

        if (fetchError) {
          console.error("Failed to fetch product for direct buy:", fetchError);
        } else if (data) {
          setDirectProduct(data.data || data);
        }
        setLoadingProduct(false);
      };
      fetchDirectProduct();
    }
  }, [isOrder, buyNowInfo?.productId]);

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.warning("Please enter a coupon code");
      return;
    }

    setIsApplying(true);
    try {
      const sType = searchParams.get("type") || (isOrder ? "product" : "chat");

      const res = await applyCoupon(couponCode.trim(), baseTotal, sType);

      const data = res.data || res;
      const disc =
        data.discountAmount ??
        data.discount_amount ??
        data.discount ??
        data.value;
      const isSuccess =
        data.success ?? data.is_valid ?? data.isValid ?? disc !== undefined;

      if (isSuccess && disc !== undefined) {
        setDiscountAmount(Number(disc));
        setAppliedCoupon(data.coupon || { code: couponCode });
        toast.success(data.message || `Coupon applied! You saved ₹${disc}`);
      } else {
        toast.error(
          data.message ||
            "This coupon cannot be applied to this order. Check minimum order value or expiry.",
        );
      }
    } catch (error: any) {
      console.error("Coupon Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to apply coupon",
      );
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  const [address, setAddress] = useState<AddressDto>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "India",
    zip_code: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchProfileAddress = async () => {
      try {
        setLoadingProfile(true);
        const profile = await getClientProfile();
        if (profile && profile.addresses && profile.addresses.length > 0) {
          const defaultAddr = profile.addresses[0];
          setAddress({
            line1: defaultAddr.line1 || "",
            line2: defaultAddr.line2 || "",
            city: defaultAddr.city || "",
            state: defaultAddr.state || "",
            country: defaultAddr.country || "India",
            zip_code:
              defaultAddr.zip_code || defaultAddr.zipCode || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile for address:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileAddress();
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (isOrder) {
      if (
        !address.line1 ||
        !address.city ||
        !address.state ||
        !address.zip_code
      ) {
        toast.error("Please fill in all required shipping address fields");
        return;
      }
    }

    setIsProcessing(true);

    if (paymentMethod === "wallet") {
      if (clientBalance < total) {
        toast.error(
          "Insufficient wallet balance. Please recharge or select another method.",
        );
        setIsProcessing(false);
        return;
      }

      try {
        let payload: any;
        let endpoint: string;

        if (isOrder) {
          payload = {
            shipping_address: address,
            product_id: buyNowInfo ? Number(buyNowInfo.productId) : undefined,
            quantity: buyNowInfo ? Number(buyNowInfo.quantity) : undefined,
            coupon_code: appliedCoupon?.code || undefined,
            payment_method: "wallet",
          };
          endpoint = "/order";
        } else {
          payload = {
            astrologer_name: astrologerName,
            expert_id: expertId ? parseInt(expertId) : undefined,
            amount: total,
            coupon_code: appliedCoupon?.code || undefined,
            type: "consultation",
          };
          endpoint = "/consultation/book-with-wallet";
        }

        const res = await apiClient.post<any>(endpoint, payload);
        const data = (res as any)?.data ?? res;

        if (data) {
          toast.success(
            isOrder
              ? "Order placed successfully using wallet!"
              : "Consultation booked successfully!",
          );
          refreshBalance();

          if (isOrder) {
            router.push("/profile?tab=orders");
          } else {
            const params = new URLSearchParams({ name: astrologerName });
            router.push(`/chat?${params.toString()}`);
          }
        }
      } catch (error: any) {
        console.error("Wallet Payment Error:", error);
        toast.error(
          error.response?.data?.message ||
            "Wallet payment failed. Please try again.",
        );
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      let dbOrderId = null;
      if (isOrder) {
        try {
          const orderPayload = {
            shipping_address: address,
            product_id: buyNowInfo ? Number(buyNowInfo.productId) : undefined,
            quantity: buyNowInfo ? Number(buyNowInfo.quantity) : undefined,
            coupon_code: appliedCoupon?.code || undefined,
          };
          const createOrderRes = await apiClient.post<any>(
            "/order",
            orderPayload,
          );
          const orderData =
            (createOrderRes as any)?.data ?? createOrderRes;
          dbOrderId = orderData.id;
          sessionStorage.removeItem("buyNowItem");
        } catch (error: any) {
          console.error("Failed to create order:", error);
          toast.error(
            error.response?.data?.message ||
              "Failed to create order. Please try again.",
          );
          setIsProcessing(false);
          return;
        }
      }

      const paymentOrderPayload = {
        amount: total,
        type: isOrder ? "product" : "consultation",
        coupon_code: appliedCoupon?.code,
        notes: {
          astrologer_name: astrologerName,
          is_order: isOrder,
          order_id: dbOrderId,
          discount_applied: discountAmount,
        },
      };

      const orderRes = await apiClient.post<any>(
        "/payment/orders/create",
        paymentOrderPayload,
      );
      const orderPayloadData: any = (orderRes as any)?.data ?? orderRes;
      const { id: order_id, amount, currency, key_id } =
        orderPayloadData || {};

      if (!order_id || !amount || !currency) {
        throw new Error("Invalid payment order response");
      }

      const options = {
        key: key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Astrology in Bharat",
        description: isOrder
          ? "Product Purchase"
          : `Consultation with ${astrologerName}`,
        order_id: order_id,
        handler: async (response: any) => {
          try {
            const verifyRes = await apiClient.post<any>(
              "/payment/orders/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shipping_address: isOrder ? address : undefined,
              },
            );

            const verifyPayload: any = (verifyRes as any)?.data ?? verifyRes;
            if (verifyPayload?.success) {
              toast.success(
                isOrder ? "Order placed successfully!" : "Payment successful!",
              );

              if (isOrder) {
                router.push("/profile?tab=orders");
              } else {
                const params = new URLSearchParams({ name: astrologerName });
                router.push(`/chat?${params.toString()}`);
              }
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (err: any) {
            console.error("Verification error:", err);
            toast.error("Error verifying payment.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: clientUser?.name || "",
          email: clientUser?.email || "",
          contact: "",
        },
        theme: {
          color: "#fd6410",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong with the payment.",
      );
      setIsProcessing(false);
    }
  };

  return {
    isOrder,
    loadingProfile,
    address,
    handleAddressChange,
    buyNowInfo,
    directProduct,
    cartItems,
    astrologerName,
    date,
    time,
    duration,
    couponCode,
    setCouponCode,
    appliedCoupon,
    isApplying,
    handleApplyCoupon,
    handleRemoveCoupon,
    discountAmount,
    total,
    paymentMethod,
    setPaymentMethod,
    clientBalance,
    handlePayment,
    isProcessing,
  };
};
