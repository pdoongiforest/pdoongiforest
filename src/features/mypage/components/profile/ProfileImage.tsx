interface Props {
  src: string;
  alt: string;
}

function ProfileImage({ src, alt }: Props) {
  return (
    <div className="max-w-50 max-h-50 min-w-50 min-h-50 rounded-xl bg-white">
      <img src={src} alt={alt} className="w-full h-full object-contain rounded-xl" />
    </div>
  );
}

export default ProfileImage;
