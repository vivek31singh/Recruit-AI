import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 50,
  className,
  fallback,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      onError={({ currentTarget }) => {
        if (fallback) {
          currentTarget.src = fallback;
        }
      }}
    />
  );
};

