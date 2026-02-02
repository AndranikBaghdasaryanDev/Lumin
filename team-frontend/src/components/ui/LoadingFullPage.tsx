export const LoadingFullPage = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC]">
      
      {/* 1. Large Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-blue-100/50 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-1/4 left-1/3 h-[300px] w-[300px] bg-indigo-50/50 rounded-full blur-[100px] animate-bounce duration-[6000ms]"></div>

      {/* 2. Central Loading Unit */}
      <div className="relative flex flex-col items-center">
        
        {/* The Main Animated Shape */}
        <div className="relative h-20 w-20 mb-8">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 border-[3px] border-slate-200 rounded-[35%]"></div>
          <div className="absolute inset-0 border-[3px] border-transparent border-t-blue-600 rounded-[35%] animate-spin [animation-duration:1s]"></div>
          
          {/* Inner Pulsing Squircle */}
          <div className="absolute inset-4 bg-blue-600 rounded-[30%] shadow-xl shadow-blue-200 animate-pulse flex items-center justify-center">
             {/* Small White Center Point */}
             <div className="h-2 w-2 bg-white rounded-full opacity-80"></div>
          </div>
        </div>

        {/* 3. Professional Branding & Progress */}
        <div className="text-center z-10">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-slate-900 mb-2">
            Lumin
          </h2>
          
          {/* Fake Progress Bar (Realistic Style) */}
          <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-blue-600 rounded-full animate-[loading_2s_ease-in-out_infinite] w-full origin-left"></div>
          </div>
          
          <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
            Establishing Secure Connection
          </p>
        </div>
      </div>

      {/* 4. Bottom Footer Note */}
      <div className="absolute bottom-10 text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">
        Encryption Active • v2.0.4
      </div>

      {/* Inline Styles for the specific Progress Bar logic */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); opacity: 0; }
        }
      `}} />
    </div>
  );
};