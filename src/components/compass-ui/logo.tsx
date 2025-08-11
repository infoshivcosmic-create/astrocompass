import Image from 'next/image';
import type {HTMLAttributes} from 'react';

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Image src="/images/logo.png" alt="Shiv Cosmic Energy Solutions" width={60} height={20} unoptimized />
    </div>
  );
}
