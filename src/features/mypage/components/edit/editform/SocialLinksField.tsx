interface SocialLinksFieldProps {
  links: string[];
  onLinksChange: (links: string[]) => void;
}

function SocialLinksField({ links, onLinksChange }: SocialLinksFieldProps) {
  const handleAddLink = () => {
    onLinksChange([...links, '']);
  };

  const handleLinkChange = (index: number, value: string) => {
    const updated = [...links];
    updated[index] = value;
    onLinksChange(updated);
  };

  const handleRemoveLink = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    onLinksChange(updated);
  };

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="block mb-2 font-semibold">소셜 링크</legend>
      <div role="group" aria-label="소셜 링크 목록" className="flex flex-col gap-2">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2">
            <label htmlFor={`social-${index}`} className="sr-only">
              소셜 링크 {index + 1}
            </label>
            <input
              type="url"
              id={`social-${index}`}
              name={`social-${index}`}
              value={link}
              className="flex-1 bg-white focus:outline-primary/50 h-8 px-2 rounded-md"
              placeholder="https://"
              aria-label={`소셜 링크 ${index + 1}`}
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />
            {links.length > 0 && (
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
    </fieldset>
  );
}

export default SocialLinksField;
