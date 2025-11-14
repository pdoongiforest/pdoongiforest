import SocialLinksField from './SocialLinksField';
import FormActions from './FormActions';
import ImageSection from './ImageSection';
import ProfileInfoSection from './ProfileInfoSection';
import AgeSection from './AgeSection';
import RoleSection from './RoleSection';
import InterestSection from './InterestSection';
import IntroduceSection from './IntroduceSection';
import { useProfileForm } from './hooks/useProfileForm';
import { useProfileSubmit } from './hooks/useProfileSubmit';

export interface ProfileFormData {
  nickname: string;
  role: string;
  age: number;
  interest: string[];
  introduce: string;
  social: {
    social: string;
    social_link: string;
  }[];
  profile_images: File | string | null;
}

export interface ProfileData {
  nickname: string;
  role: string;
  age: number;
  interest: string[];
  introduce: string;
  social: Array<{
    social: string;
    social_link: string;
  }>;
  profile_images: string | null;
}

function FormSection() {
  const {
    profileData,
    profileId,
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    errors,
    loading,
  } = useProfileForm();

  const { onSubmit } = useProfileSubmit({
    profileId,
    profileData,
    setError,
  });

  const handleDelete = () => {
    // 회원 탈퇴 로직
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      className="flex flex-col gap-6 w-full"
      aria-label="프로필 정보 수정 폼"
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log('Form validation errors:', errors);
      })}
      noValidate
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">프로필 정보</legend>

        <div className="flex items-center gap-4 flex-col">
          <ImageSection
            errors={errors.profile_images}
            control={control}
            profileData={profileData}
          />
        </div>

        <ProfileInfoSection
          register={register}
          errors={errors.nickname}
          setError={setError}
          clearErrors={clearErrors}
          profileData={profileData}
        />

        <RoleSection register={register} errors={errors.role} />

        <AgeSection
          register={register}
          errors={errors.age}
          setError={setError}
          clearErrors={clearErrors}
        />

        <InterestSection control={control} />
      </fieldset>

      <SocialLinksField control={control} />

      <fieldset>
        <legend className="sr-only">자기소개</legend>
        <IntroduceSection register={register} errors={errors.introduce} />
      </fieldset>

      <FormActions onDelete={handleDelete} />
    </form>
  );
}

export default FormSection;
