export function AnimatedBackground() {
    return (
      <div className="fixed inset-0 -z-10">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white to-white/70" />

        
        {/* Overlay with reduced opacity for depth */}
        <div className="absolute inset-0 bg-white opacity-20" />
        
        {/* Blob elements with adjusted colors and opacity */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
          <div className="absolute bottom-1/2 right-1/2 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        
        </div>
      </div>
    );
  }
  