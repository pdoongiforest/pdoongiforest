import { Controller, useFieldArray, type Control } from 'react-hook-form';
import type { ProfileFormData } from './FormSection';

interface SocialLinksFieldProps {
  control: Control<ProfileFormData>;
  onDirtyChange: () => void;
}

function SocialLinksField({ control, onDirtyChange }: SocialLinksFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'social',
  });

  return (
    <fieldset className="flex flex-col gap-2">
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
                className="bg-white focus:outline-primary/50 h-8 px-2 rounded-md"
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
                  field.onChange(e);
                  onDirtyChange();
                }}
                className="flex-1 bg-white focus:outline-primary/50 h-8 px-2 rounded-md"
                placeholder="https://"
              />
            )}
          />

          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              remove(index);
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
    </fieldset>
  );
}

export default SocialLinksField;
