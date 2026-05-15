export interface DisputeMessage {
    id: number;
    disputeId: number;
    senderType: "user" | "admin";
    senderId: number;
    senderName: string;
    message?: string;
    attachmentUrl?: string;
    attachmentType?: "image" | "document" | "pdf" | "video";
    isRead: boolean;
    createdAt: string;
    isSystemNote?: boolean;
    is_system_note?: boolean;
}

export interface Dispute {
    id: number;
    type: "order" | "consultation";
    itemId: number;
    orderId?: number | null;
    consultationId?: number | null;
    category: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt?: string;
}
export interface SupportSettings {
    email?: string;
    phone?: string;
    whatsapp?: string;
}

export interface CreateDisputeDto {
    type: 'order' | 'consultation';
    itemId: number;
    orderId?: string | number;
    consultationId?: number;
    category: string;
    description: string;
    itemDetails: any;
}
