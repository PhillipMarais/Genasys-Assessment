import { createAction, props } from '@ngrx/store';

export const login = createAction('[Session] Login', props<{ name: string }>());
export const logout = createAction('[Session] Logout');
export const restoreSession = createAction('[Session] Restore Session', props<{ name: string }>());
