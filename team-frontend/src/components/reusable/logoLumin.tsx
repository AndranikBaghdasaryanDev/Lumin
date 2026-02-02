export const LogoLumin = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="
        relative h-10 w-10 overflow-hidden rounded-[22%] bg-[#2563EB] 
        flex items-center justify-center
        cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-110 hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)]
        active:scale-90
        group
      ">
        {/* 4-Leaf Logo Grid - Adjusted for Mini scale */}
        <div className="grid grid-cols-2 gap-0.5 scale-95 transition-transform duration-300 group-hover:scale-105">
          {/* Top Left Leaf */}
          <div className="h-3 w-3 bg-white rounded-tl-full rounded-tr-full rounded-bl-full transform rotate-45 translate-x-0.5 translate-y-0.5"></div>
          
          {/* Top Right Leaf */}
          <div className="h-3 w-3 bg-white rounded-tl-full rounded-tr-full rounded-br-full transform -rotate-45 -translate-x-0.5 translate-y-0.5"></div>
          
          {/* Bottom Left Leaf */}
          <div className="h-3 w-3 bg-white rounded-tl-full rounded-bl-full rounded-br-full transform -rotate-45 translate-x-0.5 -translate-y-0.5"></div>
          
          {/* Bottom Right Leaf */}
          <div className="h-3 w-3 bg-white rounded-tr-full rounded-bl-full rounded-br-full transform rotate-45 -translate-x-0.5 -translate-y-0.5"></div>
        </div>

        {/* Subtle Bottom Bevel - Thinner for mini version */}
        <div className="absolute bottom-0 h-0.5 w-full bg-black/10 group-hover:opacity-0 transition-opacity"></div>
      </div>
    </div>
  );
};