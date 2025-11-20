import { useReview } from '../../context/useReview';
import AdjustRadios from './AdjustRadios';

function AdjustMember() {
  const PEER_REVIEW_QUESTION = [
    {
      id: 1,
      question: '1. 이 팀원과의 소통과 정보공유가 원활하였나요?',
      name: 'communicate',
    },
    {
      id: 2,
      question: '2. 이 팀원의 코드 품질과 문제 해결능력은 괜찮았나요?',
      name: 'skill',
    },
    {
      id: 3,
      question: '3. 이 팀원은 맡은 일을 제 때 완수하였나요?',
      name: 'responsibility',
    },
    {
      id: 4,
      question: '4. 이 팀원은 프로젝트에 협력적이었나요?',
      name: 'active',
    },
  ];

  const { handleSave, review } = useReview();

  return (
    <form
      className="flex justify-center"
      aria-label="
          아래 항목은 함께 프로젝트를 진행한 팀원들의 평가항목입니다.
    "
    >
      <fieldset>
        <legend className="sr-only">
          아래 항목은 함께 프로젝트를 진행한 팀원들의 평가항목입니다.
        </legend>
      </fieldset>

      <ol className="flex flex-col gap-10">
        {PEER_REVIEW_QUESTION.map(({ id, question, name }) => (
          <li key={id} className="flex flex-col xl:flex-row  gap-3">
            <p>{question}</p>
            <AdjustRadios name={name} />
          </li>
        ))}
        <li>
          <label htmlFor="peerReviewText" className="sr-only">
            동료 평가를 자유롭게 작성해주세요.
          </label>
          <textarea
            className="w-full h-32 bg-white px-2 py-3 rounded-sm border border-gray-400 resize-none placeholder:text-xs"
            aria-label="이곳에 평가를 남겨주세요"
            name="peerReview"
            id="peerReviewText"
            value={review.review_contents || ''}
            onChange={(e) => handleSave(e.target.value)}
            placeholder='예시) "이번 프로젝트에서 인상 깊었던 점: 빠른 응답과 꼼꼼한 코드 리뷰.  
            다음에 더 좋을 것 같은 점: 회의에서 의견을 좀 더 적극적으로 나눠주시면 좋겠습니다."'
          ></textarea>
        </li>
      </ol>
    </form>
  );
}
export default AdjustMember;
