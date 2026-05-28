שמעתי על מישהו שנתן לצ׳אטבוט להכין לו סיכום יומי. הוא הגדיר את הפרומפט בקפידה, הדביק אותו כל בוקר, קרא את התשובה, נאנח, וסגר את הטאב. זה לקח לו ארבע דקות. כל בוקר. כל יום. במשך שלושה חודשים. בגדול, הוא אוטומייט את הדביקה של הפרומפט.

זה בדיוק מה שרוב האנשים עושים עם AI, ומה שהסדרה הזו בנויה לשנות.

יאללה, בואו נצלול.

---

## Claude Code זה לא Claude.ai, ותכלס ההבדל הוא הכל

לפני שפותחים טרמינל, צריך להבין מה אנחנו בונים בכלל.

Claude.ai, האתר, הוא כמו לשלוח הודעה למישהו חכם. אתם/ן שולחות שאלה, הוא עונה, אתם/ן שואלות שאלה אחרת. הוא יושב בצד השני של המסך, לא רואה כלום מהמחשב שלכם, לא יכול לגעת בשום קובץ. הוא מדהים לייעוץ, לכתיבה, לפרומפטים. אבל הוא לא יכול לבצע דברים בשבילכם/ן.

Claude Code זה משהו אחר לגמרי. זה כלי שמותקן על המחשב שלכם, רץ בטרמינל, ויש לו גישה לקבצים שלכם, יכול להריץ פקודות, יכול לקרוא ולכתוב. כמו שמזמינים מישהו לשבת ליד המחשב שלכם ולהריץ דברים בשבילכם.

> **Claude Code** — כלי CLI מבית Anthropic שמריץ את מודל Claude ישירות על המחשב שלכם, עם גישה לקבצים, לטרמינל ולסביבת העבודה.

ממש. אבל רגע, כי כאן יש הבדל קריטי שצריך להבין לפני שרצים קדימה.

---

## הלולאה שהופכת "צ׳אטבוט" ל"אייג׳נט"

בחלק הראשון של הסדרה דיברנו על Plan, Act, Observe, Plan. עכשיו בואו נראה איך זה נראה בפועל עם Claude Code.

אתם/ן נותנות/ים לו מטרה. לא הוראה. לא שאלה. מטרה. "סכם לי את כל הדוחות מהשבוע האחרון ושמור את הסיכום."

המודל מסתכל על מה שיש לו, מתכנן צעדים, מבצע פעולה (קורא קובץ, כותב טקסט, מריץ פקודה), רואה מה קרה, ומתכנן את הצעד הבא. זה לא תשובה אחת. זו סדרה של פעולות שמסתיימת כשהמטרה הושגה.

```
עובדה חביבה: Claude Code הוא open source לגמרי.
הקוד שלו זמין ב-GitHub ואפשר לראות בדיוק מה הוא עושה תחת המכסה.
```

[embed]https://www.youtube.com/watch?v=gHB4JFG9i3k[/embed]

---

## מה צריך לפני שמתחילות/ים — הצ׳קליסט האמיתי

לפני שמתחילים, צריך ארבעה דברים:

**מחשב:** Mac או Windows. המדריך הזה מצולם על Mac, אבל כמעט כל הפקודות זהות.

**טרמינל:** זו תוכנה שבה נותנים למחשב הוראות בטקסט, לא עם עכבר. ב-Mac זה אפליקציה שנקראת Terminal. זה לא מפחיד, זה בדיוק כמו לשלוח הודעות למחשב, רק שהמחשב מבצע אותן מיד.

**Node.js גרסה 18 ומעלה:** זה runtime שמאפשר להריץ קוד JavaScript על המחשב. Claude Code בנוי על גביו, ולכן הוא חייב להיות מותקן. אם אין לכם/ן, נסביר איך להתקין.

**חשבון Anthropic ומפתח API:** לא מנוי ל-Claude.ai. חשבון ב-console.anthropic.com שמשתמש ב-pay-per-use. עלות ריצה אחת לאייג׳נט פשוט: בין 0.01 ל-0.05 דולר. לא הגזמה.

---

## שלב 1: לבדוק אם Node.js מותקן, ואם לא, להתקין

פותחים Terminal. ב-Mac: לוחצים Cmd+Space, מקלידים "Terminal", לוחצים Enter.

מקלידים:

```bash
node --version
```

אם רואים משהו כמו `v18.17.0` או גבוה יותר, מצוין. עוברים לשלב 2.

אם רואים `command not found`, Node.js לא מותקן. הולכות/ים ל-nodejs.org, מורידות/ים את גרסת ה-LTS (זו עם הכיתוב "Recommended For Most Users"), מתקינות/ים אותה כמו כל אפליקציה רגילה. אחרי ההתקנה, סוגרות/ים את Terminal ופותחות/ים מחדש. מריצות/ים `node --version` שוב.

