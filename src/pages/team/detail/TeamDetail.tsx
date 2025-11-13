import { NavLink, Outlet } from 'react-router-dom';

function TeamDetail() {
  return (
    <div className="mt-12 page-layout max-w-1200">
      <header className="flex flex-col gap-1">
        <p className="font-light">스터디</p>
        <h1 className="text-2xl font-semibold">스터디 명</h1>
      </header>
      <nav className="mt-5">
        <ul className="flex gap-3 border-b border-gray-400">
          <NavLink
            to=""
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'text-primary border-b border-primary' : ''
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
                  ? 'text-primary border-b border-primary flex items-center'
                  : 'flex items-center'
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
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                  ? 'text-primary border-b border-primary flex items-center'
                  : 'flex items-center'
            }
          >
            관리
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
        </ul>
      </nav>

      <main className="flex flex-1 mt-5">
        <Outlet />
      </main>
    </div>
  );
}
export default TeamDetail;
