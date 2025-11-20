import type { Approve, Board, Member, Profile, Study } from '@/shared/@types/global';

export type StudyWithBoard = Study & { board: Board };
export type ApproveWithProfile = Approve & { user_profile: Profile };
export type MemberWithProfile = Member & {
  user_profile: Profile;
};

export type TeamOutlet = {
  study: StudyWithBoard;
  approves: ApproveWithProfile[];
  members: MemberWithProfile[];
};
