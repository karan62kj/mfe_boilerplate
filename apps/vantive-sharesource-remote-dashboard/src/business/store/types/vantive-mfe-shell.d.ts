import { PayloadAction } from '@reduxjs/toolkit';

declare module 'vantive-mfe-shell/appStore' {
    import { appStore } from '../../../../../vantive-mfe-shell/src/business/store/app.store';
    export { appStore };
    export { appStore as store };
}
  
declare module 'vantive-mfe-shell/profileSlice' {
  export const fetchProfileStart: (action: PayloadAction<{ id: number }>) => { type: string };
}