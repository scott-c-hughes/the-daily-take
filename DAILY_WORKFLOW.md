# Daily Question Workflow

## Your 10-Minute Daily Routine

### Step 1: Gather Today's Data (3 mins)
Quick scan of:
- **Markets**: S&P close, big movers, any major deals
- **Sports**: Last night's scores, standings, trades
- **News**: Top 3 headlines

### Step 2: Generate Questions with Claude (2 mins)
Paste this prompt into Claude:

```
Generate 5 trivia questions for The Daily Take (January 10, 2025).

TODAY'S DATA:
- S&P 500: [number]
- Top stock: [ticker] +X%
- [Sport] score: [Team] beat [Team]
- News: [headline]

Format each question as JSON:

OPEN QUESTIONS (players type answer, rare = more points):
{
  "id": "daily-2025-01-10-1",
  "type": "open",
  "category": "finance" | "sports" | "general",
  "question": "Question text",
  "answers": {
    "Common Answer": 15,
    "Medium Answer": 40,
    "Rare Answer": 75
  }
}

RANKED QUESTIONS (players order 4 items):
{
  "id": "daily-2025-01-10-2",
  "type": "ranked",
  "category": "finance" | "sports" | "general",
  "question": "Rank these by X: A, B, C, D",
  "rankedList": ["First", "Second", "Third", "Fourth"]
}

Give me:
- 2 open finance/business questions
- 1 open sports question
- 1 ranked question (any category)
- 1 open general/news question

Make them feel smart and relevant, not random trivia.
```

### Step 3: Add to Code (3 mins)
1. Open `src/lib/dailyQuestions.ts`
2. Add a new date entry with the 5 questions
3. Save

### Step 4: Deploy (2 mins)
```bash
git add .
git commit -m "Add questions for Jan 10"
git push
```

Vercel auto-deploys in ~30 seconds.

---

## File Location

All daily questions go in:
```
src/lib/dailyQuestions.ts
```

Format:
```typescript
"2025-01-10": [
  { /* question 1 */ },
  { /* question 2 */ },
  { /* question 3 */ },
  { /* question 4 */ },
  { /* question 5 */ },
],
```

---

## Question Quality Tips

**Good questions:**
- "Name a company that reported earnings this week"
- "Rank these stocks by YTD performance"
- "Name a team that made the NFL playoffs"

**Bad questions:**
- "What was the exact S&P close?" (too specific, not fun)
- "Name a stock" (too broad, boring)
- "Who won the 1987 World Series?" (not timely)

**The goal:** Questions that make players think "Oh, that's a good one"

---

## Fallback

If you skip a day, the game automatically uses questions from the question bank (`src/lib/questionBank.ts`). Players will still have something to play.
