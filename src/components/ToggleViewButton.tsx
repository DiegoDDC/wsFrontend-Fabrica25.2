interface Props {
  view: 'grid' | 'list';
  toggleView: () => void;
}

export default function ToggleViewButton({ view, toggleView }: Props) {
  return (
    <button
      onClick={toggleView}
      className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700"
    >
      {view === 'grid' ? '📋 Lista' : '🧩 Grid'}
    </button>
  );
}