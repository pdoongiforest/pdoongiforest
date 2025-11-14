import { Controller, type Control } from 'react-hook-form';
import type { ProfileFormData } from './FormSection';

interface SocialLinksFieldProps {
  control: Control<ProfileFormData>;
}

function SocialLinksField({ control }: SocialLinksFieldProps) {
  return (
    <Controller
      name="social"
      control={control}
      defaultValue={[]}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const socialLinks = value || [];

        const handleAddLink = () => {
          onChange([...socialLinks, { social: '', social_link: '' }]);
        };

        const handleRemoveLink = (index: number) => {
          const updated = socialLinks.filter((_, i) => i !== index);
          onChange(updated);
        };

        return (
          <fieldset className="flex flex-col gap-2">
            <legend className="block mb-2 font-semibold">소셜 링크</legend>
            <div role="group" aria-label="소셜 링크 목록" className="flex flex-col gap-2">
              {socialLinks.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Controller
                    control={control}
                    name={`social.${index}.social`}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="bg-white focus:outline-primary/50 h-8 px-2 rounded-md"
                        aria-label={`소셜 플랫폼 ${index + 1}`}
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
                    control={control}
                    name={`social.${index}.social_link`}
                    render={({ field }) => (
                      <input
                        type="url"
                        {...field}
                        className="flex-1 bg-white focus:outline-primary/50 h-8 px-2 rounded-md"
                        placeholder="https://"
                        aria-label={`소셜 링크 ${index + 1}`}
                      />
                    )}
                  />
                  {socialLinks.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label={`소셜 링크 ${index + 1} 삭제`}
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddLink}
              className="self-start bg-primary text-white h-8 px-2 rounded-md hover:bg-primary/80 transition-colors"
              aria-label="소셜 링크 추가"
            >
              추가하기
            </button>
            {error && (
              <p className="text-red-500 text-sm" role="alert" id="social-error">
                {error.message}
              </p>
            )}
          </fieldset>
        );
      }}
    />
  );
}

export default SocialLinksField;
