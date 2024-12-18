"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function AnimatedLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={cn(
        "relative py-[18px] group text-foreground/90 hover:text-foreground/100 transition-colors",
        className
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute bottom-0 left-0 h-0.5 bg-primaryColor transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}

export default AnimatedLink;
