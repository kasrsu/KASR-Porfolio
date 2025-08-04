
import Preloader from './preloader';

interface TransparentPreloaderProps {
  onLoadComplete: () => void;
  minLoadTime?: number;
  maxLoadTime?: number;
}

const TransparentPreloader: React.FC<TransparentPreloaderProps> = ({
  onLoadComplete,
  minLoadTime = 3000,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm flex items-center justify-center">
      <div className="bg-black/50 rounded-lg p-8 backdrop-blur-md shadow-xl">
        <Preloader 
          onLoadComplete={onLoadComplete}
          minLoadTime={minLoadTime}

        />
      </div>
    </div>
  );
};

export default TransparentPreloader;
