import {
  Controller,
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormClearErrors,
} from 'react-hook-form';
import type { ProfileFormData } from './FormSection';

interface SocialLinksFieldProps {
  control: Control<ProfileFormData>;
  onDirtyChange: () => void;
  errors?: FieldErrors<ProfileFormData>;
  clearErrors: UseFormClearErrors<ProfileFormData>;
}

function SocialLinksField({ control, errors, clearErrors, onDirtyChange }: SocialLinksFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'social',
  });

  return (
    <fieldset className="flex flex-col gap-2 w-full">
      <legend className="block mb-2 font-semibold">소셜 링크</legend>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Controller
            name={`social.${index}.social`}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onDirtyChange();
                }}
                className="bg-white focus:outline-primary/50 h-8 px-2 rounded-md md:text-md text-sm"
              >
                <option value="">플랫폼 선택</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="blog">Blog</option>
                <option value="etc">기타</option>
              </select>
            )}
          />

          <Controller
            name={`social.${index}.social_link`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="url"
                onChange={(e) => {
                  console.log(e.target.value);
                  field.onChange(e);
                  onDirtyChange();
                }}
                className="bg-white focus:outline-primary/50 h-8 px-2 rounded-md min-w-60 max-w-full md:flex-1"
                placeholder="https://"
              />
            )}
          />

          <button
            type="button"
            className="text-red-500 hover:text-red-700 shrink-0 whitespace-nowrap"
            onClick={() => {
              remove(index);
              // 항목 삭제 시 에러 clear (submit 시 다시 validation 실행됨)
              clearErrors('social');
              onDirtyChange();
            }}
          >
            삭제
          </button>
        </div>
      ))}

      <button
        type="button"
        className="self-start bg-primary text-white h-8 px-2 rounded-md"
        onClick={() => {
          append({ social: '', social_link: '' });
          onDirtyChange();
        }}
      >
        추가하기
      </button>
      {errors?.social && typeof errors.social === 'object' && 'message' in errors.social && (
        <p className="text-red-500 text-sm">{errors.social.message}</p>
      )}
    </fieldset>
  );
}

export default SocialLinksField;
