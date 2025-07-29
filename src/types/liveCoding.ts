// types/activities.ts
export type ValidationResult = {
  valid: boolean;
  advanced?: boolean;
  message: string;
};

export type ValidationFunction = (doc: Document) => ValidationResult;