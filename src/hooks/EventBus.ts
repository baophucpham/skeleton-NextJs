import { EventEmitter } from 'events';

const eventBus = new EventEmitter();

export const EventBusService = {
    emit: (eventName: string, data?: any) => {
        eventBus.emit(eventName, data);
    },
    on: (eventName: string, callback: (data: any) => void) => {
        eventBus.on(eventName, callback);
    },
    off: (eventName: string, callback: (data: any) => void) => {
        eventBus.off(eventName, callback);
    },
};

export default eventBus;