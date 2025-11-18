import bear from '@/shared/assets/images/bear.webp';
import bird from '@/shared/assets/images/bird.webp';
import blackbird from '@/shared/assets/images/blackbird.webp';
import girl from '@/shared/assets/images/girl.webp';
import dog from '@/shared/assets/images/dog.webp';
import boy from '@/shared/assets/images/boy.webp';
import cute from '@/shared/assets/images/cute.webp';
import coala from '@/shared/assets/images/coala.webp';
import wolf from '@/shared/assets/images/wolf.webp';
import sheep from '@/shared/assets/images/sheep.webp';
import panda from '@/shared/assets/images/panda.webp';
import pink from '@/shared/assets/images/pink.webp';
import thunder from '@/shared/assets/images/thunder.webp';

const images = [
  bear,
  bird,
  blackbird,
  girl,
  dog,
  boy,
  cute,
  coala,
  wolf,
  sheep,
  panda,
  pink,
  thunder,
];

/**
 * 리뷰 ID를 기반으로 고정된 이미지 선택
 * 같은 리뷰는 항상 같은 이미지를 표시
 */
export const getReviewImage = (reviewId: string): string => {
  // reviewId를 숫자로 변환하여 이미지 인덱스 결정
  const hash = reviewId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[hash % images.length];
};

/**
 * 랜덤 이미지 선택 (기존 호환성 유지)
 */
export const randomImage = (): string => {
  return images[Math.floor(Math.random() * images.length)];
};
