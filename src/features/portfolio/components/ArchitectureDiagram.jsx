import { parseArchitecture } from "../architecture";

const Arrow = () => (
  <div className="flex justify-center py-1" aria-hidden="true">
    <div className="flex flex-col items-center">
      <div className="w-0.5 h-4 bg-blue-500/60" />
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        className="text-blue-500"
      >
        <path d="M7 8L0 0.5L14 0.5L7 8Z" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
  </div>
);

export const ArchitectureDiagram = ({
  architecture,
  title = "Architecture",
}) => {
  const nodes = parseArchitecture(architecture);

  if (nodes.length === 0) return null;

  return (
    <div
      className="my-8"
      role="img"
      aria-label={`${title}: ${nodes.map((n) => n.label).join(" → ")}`}
    >
      <ol className="flex flex-col items-stretch">
        {nodes.map((node, index) => (
          <li key={`${node.label}-${index}`} className="flex flex-col">
            <div className="always-dark rounded-xl border border-blue-500/25 bg-slate-900/60 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-blue-400 w-fit">
                  {node.label}
                </span>
                {node.extras.map((extra) => (
                  <span
                    key={extra}
                    className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700"
                  >
                    {extra}
                  </span>
                ))}
              </div>
            </div>
            {index < nodes.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ArchitectureDiagram;
