export type OPTION = {
  id: number;
  value: string;
  correct: boolean;
};

export type QUESTION = {
  title: string;
  duration: number;
  score: number;
  type: "multiple" | "single";
  options: { [id: string]: OPTION };
};

export type UpdateProp = {
  title?: string;
  duration?: number;
  score?: number;
  type?: "single" | "multiple";
  options?: OPTION[];
};
