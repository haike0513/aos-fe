'use client'
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";


function Header() {

  const scrollRef = useRef(null);
  const [top, setTop] = useState(0)
  const handleScroll = useCallback(() => {
    setTop(window.scrollY)
  }, []);
  // const navigate = useNavigate();

  const path = usePathname();
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);

    }
  }, [handleScroll]);
  const showBlur = useMemo(() => {
    return top > 50 ;
  }, [top]);
  // console.log('user session', session);
  return (
    <div className={clsx("w-full relative backdrop-blur-md", showBlur ? ' backdrop-blur-md': '')} ref={scrollRef}>
      <div className=" absolute -translate-y-20">
        {/* <img className=" w-96 h-60" src="/images/quest/questBg1.png" /> */}
      </div>
      <div className=" max-w-5xl w-full mx-auto flex items-center py-6 relative z-10">
        <div className="navbar-start">
          <Link className="" href="/">
            <img className=" h-10" src="/images/header/headerIcon.png"/>
          </Link>
        </div>
        <div className="flex items-center gap-6 ml-10">
          <Link href={'/opml'} className={twMerge(clsx("px-2 py-1 rounded-sm text-sm font-semibold text-[#666666]", {
            'bg-linear-second text-white': path === '/opml',
          }))}>
            OPML 
          </Link>
      </div>
      </div>
    </div>
  )
}

export default Header