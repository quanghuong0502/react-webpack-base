import exampleReducer from './example/exam.slice';

const rootReducer = {
  example: exampleReducer
};

export * from './example';
export default rootReducer;
