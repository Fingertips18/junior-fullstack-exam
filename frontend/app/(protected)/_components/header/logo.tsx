import Image from "next/image";

import { FINGERTIPS } from "@/constants/assets";

export function Logo() {
  return (
    <div className="relative w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden">
      <Image
        src={FINGERTIPS}
        alt="Fingertips"
        fill
        sizes="100%"
        priority
        placeholder="blur"
        className="object-cover object-center"
      />
    </div>
  );
}
