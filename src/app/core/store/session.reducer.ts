import { createFeature, createReducer, on } from '@ngrx/store';
import { login, logout, restoreSession } from './session.actions';

export interface SessionState { userName: string | null; }
const initialState: SessionState = { userName: null };

export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(login, (_, { name }) => ({ userName: name })),
    on(restoreSession, (_, { name }) => ({ userName: name })),
    on(logout, () => initialState)
  )
});
