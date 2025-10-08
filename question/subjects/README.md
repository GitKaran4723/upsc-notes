# Subject Practice Questions - How to Add Questions

## 📁 Directory Structure
```
question/subjects/
├── metadata.json          # Master index of all subjects, books, and chapters
├── history/
│   ├── ncert-ancient-ch1.json
│   ├── ncert-ancient-ch2.json
│   └── ...
├── polity/
│   ├── ncert-polity-11-ch1.json
│   └── ...
├── economy/
├── geography/
├── environment/
└── science/
```

## 📝 JSON Question Format

### Question Structure
```json
{
  "id": "unique-identifier",           // Format: subject-book-chapter-qNumber
  "question": "Question text here",
  "options": [
    "Option A text",
    "Option B text",
    "Option C text",
    "Option D text"
  ],
  "correct_option": "Exact text of correct option",
  "explanation": "Detailed explanation with reasoning",
  "difficulty": "easy|medium|hard",
  "tags": ["tag1", "tag2", "tag3"],    // For filtering and search
  "source": "Book name and chapter",
  "chapter": "Chapter name",
  "book": "Book name",
  "dateAdded": "YYYY-MM-DD",
  "importance": "high|medium|low",     // For prioritization
  "previouslyAsked": true|false,       // Was it asked in previous UPSC exams?
  "notes": "Quick revision notes or memory tips"
}
```

## 🎯 How to Add New Questions Daily

### Step 1: Identify the Subject and Chapter
- Choose subject: history, polity, economy, geography, environment, science
- Find or create the appropriate JSON file

### Step 2: File Naming Convention
Format: `{book-id}-{chapter-id}.json`

Examples:
- `ncert-ancient-ch1.json` → NCERT Ancient India, Chapter 1
- `laxmikanth-ch5.json` → Laxmikanth Polity, Chapter 5
- `ramesh-singh-ch10.json` → Ramesh Singh Economy, Chapter 10

### Step 3: Create/Update Question File
1. Open the JSON file for the chapter you studied
2. Add your questions in the array format
3. Ensure each question has a unique ID

### Step 4: Update Metadata
After adding questions, update `metadata.json`:
- Increment the `questionCount` for that chapter
- Update `totalQuestions` count
- Update `lastUpdated` date

## 💡 Pro Tips

### Question ID Format
- **History**: `hist-{book}-ch{X}-q{Y}`
  - Example: `hist-ancient-ch1-q5`
  
- **Polity**: `pol-{book}-ch{X}-q{Y}`
  - Example: `pol-laxmikanth-ch3-q12`
  
- **Economy**: `eco-{book}-ch{X}-q{Y}`
  - Example: `eco-singh-ch7-q8`

### Tags Best Practices
Use relevant tags for easy filtering:
- Topic names: "Indus Valley", "Constitution", "GDP"
- Concepts: "Fundamental Rights", "Monetary Policy"
- Exam relevance: "Frequently Asked", "Current Affairs"
- Difficulty indicators: "Tricky", "Common mistake"

### Difficulty Levels
- **easy**: Direct questions, factual recall
- **medium**: Application-based, requires understanding
- **hard**: Analytical, multiple concepts, statement-based

### Importance Levels
- **high**: Core topics, frequently asked in UPSC
- **medium**: Important but not frequently tested
- **low**: Good to know, rarely appears

## 🔄 Daily Workflow

1. **After reading a chapter:**
   - Open the corresponding JSON file
   - Add 5-10 questions from what you studied
   - Include questions from examples, case studies, intext questions

2. **Question Sources:**
   - NCERT intext questions
   - Exercise questions
   - Important points from the chapter
   - Previous year questions related to the chapter
   - Your own doubt-based questions

3. **Explanation Tips:**
   - Write clear, exam-oriented explanations
   - Add context and connecting concepts
   - Include memory tricks or mnemonics
   - Mention common mistakes to avoid

## 📊 Example: Adding Questions for a New Chapter

### Scenario: You just read "Mauryan Empire" chapter

1. **Create file**: `history/ncert-ancient-ch4.json`

2. **Add questions**:
```json
[
  {
    "id": "hist-ancient-ch4-q1",
    "question": "Chandragupta Maurya founded the Mauryan Empire in which year?",
    "options": ["325 BCE", "322 BCE", "305 BCE", "273 BCE"],
    "correct_option": "322 BCE",
    "explanation": "Chandragupta Maurya founded the Mauryan Empire around 322 BCE after defeating the Nanda dynasty. This marked the beginning of one of the largest empires in ancient India.",
    "difficulty": "easy",
    "tags": ["Mauryan Empire", "Chandragupta Maurya", "Ancient dates"],
    "source": "NCERT Class 12 - Chapter 4: Mauryan Empire",
    "chapter": "Mauryan Empire",
    "book": "NCERT Ancient India",
    "dateAdded": "2025-10-09",
    "importance": "high",
    "previouslyAsked": true,
    "notes": "Remember: 322 BCE = Maurya begins, 185 BCE = Maurya ends"
  }
]
```

3. **Update metadata.json**:
```json
{
  "id": "ch4",
  "name": "Mauryan Empire",
  "questionCount": 1
}
```

## 🎓 Question Quality Checklist

Before adding a question, ensure:
- ✅ Question is clear and unambiguous
- ✅ All four options are plausible
- ✅ Correct option is accurate
- ✅ Explanation is detailed and exam-oriented
- ✅ Tags are relevant and specific
- ✅ Source is properly cited
- ✅ ID is unique and follows naming convention
- ✅ No spelling or grammatical errors

## 🔧 Tools & Scripts (Coming Soon)

We'll add helper scripts for:
- Auto-updating question counts in metadata
- Validating JSON structure
- Generating question statistics
- Exporting questions by tags/difficulty

---

**Happy Learning! 📚 Keep adding questions daily and practice regularly! 🎯**
