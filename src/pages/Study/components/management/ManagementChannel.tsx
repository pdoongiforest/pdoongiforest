import React, { useEffect, useRef, useState } from 'react';
import S from './ManagementChannel.module.css';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useNavigate, useParams } from 'react-router-dom';
import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import { toast } from 'react-toastify';
import Calender from '@/components/Calender';
import ActiveChannel from './ActiveChannel';
import DeleteChannel from './DeleteChannel';

type Board = Tables<'board'>;
type PickBoard = Pick<Board, 'member' | 'board_cls' | 'address' | 'meeting_time' | 'active'>;

function MangementChannel() {
  const { id } = useParams();
  const [category, setCategory] = useState<'0' | '1' | null>('0');
  const [meetingTime, setMeetingTime] = useState<string | null>(null);
  const [members, setMembers] = useState<number>(1);
  const [address, setAddress] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [projectData, setProjectData] = useState<PickBoard | null>(null);

  const addressRef = useRef<HTMLDivElement | null>(null);

  const { id: board_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const { data, error } = await supabase
        .from('board')
        .select('member, board_cls, address, meeting_time, active')
        .eq('board_id', board_id)
        .single()
        .returns<PickBoard>();

      if (error) console.error('프로젝트 상세 정보 불러오기 실패 : ', error.message);
      setProjectData(data);
    };
    fetchProjectDetails();
  }, [board_id]);

  useEffect(() => {
    if (!projectData) return;
    const { member, address, meeting_time, active } = projectData;

    setCategory('0');
    setMeetingTime(meeting_time);
    setMembers(member);
    setAddress(address);
    setIsOffline(address ? true : false);
    setIsActive(active);
  }, [projectData]);

  const handleCheckedOnline = () => {
    // address가 null일때
    // 얘를 클릭했을때
    return !isOffline ? true : false;
  };

  const handleCheckedOffline = () => {
    // address가 있을때
    // 얘를 클릭했을때
    return isOffline ? true : false;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!addressRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleAddAdress = ({ address }: { address: string }) => {
    setAddress(address);
    setIsOpen(false);
  };

  const addressStyle = {
    width: '100%',
    height: '500px',
    border: '2px solid rgba(153, 153, 153, 0.5)',
    marginTop: '0.2rem',
  };

  const handleUpButton = () => {
    setMembers((prev) => prev + 1);
  };

  const handleDownButton = () => {
    if (members === 1) return;
    setMembers((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isOffline && !address) {
      toast.error('모임 장소를 선택해주세요', {
        autoClose: 1500,
      });
      return;
    }
    const convertAddress = address ? address : null;

    const modifiedContents = {
      member: String(members),
      board_cls: category,
      meeting_time: meetingTime,
      address: convertAddress,
    };

    const updateProjectDetails = async () => {
      const { error } = await supabase
        .from('board')
        .update(modifiedContents)
        .eq('board_id', board_id);

      if (error) console.error(error);
    };

    updateProjectDetails();

    navigate(`/channel/${id}`);
    toast.success('저장되었습니다', {
      autoClose: 1500,
    });
  };

  return (
    <main className={S.mangementChannelContainer}>
      <h1 className={S.contentHeader}>프로젝트 생성</h1>
      <form className={S.projectDetailForm} onSubmit={handleSubmit}>
        <section className={S.category}>
          <h2 className={S.sectionHeader}>모집 타입</h2>
          <div className={S.categoryRadio}>
            <div className={S.study}>
              <input
                type="radio"
                name="category"
                id="study"
                defaultChecked
                onChange={() => setCategory('0')}
              />
              <label htmlFor="study">스터디</label>
            </div>
            <div className={S.project}>
              <input type="radio" name="category" id="project" onChange={() => setCategory('1')} />
              <label htmlFor="project">프로젝트</label>
            </div>
          </div>
        </section>

        <section className={S.deadline}>
          <h2 className={S.sectionHeader}>마감 기한</h2>

          <div className={S.calendarBox}>
            {category == '1' ? (
              <Calender isHidden={true} callBack={() => {}} shouldFetch={false} />
            ) : (
              <button
                type="button"
                className={category === '0' || category === null ? S.disableBtn : S.calendarBtn}
              >
                날짜선택
              </button>
            )}
          </div>
        </section>

        <section className={S.time}>
          <h2 className={S.sectionHeader}>모임 시간</h2>
          <input
            type="text"
            name=""
            id=""
            value={meetingTime ? meetingTime : ''}
            placeholder="매주 월요일 저녁 9시"
            onChange={(e) => {
              setMeetingTime(e.target.value);
            }}
          />
        </section>

        <section className={S.contributors}>
          <h2 className={S.sectionHeader}>모집 인원</h2>
          <div className={S.countButton}>
            <button className={S.upButton} type="button" onClick={handleDownButton}>
              -
            </button>
            <div>{members}</div>
            <button className={S.downButton} type="button" onClick={handleUpButton}>
              +
            </button>
          </div>
        </section>

        <section className={S.location}>
          <div className={S.chooseLocation}>
            <h2 className={S.sectionHeader}>모임 장소</h2>
            <div className={S.locationRadio}>
              <div>
                <div className={S.online}>
                  <input
                    type="radio"
                    name="location"
                    id="online"
                    checked={handleCheckedOnline()}
                    onChange={() => {
                      setIsOffline(false);
                      setAddress(null);
                    }}
                  />
                  <label htmlFor="online">온라인</label>
                </div>
                <div className={S.offline}>
                  <input
                    type="radio"
                    name="location"
                    id="offline"
                    checked={handleCheckedOffline()}
                    onChange={() => {
                      setIsOffline(true);
                    }}
                  />
                  <label htmlFor="offline">오프라인</label>
                </div>
              </div>
            </div>
          </div>
          {isOffline && (
            <div className={S.locationWrapper} ref={addressRef}>
              <button
                className={S.locationButton}
                type="button"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              >
                {address ? <p className={S.address}>{address}</p> : <p>Location</p>}
              </button>
              {isOpen && (
                <div className={S.postWrapper}>
                  <DaumPostcodeEmbed onComplete={handleAddAdress} style={addressStyle} />
                </div>
              )}
            </div>
          )}
        </section>
        <button className={S.saveButton} type="submit">
          저장
        </button>
      </form>
      <div className={S.controlSection}>
        {board_id && (
          <>
            <ActiveChannel board_id={board_id} isActive={isActive} setIsActive={setIsActive} />
            <DeleteChannel board_id={board_id} />
          </>
        )}
      </div>
    </main>
  );
}
export default MangementChannel;
