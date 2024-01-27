import {create} from "zustand";

interface NotificationStore {
    count: number;
    setCount: ()=> void;
    resetCount: ()=> void;
}

const useNotification = create<NotificationStore>((set)=>({
    count: 0,
    setCount: () => set(( state )=>({count: state.count+1})),
    resetCount: () => set({count: 0})
}));

export default useNotification;