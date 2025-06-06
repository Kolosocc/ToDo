import { useState, useEffect } from 'react';

export function useIsDesktop(breakpoint: number = 1000): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= breakpoint);
    checkWidth();

    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [breakpoint]);

  return isDesktop;
}
