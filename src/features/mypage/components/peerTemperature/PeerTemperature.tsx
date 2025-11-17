import { useParams } from 'react-router-dom';
import { usePeerReviewScore } from './hooks/usePeerReviewScore';
import { useTemperatureAnimation } from './hooks/useTemperatureAnimation';
import { getTemperatureColor } from './utils/getTemperatureColor';
import { getTemperatureDisplay } from './utils/getTemperatureDisplay';

function PeerTemperature() {
  const { id: profileId } = useParams();
  const { averageScore, loading } = usePeerReviewScore(profileId);
  const temperatureRef = useTemperatureAnimation(averageScore);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-5 min-w-50 max-w-50 bg-gray-200 rounded-full animate-pulse" />
        <p className="text-gray-400">-</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-5 min-w-50 max-w-50 bg-white rounded-full">
        <div
          ref={temperatureRef}
          className="h-5 rounded-full transition-width duration-300"
          style={{ width: '0%', backgroundColor: getTemperatureColor(averageScore) }}
        />
      </div>
      <p className="text-sm font-medium">{getTemperatureDisplay(averageScore)}</p>
    </div>
  );
}

export default PeerTemperature;
