import Image from 'next/image';
import type {HTMLAttributes} from 'react';

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Image src="/images/logo.png" alt="Vastu Compass Pro" width={120} height={40} />
    </div>
  );
}
