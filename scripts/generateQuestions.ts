/**
 * Question Generator for The Daily Take
 *
 * This script:
 * 1. Fetches current data (market, sports, news)
 * 2. Sends to AI to generate trivia questions
 * 3. Outputs formatted questions ready for the game
 *
 * Usage: npx ts-node scripts/generateQuestions.ts
 */

// Question format for the game
interface OpenQuestion {
  id: string;
  type: "open";
  category: "finance" | "sports" | "general";
  question: string;
  answers: Record<string, number>; // answer -> rarity score (higher = rarer = more points)
}

interface RankedQuestion {
  id: string;
  type: "ranked";
  category: "finance" | "sports" | "general";
  question: string;
  rankedList: string[]; // Correct order from 1st to last
}

// ============================================
// PROMPT TEMPLATE FOR AI QUESTION GENERATION
// ============================================

export const QUESTION_GENERATION_PROMPT = `
You are a trivia question writer for "The Daily Take", a daily quiz game similar to Wordle but for trivia. The audience is primarily finance professionals, sports fans, and people who follow current events.

QUESTION TYPES:

1. OPEN-ENDED QUESTIONS
- Player types a free-form answer
- Less common answers score MORE points (incentivizes creative thinking)
- Must have multiple valid answers (at least 8-10)
- Answers need rarity scores: common answers = 10-30 points, rare answers = 70-100 points

Example format:
{
  "id": "fin-2025-01-09-1",
  "type": "open",
  "category": "finance",
  "question": "Name a company that went public in 2024",
  "answers": {
    "Reddit": 20,
    "Astera Labs": 60,
    "Viking Holdings": 70,
    "Rubrik": 75,
    "Ibotta": 80
  }
}

2. RANKED QUESTIONS
- Player puts 4 items in the correct order
- Score based on how many positions are correct
- Must be objectively verifiable

Example format:
{
  "id": "sport-2025-01-09-1",
  "type": "ranked",
  "category": "sports",
  "question": "Rank these NFL teams by wins this season (most to fewest): Bills, Lions, Chiefs, Eagles",
  "rankedList": ["Lions", "Bills", "Chiefs", "Eagles"]
}

GUIDELINES:
- Questions should feel SMART, not random trivia
- Avoid obscure facts that feel unfair
- Current events questions should reference specific dates when the answer could change
- Finance questions can cover: stocks, markets, M&A, earnings, macro, crypto, private equity
- Sports questions can cover: NFL, NBA, MLB, soccer, golf, tennis, Olympics
- General questions can cover: politics, pop culture, geography, business, technology
- Mix difficulty: some questions most people can answer, some reward deep knowledge

CURRENT DATA PROVIDED:
{DATA_PLACEHOLDER}

Generate 5 questions based on the data above:
- 2 open-ended questions
- 2 ranked questions
- 1 of your choice (most interesting angle)

Output as a JSON array of question objects.
`;

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

async function fetchMarketData(): Promise<string> {
  // In production, this would call real APIs
  // For now, return placeholder that you'd replace with real data

  // Free APIs to consider:
  // - Alpha Vantage (stocks): https://www.alphavantage.co/
  // - Finnhub (stocks): https://finnhub.io/
  // - CoinGecko (crypto): https://www.coingecko.com/en/api
  // - Federal Reserve (economic): https://fred.stlouisfed.org/docs/api/

  return `
MARKET DATA (${new Date().toISOString().split('T')[0]}):

S&P 500: 5,892.45 (+0.6%)
Dow Jones: 42,635.20 (+0.3%)
Nasdaq: 19,478.88 (+1.1%)

Top Gainers:
1. NVIDIA (NVDA): +4.2%
2. Tesla (TSLA): +3.8%
3. AMD: +3.1%

Top Losers:
1. Boeing (BA): -2.1%
2. Johnson & Johnson (JNJ): -1.8%
3. Pfizer (PFE): -1.5%

Crypto:
- Bitcoin: $94,250
- Ethereum: $3,420

Recent IPOs:
- ServiceTitan (TTAN) - Dec 2024
- Lineage (LINE) - Jul 2024

Recent M&A:
- Capital One acquiring Discover ($35B)
- Mars acquiring Kellanova ($36B)
`;
}

async function fetchSportsData(): Promise<string> {
  // In production, call ESPN API or similar
  // Free APIs to consider:
  // - The Sports DB: https://www.thesportsdb.com/api.php
  // - API-Football: https://www.api-football.com/
  // - Ball Don't Lie (NBA): https://www.balldontlie.io/

  return `
SPORTS DATA (${new Date().toISOString().split('T')[0]}):

NFL Playoff Picture:
- AFC #1 seed: Kansas City Chiefs (15-2)
- NFC #1 seed: Detroit Lions (15-2)
- Super Bowl favorites: Lions, Chiefs, Bills

Recent NFL Scores:
- Lions 31, Vikings 9
- Bills 35, Patriots 21

NBA Standings (Top 5 East):
1. Cleveland Cavaliers (32-4)
2. Boston Celtics (27-10)
3. New York Knicks (25-13)

NBA Standings (Top 5 West):
1. Oklahoma City Thunder (30-6)
2. Houston Rockets (24-12)
3. Memphis Grizzlies (24-13)

NFL MVP Race:
1. Lamar Jackson (BAL)
2. Josh Allen (BUF)
3. Jared Goff (DET)
`;
}

async function fetchNewsData(): Promise<string> {
  // In production, call news API
  // Free APIs to consider:
  // - NewsAPI: https://newsapi.org/
  // - GNews: https://gnews.io/
  // - CurrentsAPI: https://currentsapi.services/

  return `
NEWS & CURRENT EVENTS (${new Date().toISOString().split('T')[0]}):

Politics:
- Trump inauguration scheduled for January 20, 2025
- Cabinet confirmation hearings ongoing
- TikTok ban deadline approaching (Jan 19)

Business:
- Fed held rates steady at 4.25-4.50%
- OpenAI reportedly valued at $157B in latest round
- Apple Vision Pro sales below expectations

Tech:
- CES 2025 happening in Las Vegas
- NVIDIA announced new RTX 5090
- Meta laying off 5% of workforce

World:
- Canada PM Trudeau announced resignation
- South Korea political crisis ongoing
`;
}

// ============================================
// MAIN GENERATION FUNCTION
// ============================================

async function generateQuestions() {
  console.log("📊 Fetching current data...\n");

  const [marketData, sportsData, newsData] = await Promise.all([
    fetchMarketData(),
    fetchSportsData(),
    fetchNewsData(),
  ]);

  const combinedData = `
${marketData}

${sportsData}

${newsData}
`;

  const prompt = QUESTION_GENERATION_PROMPT.replace("{DATA_PLACEHOLDER}", combinedData);

  console.log("=".repeat(60));
  console.log("PROMPT FOR AI (copy this to Claude or ChatGPT):");
  console.log("=".repeat(60));
  console.log(prompt);
  console.log("=".repeat(60));
  console.log("\nPaste the AI's response into src/lib/questionBank.ts");
  console.log("\nTo automate this, add your OpenAI/Anthropic API key and uncomment the API call below.");
}

// ============================================
// OPTIONAL: AUTOMATED API CALL
// ============================================

/*
import Anthropic from "@anthropic-ai/sdk";

async function generateWithClaude(prompt: string): Promise<string> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
*/

// Run the script
generateQuestions();
