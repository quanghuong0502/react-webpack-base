import { createSlice } from '@reduxjs/toolkit';
import exampleReducers from './exam.reducer';
import exampleSelectors from './exam.selector';
import { ExampleCaseReducers, ExampleSelectors, ExampleState } from './exam.type';

const initialExampleState: ExampleState = {
  example: 'example text'
};

const exampleSlice = createSlice<ExampleState, ExampleCaseReducers, string, ExampleSelectors>({
  name: 'example',
  initialState: initialExampleState,
  reducers: exampleReducers,
  selectors: exampleSelectors
});

export const { deleteExample, updateExample } = exampleSlice.actions;
export const { selectExample } = exampleSlice.selectors;
export default exampleSlice.reducer;
