import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import TextInput from '../../textInput/TextInput';
import type { ProfileFormData } from './FormSection';
import { useState } from 'react';

const MAX_INTERESTS = 5;

interface Props {
  control: Control<ProfileFormData>;
}

function InterestSection({ control }: Props) {
  const [isComposing, setIsComposing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addInterest = (
    newTag: string,
    currentInterests: string[],
    onChange: (value: string[]) => void
  ) => {
    // 5개에 도달했으면 추가하지 않음
    if (currentInterests.length >= MAX_INTERESTS) {
      setInputValue('');
      return;
    }

    const trimmedTag = newTag.trim();
    if (!trimmedTag) {
      return; // 빈 값
    }

    const newInterests = [...new Set([...currentInterests, trimmedTag])];
    onChange(newInterests);
    setInputValue('');
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldValue: string[],
    onChange: (value: string[]) => void
  ) => {
    if (isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest(inputValue, fieldValue, onChange);
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldValue: string[],
    onChange: (value: string[]) => void
  ) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.endsWith(',')) {
      e.preventDefault();
      const cleanValue = value.slice(0, -1);
      addInterest(cleanValue, fieldValue, onChange);
    }
  };

  const handleRemoveTag = (
    index: number,
    fieldValue: string[],
    onChange: (value: string[]) => void
  ) => {
    const newInterests = fieldValue.filter((_, i) => i !== index);
    onChange(newInterests);
  };

  return (
    <Controller
      name="interest"
      control={control}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => {
        const interests = value || [];
        const isMaxReached = interests.length >= MAX_INTERESTS;
        const remainingCount = MAX_INTERESTS - interests.length;

        return (
          <>
            <TextInput
              id="interest"
              name="interest"
              label="관심 분야"
              description={
                isMaxReached
                  ? `최대 ${MAX_INTERESTS}개까지 입력 가능합니다. (${interests.length}/${MAX_INTERESTS})`
                  : `관심 있는 기술이나 분야를 입력해주세요. 쉼표로 구분할 수 있습니다. (${remainingCount}개 더 입력 가능)`
              }
              placeholder={
                isMaxReached ? '최대 개수에 도달했습니다' : '예: JavaScript, React, Node.js'
              }
              autoComplete="on"
              value={inputValue}
              onKeyDown={(e) => handleKeyDown(e, interests, onChange)}
              onChange={(e) => handleInput(e, interests, onChange)}
              type="text"
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              disabled={isMaxReached}
            />
            <ul className="flex flex-wrap gap-2">
              {interests.map((tag, index) => (
                <li key={index} className="py-1 px-2 rounded-md bg-secondary/70">
                  <span className="flex items-center gap-2">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index, interests, onChange)}
                      className="text-tertiary w-4"
                      aria-label={`${tag} 태그 삭제`}
                    >
                      x
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </>
        );
      }}
    />
  );
}

export default InterestSection;
