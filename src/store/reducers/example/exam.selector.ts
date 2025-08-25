import { ExampleSelectors, SelectExample } from './exam.type';

/**
 * selectors
 */
const selectExample: SelectExample = state => {
  return state.example;
};

/**
 * collection of selectors
 */
const exampleSelectors: ExampleSelectors = {
  selectExample
};

export default exampleSelectors;
