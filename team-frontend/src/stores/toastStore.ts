import {create} from 'zustand';
import toast from 'react-hot-toast';

type ToastStore = {
    success: (message: string) => void,
    error: (message: string) => void,
    info: (message: string) => void
};

export const useToastStore = create<ToastStore>(() => ({
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    info: (message) => toast(message)
}));