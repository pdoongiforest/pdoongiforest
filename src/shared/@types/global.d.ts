export type Board = Tables<'board'>;
export type Study = Tables<'study'>;
export type StudyWithBoard = Study & { board: Board };
export type Profile = Tables<'user_profile'>;
