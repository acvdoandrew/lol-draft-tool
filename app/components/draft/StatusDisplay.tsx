import { draftPhases } from '@/lib/constants/draftPhases';

type StatusDisplayProps = {
  isActive: boolean;
  phase: number;
  onStart: () => void;
};

export default function StatusDisplay({
  isActive,
  phase,
  onStart
}: StatusDisplayProps) {
  return (
    <div className="text-center mb-6">
      {!isActive ? (
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Start Draft
        </button>
      ) : phase < draftPhases.length ? (
        <div className="text-lg text-yellow-500">
          {draftPhases[phase].team} Team {draftPhases[phase].action}
        </div>
      ) : (
        <div className="text-green-500">Draft Complete</div>
      )}
    </div>
  );
}