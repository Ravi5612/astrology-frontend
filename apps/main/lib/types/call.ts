import { Expert, ExpertProfile } from "./expert";

export type CallStatus = 'ringing' | 'connecting' | 'connected' | 'ended';

export interface CallSession {
    id: number;
    expertId: number;
    type: 'audio' | 'video';
    status: string;
    token?: string;
    roomName?: string;
    expert?: ExpertProfile; // Changed to ExpertProfile to support nested user object
}

export interface CallReview {
    sessionId: number;
    expertId: number;
    rating: number;
    comment: string;
}
