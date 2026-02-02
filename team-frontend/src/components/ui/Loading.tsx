export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative flex items-center justify-center h-16 w-16">
        
        {/* Layer 1: The Outer Halo (Slow pulse) */}
        <div className="absolute inset-0 bg-blue-500/10 rounded-[35%] animate-pulse scale-150 blur-xl"></div>
        
        {/* Layer 2: The Expanding Rings (Professional standard) */}
        <div className="absolute inset-0 border-[3px] border-blue-100 rounded-[30%] animate-ping opacity-20"></div>
        <div className="absolute inset-0 border-[3px] border-blue-600/30 rounded-[30%] animate-ping opacity-10 [animation-delay:0.2s]"></div>

        {/* Layer 3: The Main Action - Squircle Bloom */}
        <div className="relative h-12 w-12 bg-blue-600 rounded-[30%] shadow-lg shadow-blue-200 flex items-center justify-center">
          
          {/* Layer 4: The Internal "Breathe" - Pure Geometry */}
          <div className="h-4 w-4 bg-white/40 rounded-full animate-pulse"></div>
          
          {/* Spin Ring around the squircle */}
          <div className="absolute inset-[-6px] border-2 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>

      {/* Professional Indicator Text */}
      <div className="text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-800">
          Processing
        </p>
        <div className="flex gap-1 justify-center mt-2">
           <div className="h-1 w-1 bg-blue-600 rounded-full animate-bounce"></div>
           <div className="h-1 w-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
           <div className="h-1 w-1 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};