import Image from 'next/image';
import type {HTMLAttributes} from 'react';

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="relative w-[60px] h-[20px]">
        <Image src="/images/logo.png" alt="Shiv Cosmic Energy Solutions" fill unoptimized />
      </div>
    </div>
  );
}
