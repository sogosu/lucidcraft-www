import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center justify-center mb-2 md:mb-3 relative w-[49px] md:w-[62px] h-[49px] md:h-[62px]">
        {/* Left wing */}
        <Image
          src="/logo-wing-left.svg"
          alt=""
          width={62}
          height={62}
          className="absolute left-0 w-[24px] md:w-[31px] h-[49px] md:h-[62px]"
        />
        {/* Right wing (flipped) */}
        <Image
          src="/logo-wing-right.svg"
          alt=""
          width={62}
          height={62}
          className="absolute right-0 scale-x-[-1] w-[24px] md:w-[31px] h-[49px] md:h-[62px]"
        />
      </div>
      <span className="text-white text-[35px] md:text-[44px] font-bold tracking-[-1px] md:tracking-[-1.3px] font-sans">lucidcraft</span>
    </div>
  );
}