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
import FormSectionSkeleton from '../../loading/FormSectionSkeleton';
import { useState } from 'react';
import { useBlocker } from 'react-router-dom';

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

function FormSection() {
  const [value, setValue] = useState('');
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

  // let blocker = useBlocker(
  //   ({ currentLocation, nextLocation, historyAction }) =>
  //     value !== "" && currentLocation.pathname !== nextLocation.pathname
  // )
  const blocker = useBlocker(value !== '');

  if (loading) {
    return <FormSectionSkeleton />;
  }

  return (
    <form
      className="flex flex-col gap-6 w-full"
      aria-label="프로필 정보 수정 폼"
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log('Form validation errors:', errors);
        setValue('');
        if (blocker.state === 'blocked') {
          console.log(blocker.state);
          blocker.proceed();
          console.log(blocker.state);
        }
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
          control={control}
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
