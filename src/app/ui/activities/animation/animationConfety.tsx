import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const AnimationConfety = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <DotLottieReact
        autoplay
        loop={false}
        src="/animation/animation-confeti.json"
        className="w-full h-full"
      />
    </div>
  );
};
