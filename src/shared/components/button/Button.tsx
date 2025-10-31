import tw from '@/shared/utils/tw';
import { cva } from 'class-variance-authority';
import type { Ref } from 'react';

interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'sub';
  size?: 'lg' | 'sm';
  type?: 'submit' | 'button';
  disable?: boolean;
  className?: string;
  ref?: Ref<HTMLButtonElement | null>;
  onClick?: () => void;
}

export const ButtonClass = cva(
  `px-2 py-1 rounded-lg text-base duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-text-primary`,
  {
    variants: {
      variant: {
        primary: `bg-primary text-[#2F2420]  hover:bg-[#5A6538] `,
        sub: 'bg-trnasparent border-primary border-2 text-primary   hover:bg-[#F5F5DC] hover:border-[#5A6538]',
      },
      size: {
        lg: 'h-10 min-w-25',
        sm: 'min-w-20 h-7',
      },
      defaultVariants: {
        color: 'primary',
        size: 'lg',
      },
    },
  }
);

function Button({
  children,
  variant,
  size,
  type = 'submit',
  ref,
  disable,
  className,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      className={tw(ButtonClass({ variant, size, className }))}
      type={type}
      ref={ref}
      disabled={disable}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
