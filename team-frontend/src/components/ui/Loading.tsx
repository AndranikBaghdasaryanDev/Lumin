export const Loading = () => {
  return (

      <div className="relative w-24 h-24 animate-spin">
        {[...Array(10)].map((_, i) => {
          const angle = i * 36; 
          return (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gray-500 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(40px)`,
              }}
            ></div>
          );
        })}
      </div>
  );
};