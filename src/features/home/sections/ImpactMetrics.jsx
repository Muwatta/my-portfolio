import { SectionHeader } from "../../../components/ui/SectionHeader";
import { Container } from "../../../components/layout/Container";
import { StatCounter } from "./components/StatCounter";
import { impactStats, recognition } from "../../../data";

export const ImpactMetrics = () => {
  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950" />

      <Container className="relative z-10">
        <SectionHeader
          title="Impact &"
          highlight="Outcomes"
          subtitle="Measurable results from systems built and developers mentored."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <StatCounter key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Recognition */}
        <div className="text-center">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-6">
            Recognition
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {recognition.map((item) => (
              <div
                key={item.title}
                className="px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-sm"
              >
                <span className="text-slate-300">{item.title}</span>
                <span className="text-slate-500 mx-2">•</span>
                <span className="text-blue-400">{item.type}</span>
                <span className="text-slate-600 ml-2">{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
