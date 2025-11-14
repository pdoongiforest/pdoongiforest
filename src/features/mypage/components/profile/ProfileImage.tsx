interface Props {
  src: string;
  alt: string;
}

function ProfileImage({ src, alt }: Props) {
  return (
    <div className="w-full h-full md:w-50 md:h-50 rounded-xl flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="object-cover rounded-xl max-w-50 max-h-50 object-center min-w-50 min-h-50"
      />
    </div>
  );
}

export default ProfileImage;