```
עובדה חביבה: Node.js שוחרר ב-2009 על ידי Ryan Dahl.
כיום כמעט 100 מיליון מפתחות/ים משתמשות/ים בו.
הוא לא הולך לשום מקום.
```

---

## שלב 2: להתקין את Claude Code עצמו

עכשיו שיש Node.js, מתקינות/ים Claude Code. בטרמינל:

```bash
npm install -g @anthropic-ai/claude-code
```

זה לוקח בין 30 שניות לדקה. לא לסגור את החלון. מחכות/ים לסיום.

אחרי שהסתיים, מוודאות/ים:

```bash
claude --version
```

אמורות/ים לראות מספר גרסה. אם רואות/ים, Claude Code מותקן.

[embed]https://www.youtube.com/watch?v=tDGiWn0flK8[/embed]

---

## שלב 3: חשבון Anthropic ומפתח API — הדבר שכולם שוכחות/ים להעתיק

הולכות/ים ל-console.anthropic.com. נרשמות/ים או מתחברות/ים.

בסרגל השמאלי, לוחצות/ים על "API Keys". לוחצות/ים "Create Key". נותנות/ים לו שם, לדוגמה `my-agents`.

ואז, הדבר הכי חשוב בכל המדריך: **מעתיקות/ים את המפתח מיד.** אחרי שסוגרות/ים את החלון, לעולם לא תראו אותו שוב. המפתח נראה כך: `sk-ant-api03-...`

עכשיו בחזרה לטרמינל:

```bash
export ANTHROPIC_API_KEY="YOUR_KEY_HERE"
```

זה עובד, אבל נעלם כשסוגרים Terminal. כדי שיעבוד תמיד:

```bash
echo 'export ANTHROPIC_API_KEY="YOUR_KEY_HERE"' >> ~/.zshrc
source ~/.zshrc
```

מה עשינו: הוספנו את המפתח לקובץ ההגדרות של ה-shell שנטען בכל פתיחה חדשה. מעכשיו, כל פעם שתפתחו Terminal, המפתח יהיה שם.

---

## שלב 4: יצירת הפרויקט

בטרמינל:

```bash
cd ~/Desktop
mkdir morning-agent
cd morning-agent
```

הפרויקט שנבנה הוא **morning agent**, אייג׳נט שקורא דוחות כל בוקר ומסכם מה השתנה. הוא פשוט מספיק ללמידה, מועיל מספיק לשימוש אמיתי.

---

## שלב 5: CLAUDE.md, הקובץ שהופך פרויקט לאייג׳נט

זה הלב של כל אייג׳נט ב-Claude Code.

> **CLAUDE.md** — קובץ טקסט רגיל בשם CLAUDE.md שיושב בתיקיית הפרויקט. Claude Code קורא אותו אוטומטית בכל הרצה. זה תיאור התפקיד, הכללים, והסמכויות של האייג׳נט.

חשבו עליו כמו מה שנותנות/ים לעובד/ת חדשה/ה ביום הראשון: מה התפקיד, מה אסור לעשות, ומה לעשות כשלא ברור. בלי CLAUDE.md, לאייג׳נט אין אופי ואין הגבלות.

ליצור את הקובץ. שתי אפשרויות:

**אפשרות א (Terminal):**
```bash
touch CLAUDE.md
open -a TextEdit CLAUDE.md
```

**אפשרות ב (VS Code, אם מותקן):**
```bash
code CLAUDE.md
```

בתוך הקובץ, מדביקות/ים את זה:

```
# Morning Briefing Agent

You are a morning briefing assistant. Every time you run, you:
1. Read all .txt and .md files in the /reports/ folder
2. Compare what you find with the previous state saved in memory.md
3. Write a short summary (max 5 bullet points) of what changed since last time
4. Save the summary to today-summary.md with today's date in the filename
5. Update memory.md with the current state

Your personality: concise, factual, no fluff. Write in Hebrew.

Rules you must always follow:
- Never delete any files
- Never read files outside the /reports/ folder
- If a file seems corrupted or unreadable, note it and skip it, don't stop
- If you are not sure what to do, write "לא ברור" and stop. Don't guess.

When you are done, tell me: "סיימתי. הסיכום שמור ב-[filename]"
```

כל שורה כאן היא החלטה מכוונת. "Never delete any files" לא בשביל אפקט ספרותי. זה כי ביום אחד, האייג׳נט יחליט שדוח ישן "כבר לא רלוונטי" ויעיף אותו. "Don't guess" הוא הכלל הכי חשוב: עדיף שיעצור ויגיד "לא ברור" מאשר יתקדם בביטחון בכיוון הלא נכון.

[embed]https://www.youtube.com/watch?v=uvs1Igr4u6g[/embed]

---

## שלב 6: הרשאות — מה מותר ומה אסור, בכתב

Claude Code שואל אישור לפני כל פעולה. זה טוב, אבל לפרויקט שרץ אוטומטית, צריך להגדיר מראש מה מותר. יוצרים קובץ הגדרות:

