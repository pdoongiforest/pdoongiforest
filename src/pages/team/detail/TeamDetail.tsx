import { useAuth } from '@/features/auth/AuthProvider';
import StudyTitle from '@/features/team/components/detail/StudyTitle';

import type {
  ApproveWithProfile,
  MemberWithProfile,
  StudyWithBoard,
} from '@/features/team/types/types';
import { NavLink, Outlet, useLoaderData, useParams } from 'react-router-dom';

function TeamDetail() {
  const { study, approves, members } = useLoaderData() as {
    study: StudyWithBoard;
    approves: ApproveWithProfile;
    members: MemberWithProfile;
  };
  const { profileId } = useAuth();
  const { id } = useParams();
  const isAdmin = study.profile_id === profileId;

  return (
    <div className="mt-12 page-layout max-w-1200">
      <StudyTitle />
      <nav className="mt-5">
        <ul className="flex gap-3 border-b border-gray-400">
          <NavLink
            to={`/team/${id}`}
            end
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                  ? 'text-primary border-b border-primary'
                  : 'flex items-center'
            }
          >
            홈
          </NavLink>
          <NavLink
            to="peerreview"
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                  ? 'text-primary border-b border-primary flex items-center gap-1'
                  : 'flex items-center gap-1'
            }
          >
            피어리뷰
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6.66732V5.33398C4 3.12732 4.66667 1.33398 8 1.33398C11.3333 1.33398 12 3.12732 12 5.33398V6.66732"
                stroke="#222222"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.00065 12.3333C8.92113 12.3333 9.66732 11.5871 9.66732 10.6667C9.66732 9.74619 8.92113 9 8.00065 9C7.08018 9 6.33398 9.74619 6.33398 10.6667C6.33398 11.5871 7.08018 12.3333 8.00065 12.3333Z"
                stroke="#222222"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.334 14.666H4.66732C2.00065 14.666 1.33398 13.9993 1.33398 11.3327V9.99935C1.33398 7.33268 2.00065 6.66602 4.66732 6.66602H11.334C14.0007 6.66602 14.6673 7.33268 14.6673 9.99935V11.3327C14.6673 13.9993 14.0007 14.666 11.334 14.666Z"
                stroke="#222222"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
          <NavLink
            to="settings"
            onClick={(e) => {
              if (!isAdmin) {
                e.preventDefault();
                alert('관리자만 접근 가능합니다.');
              }
            }}
            className={({ isActive, isPending }) =>
              `flex items-center gap-1
            ${!isAdmin ? 'cursor-not-allowed opacity-50' : ''}
            ${isPending ? 'pending' : isActive ? 'text-primary border-b border-primary' : ''}`
            }
          >
            관리
            {!isAdmin && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6.66732V5.33398C4 3.12732 4.66667 1.33398 8 1.33398C11.3333 1.33398 12 3.12732 12 5.33398V6.66732"
                  stroke="#222222"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.00065 12.3333C8.92113 12.3333 9.66732 11.5871 9.66732 10.6667C9.66732 9.74619 8.92113 9 8.00065 9C7.08018 9 6.33398 9.74619 6.33398 10.6667C6.33398 11.5871 7.08018 12.3333 8.00065 12.3333Z"
                  stroke="#222222"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.334 14.666H4.66732C2.00065 14.666 1.33398 13.9993 1.33398 11.3327V9.99935C1.33398 7.33268 2.00065 6.66602 4.66732 6.66602H11.334C14.0007 6.66602 14.6673 7.33268 14.6673 9.99935V11.3327C14.6673 13.9993 14.0007 14.666 11.334 14.666Z"
                  stroke="#222222"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </NavLink>
        </ul>
      </nav>

      <main className="flex flex-1 mt-5">
        <Outlet context={{ study, approves, members }} />
      </main>
    </div>
  );
}
export default TeamDetail;
