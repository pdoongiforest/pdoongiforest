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
import { useDeleteUser } from './hooks/useDeleteUser';
import FormSectionSkeleton from '../../loading/FormSectionSkeleton';

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
  visibility: boolean;
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
  visibility: boolean | null;
}

function FormSection({ onDirtyChange }: { onDirtyChange: (isDirty: boolean) => void }) {
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
    onSuccess: () => {
      // submit 성공 시 즉시 dirty 상태 초기화
      onDirtyChange(false);
    },
  });

  const { handleDelete } = useDeleteUser();

  if (loading) {
    return <FormSectionSkeleton />;
  }

  return (
    <form
      className="flex flex-col gap-6 w-full"
      aria-label="프로필 정보 수정 폼"
      onSubmit={(e) => {
        // submit 시작 시 즉시 dirty 상태 초기화 (navigate 전에 blocker 비활성화)
        onDirtyChange(false);
        handleSubmit(onSubmit, (errors) => {
          console.log('Form validation errors:', errors);
        })(e);
      }}
      noValidate
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">프로필 정보</legend>

        <div className="flex items-center gap-4 flex-col">
          <ImageSection
            errors={errors.profile_images}
            control={control}
            profileData={profileData}
            onDirtyChange={() => onDirtyChange(true)}
          />
        </div>

        <ProfileInfoSection
          register={register}
          errors={errors.nickname}
          setError={setError}
          clearErrors={clearErrors}
          profileData={profileData}
          onDirtyChange={() => onDirtyChange(true)}
        />

        <RoleSection
          register={register}
          errors={errors.role}
          onDirtyChange={() => onDirtyChange(true)}
        />

        <AgeSection
          register={register}
          errors={errors.age}
          setError={setError}
          clearErrors={clearErrors}
          control={control}
          onDirtyChange={() => onDirtyChange(true)}
        />

        <InterestSection control={control} onDirtyChange={() => onDirtyChange(true)} />
      </fieldset>

      <SocialLinksField control={control} onDirtyChange={() => onDirtyChange(true)} />

      <fieldset>
        <legend className="sr-only">자기소개</legend>
        <IntroduceSection
          register={register}
          errors={errors.introduce}
          onDirtyChange={() => onDirtyChange(true)}
        />
      </fieldset>

      <FormActions onDelete={handleDelete} />
    </form>
  );
}

export default FormSection;
