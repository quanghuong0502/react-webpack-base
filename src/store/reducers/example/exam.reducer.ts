import { ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { DeleteExampleCR, ExampleCaseReducers, ExampleState, UpdateExampleCR } from './exam.type';

/**
 * reducer cases
 */
const deleteExample: DeleteExampleCR = state => {
  state.example = '';
};

const updateExample: UpdateExampleCR = (state, action) => {
  state.example = action.payload;
};

/**
 * collection of reducer cases
 */
const exampleReducers: ValidateSliceCaseReducers<ExampleState, ExampleCaseReducers> = {
  deleteExample,
  updateExample
};

export default exampleReducers;
