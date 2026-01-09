import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            About
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Content */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-amber-400 mb-3">
              What is The Daily Take?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The Daily Take is a daily trivia game that tests your knowledge
              across finance, sports, and general knowledge. Each day features
              5 new questions designed to challenge and entertain.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-amber-400 mb-3">
              How to Play
            </h2>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Open-Ended Questions (Q1-Q2)
                </h3>
                <p className="leading-relaxed">
                  Type your answer to the prompt. Less common answers score
                  more points! If everyone guesses &quot;Apple,&quot; try &quot;Analog
                  Devices&quot; for a higher score.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Ranked Questions (Q3-Q4)
                </h3>
                <p className="leading-relaxed">
                  Put the items in the correct order. The more positions you
                  get right, the more points you earn.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-amber-400 mb-3">
              Scoring
            </h2>
            <ul className="text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                Each question is worth 0-100 points
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                Maximum score per game: 500 points
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                Build a streak by playing every day
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-amber-400 mb-3">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Finance
              </span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Sports
              </span>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                General Knowledge
              </span>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/play"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold px-8 py-3 rounded-full transition-all"
          >
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
}
