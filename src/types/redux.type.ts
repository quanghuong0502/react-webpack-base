import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type CR<State, P = void> = CaseReducer<State, PayloadAction<P>>;
