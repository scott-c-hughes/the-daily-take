# Daily Question Generation Prompt

Copy this prompt into Claude or ChatGPT, update the data section with current info, and get questions back.

---

## THE PROMPT

```
You are a trivia question writer for "The Daily Take", a daily quiz game. The audience is finance professionals, sports fans, and people who follow current events.

QUESTION TYPES:

1. OPEN-ENDED (players type an answer, rare answers = more points)
{
  "id": "unique-id",
  "type": "open",
  "category": "finance" | "sports" | "general",
  "question": "The question text",
  "answers": {
    "Common Answer": 15,
    "Less Common": 40,
    "Rare Answer": 75,
    "Very Rare": 90
  }
}

2. RANKED (players order 4 items correctly)
{
  "id": "unique-id",
  "type": "ranked",
  "category": "finance" | "sports" | "general",
  "question": "Rank these by X: Item1, Item2, Item3, Item4",
  "rankedList": ["Correct1st", "Correct2nd", "Correct3rd", "Correct4th"]
}

GUIDELINES:
- Questions should feel SMART and RELEVANT, not random
- Mix difficulty levels
- Open questions need 8-15 valid answers with varied rarity scores
- Ranked questions must be objectively verifiable
- Reference specific dates when answers could change over time

TODAY'S DATA:
[PASTE CURRENT DATA HERE - market closes, sports scores, news headlines]

Generate 10 questions (mix of open and ranked, across all categories).
Output as a JSON array I can paste directly into code.
```

---

## EXAMPLE DATA TO PASTE

### Markets
- S&P 500 closed at: 5,892.45
- Dow closed at: 42,635.20
- Top gainer: NVIDIA +4.2%
- Bitcoin: $94,250
- Recent deal: Capital One buying Discover for $35B

### Sports
- NFL: Chiefs and Lions both 15-2, top seeds
- NBA: Cavaliers leading East at 32-4
- NFL MVP favorite: Lamar Jackson

### News
- Trump inauguration Jan 20
- TikTok ban deadline Jan 19
- Fed holding rates at 4.25-4.50%

---

## QUICK DAILY WORKFLOW

1. Spend 5 mins gathering today's data (market close, scores, headlines)
2. Paste into prompt above
3. Run through Claude
4. Review the 10 questions, pick best 5
5. Add to `src/lib/questionBank.ts`
6. Push to deploy

---

## QUESTION QUALITY CHECKLIST

✓ Would a smart person find this interesting?
✓ Is there a clear, verifiable answer?
✓ For open questions: Are there multiple valid answers?
✓ For ranked questions: Is the order objective, not opinion?
✓ Does it feel fair (not too obscure)?
✓ Is it timely/relevant?
