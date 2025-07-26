import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  progress: number;
  color: 'indigo' | 'purple';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress, color }) => {
  const colorClasses = {
    indigo: 'bg-indigo-600 dark:bg-indigo-800',
    purple: 'bg-purple-600  dark:bg-purple-800',
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {label}
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {progress}%
        </span>
      </div>

      <div className="w-full bg-gray-300 dark:bg-gray-800 rounded-full h-4 shadow-inner overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full relative ${colorClasses[color]}`}
        >
          <span className="absolute right-0 top-0 h-full w-2 rounded-full bg-white/50 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
