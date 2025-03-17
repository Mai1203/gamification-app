import { Code2, LogIn, UserPlus, Trophy } from "lucide-react";

export const Header = () => {

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Code2 className="h-8 w-8 text-indigo-600" />
            <span
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              EdoCode
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};
