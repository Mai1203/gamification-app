import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function AnimationLoaded() {
  return (
    <div className="flex flex-col items-center gap-4 m-40">
      <DotLottieReact
        autoplay
        loop
        src="/animation/loaded.json" 
        className="w-64 h-64"
      />
      <p className="text-indigo-600 font-medium text-lg">Cargando...</p>
    </div>
  );
}