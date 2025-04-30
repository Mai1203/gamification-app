
interface ProgressBarProps {
  label: string;
  progress: number;
  color: 'rose' | 'blue' | 'yellow';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress, color }) => {
  const colorClasses = {
    rose: 'bg-rose-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`${colorClasses[color]} h-2 rounded-full transition-all`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
  
};

export default ProgressBar;