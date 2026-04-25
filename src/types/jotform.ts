export interface JotFormApiResponse<T> {
  responseCode: number;
  message: string;
  content: T;
  duration: string;
}

export interface SubmissionAnswer {
  name: string;
  order: string;
  text: string;
  type: string;
  answer?: string | string[] | Record<string, string>;
  prettyFormat?: string;
}

export interface FormSubmission {
  id: string;
  form_id: string;
  ip: string;
  created_at: string;
  status: string;
  new: string;
  flag: string;
  notes: string;
  updated_at: string;
  answers: Record<string, SubmissionAnswer>;
}

export interface JotFormForm {
  id: string;
  username: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_submission: string | null;
  new: string;
  count: string;
  url: string;
}

export type SubmissionsResponse = JotFormApiResponse<FormSubmission[]>;
export type UserFormsResponse = JotFormApiResponse<JotFormForm[]>;
