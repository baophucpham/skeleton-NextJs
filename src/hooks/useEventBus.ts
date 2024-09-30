import { useEffect } from 'react';
import { EventBusService } from './EventBus';

const useEventBus = (eventName: string, callback: (data: any) => void) => {
    useEffect(() => {
        // Đăng ký listener cho sự kiện
        EventBusService.on(eventName, callback);

        // clear when component unmount
        return () => {
            EventBusService.off(eventName, callback);
        };
    }, [eventName, callback]); // run when eventName or callback change
};

export default useEventBus;