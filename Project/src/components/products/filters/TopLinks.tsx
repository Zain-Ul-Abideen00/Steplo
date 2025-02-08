import { topLinks } from "./constants";

interface TopLinksProps {
  selectedTopLink: string | null;
  onTopLinkClick: (category: string) => void;
}

export function TopLinks({ selectedTopLink, onTopLinkClick }: TopLinksProps) {
  return (
    <div className="space-y-4 mb-6">
      {topLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => onTopLinkClick(link.category)}
          className={`block text-sm transition-colors w-full text-left ${
            selectedTopLink === link.category
              ? "text-black font-semibold"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
} 