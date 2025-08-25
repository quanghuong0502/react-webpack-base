import { CR } from '@/types';

/* state */
export type ExampleState = {
  example: string;
};

/* reducer cases */
export type DeleteExampleCR<S = ExampleState> = CR<S, string>;
export type UpdateExampleCR<S = ExampleState> = CR<S, string>;

export type ExampleCaseReducers<S = ExampleState> = {
  deleteExample: DeleteExampleCR<S>;
  updateExample: UpdateExampleCR<S>;
};

/* selectors */
export type SelectExample<S = ExampleState> = (state: S) => string;

export type ExampleSelectors<S extends ExampleState = ExampleState> = {
  selectExample: SelectExample<S>;
};