```bash
mkdir .claude
touch .claude/settings.json
open -a TextEdit .claude/settings.json
```

מדביקות/ים:

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write(reports/*)",
      "Write(*.md)",
      "Bash(ls:*)",
      "Bash(cat:*)"
    ],
    "deny": [
      "Bash(rm:*)",
      "Bash(curl:*)",
      "Bash(wget:*)"
    ]
  }
}
```

```
עובדה חביבה: הרשאות ב-settings.json חזקות יותר מהוראות ב-CLAUDE.md.
גם אם תכתבו "delete old files" ב-CLAUDE.md,
Bash(rm:*) ב-deny תחסום את זה בכל מקרה.
ה-deny הוא ה-veto הסופי.
```

`allow` מגדיר מה האייג׳נט יכול לעשות בלי לשאול: לקרוא קבצים, לכתוב לפולדר reports ולקבצי markdown, להריץ `ls` ו-`cat`. `deny` הוא הקו האדום. `Bash(rm:*)` אומר שהאייג׳נט לעולם לא ימחק קבצים, גם אם הוראות ה-CLAUDE.md יאמרו לו לעשות כך.

---

## שלב 7: ריצה ראשונה, כן, בפועל

יוצרים תיקיית reports עם קובץ לדוגמה:

```bash
mkdir reports
echo "Meeting notes from today: discussed Q3 targets, agreed on roadmap" > reports/2026-05-27-meeting.txt
```

ועכשיו:

```bash
claude
```

יופיע מסך פתיחה ופרומפט. מקלידות/ים:

```
תריץ את המשימה שלך לפי ה-CLAUDE.md
```

ואז צופות/ים. האייג׳נט יקרא את ה-CLAUDE.md, יכין תוכנית, ויתחיל לפעול. כל פעם שהוא רוצה לבצע פעולה שלא הגדרנו כ-allow, הוא יעצור וישאל. תראו הודעה כמו: "Want to run: cat reports/2026-05-27-meeting.txt?" עם אפשרויות אישור. לוחצות/ים y.

בסוף, אמורות/ים לראות קובץ חדש: `today-summary.md` עם סיכום של מה שהאייג׳נט קרא.

---

## שלב 8: הזיכרון, כי אייג׳נט שלא זוכר כלום מבאס

עכשיו בעיה: כל הרצה, האייג׳נט מתחיל מאפס. הוא לא יודע מה ראה בהרצה הקודמת. לא יכול להגיד "מאז אתמול, הוסף קובץ חדש."

הפתרון: זיכרון בקובץ. מוסיפות/ים שתי הוראות ל-CLAUDE.md.

בתחילת הקובץ, אחרי הכותרת:

```
Before starting any task:
- Check if memory.md exists in this folder
- If it does, read it. It contains what you found in previous runs.
- Use it to compare: what changed? what is new? what disappeared?
```

בסוף הקובץ, לפני פסקת הסיום:

```
After completing the task:
- Write or update memory.md
- Include: today's date, list of files you read, one-line summary of what you found
- This file is your memory. Keep it current.
```

עכשיו מריצות/ים פעם שנייה. האייג׳נט יקרא את ה-memory.md שיצר בהרצה הראשונה, ויוכל להגיד בדיוק מה השתנה.

אכן.

---

## הפעלה אוטומטית כל בוקר

אחרי שבדקתם/ן שהכל עובד, אפשר לתזמן את הרצת האייג׳נט כל בוקר. ב-Mac, משתמשים ב-cron:

```bash
crontab -e
```

מוסיפות/ים:

```
0 8 * * * cd ~/Desktop/morning-agent && claude --print "תריץ את המשימה שלך לפי ה-CLAUDE.md" >> agent-log.txt 2>&1
```

`0 8 * * *` אומר: בדיוק ב-8:00 בבוקר, כל יום. הדגל `--print` מריץ את Claude Code בלי ממשק ובלי שאלות. משתמשים בו רק אחרי שבדקנו שהאייג׳נט ידוע ובטוח.

---

## מה בנינו

האייג׳נט שבנינו עכשיו הוא פשוט גרידא. הוא קורא קבצים, מסכם, זוכר. אבל המבנה שסביבו — CLAUDE.md, settings.json, memory.md — זה בדיוק אותו מבנה שבונים אייג׳נטים הרבה יותר מורכבים עליו.

ה-CLAUDE.md הוא ה-DNA. ה-settings.json הוא הגבולות. ה-memory.md הוא מה שהופך ריצה חד-פעמית לתהליך שמתפתח עם הזמן.

בחלק השלישי והאחרון של הסדרה, נבנה את אותו האייג׳נט בדיוק, הפעם עם n8n, בלי שורת קוד אחת.

---

אתם/ן כבר בניתם/ן אייג׳נט שרץ על המחשב שלכם/ן? באה לי לשמוע איפה נתקעתם/ן, ומה גרם לו לעשות משהו שלא ציפיתם. כותבים/ות לי. 🙏
