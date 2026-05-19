/**
 * Duble Slash — Interview Guide (Hebrew)
 *
 * How to run:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Paste this entire file
 * 4. Click Run → createInterviewSheet
 * 5. Approve permissions
 * 6. Open the sheet from your Google Drive
 */

function createInterviewSheet() {
  const ss = SpreadsheetApp.create('ראיון מנהל/ת עיצוב — Duble Slash');

  // ── Sheet 1: Interview Script ──────────────────────────────────────────
  const script = ss.getActiveSheet();
  script.setName('סקריפט ראיון');
  script.setRightToLeft(true);

  // Header row
  const scriptHeaders = ['חלק', 'זמן', 'שאלה / הנחיה', 'מה לשמוע', 'הערות בזמן שיחה'];
  script.appendRow(scriptHeaders);
  script.getRange(1, 1, 1, 5).setBackground('#1a1a2e').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11);

  const scriptRows = [
    // לפני השיחה
    [
      'לפני השיחה',
      '—',
      'בדוק את הסטודיו מהרשימה:\n• גודל הסטודיו (הרכב צוות גס)\n• סוג העבודה (מיתוג / מוצר / UX / מעורב)\n• עבודות ציבוריות או לקוחות ששמת לב אליהם\n\nאל תציג מראש — תן לכאב לצוף באופן טבעי.',
      '—',
      ''
    ],
    // חימום
    [
      'חימום',
      '5 דק\'',
      '"לפני שנצלול — תספר לי קצת על הסטודיו? כמה אנשים בצוות, על איזה סוג עבודה אתם מתמקדים בדרך כלל?"\n\n"ואיך נראה תפקידך ביום-יום — האם אתה בעיקר בתוך העבודה, או יותר מנהל את הצוות?"',
      'גודל סטודיו, האם מובל על ידי הבעלים, שיטת תמחור (שעות / פרויקט / ריטיינר), פרופיל לקוחות.\n\nאם הם עדיין בתוך העבודה — הם חשים את הכאב של הכלים ישירות.',
      ''
    ],
    // המציאות עם AI
    [
      'המציאות עם AI',
      '10 דק\'',
      '"אני רוצה להבין איך AI נחת אצלכם בפועל — לא גרסת ההייפ, הגרסה האמיתית. האם אתה והצוות משתמשים בזה באופן קבוע?"\n\n"באילו כלים אתם מגיעים הכי הרבה? Claude, ChatGPT, Cursor, Figma AI — משהו אחר?"\n\n"תסביר לי על הפעם האחרונה שה-AI היה שימושי באמת בפרויקט אמיתי. איך זה נראה?"\n\n"ומתי זה נשבר? איך נראית עבודת עיצוב עם AI כשהיא מתפרקת?"',
      'איפה בתהליך (מחקר / קונספט / טקסט / העברה?), סולו או צוות, באיזה כלי.\n\nהשאלה האחרונה היא המרכזית — תן להם לדבר. אל תמלא שתיקות.',
      ''
    ],
    // בדיקת נקודות כאב — אובדן הקשר
    [
      'בדיקת כאב:\nאובדן הקשר',
      '10 דק\'\n(בחר 2-3\nמתוך 5)',
      '"כשאתה מתחיל צ\'אט חדש על פרויקט שעבדת עליו — כמה אתה צריך להסביר מחדש? מה זה עולה לך?"',
      'כאב של רציפות בין-סשן — תשובת Fish Model: <fish-handoff>',
      ''
    ],
    // בדיקת נקודות כאב — סחיפת שלב
    [
      'בדיקת כאב:\nסחיפת שלב',
      '',
      '"קרה לך שביקשת מ-Claude עזרה במחקר או בריף, והוא חזר עם ווירפריימים או ספק שלא ביקשת? איך אתה מתמודד עם זה?"',
      'סחיפת שלב — AI עושה יותר מדי, מהר מדי — תשובת Fish Model: סוכני שלב',
      ''
    ],
    // בדיקת נקודות כאב — עצימות
    [
      'בדיקת כאב:\nחוסר התאמת עצימות',
      '',
      '"האם יש אי-התאמה בין מה שאתה צריך לבין מה שה-AI מפיק מבחינת היקף? כמו — היית צריך תשובה מהירה והוא כתב עבודת גמר?"',
      'AI מייצר יותר מדי — תשובת Fish Model: התאמת עצימות לפי סוג הדג',
      ''
    ],
    // בדיקת נקודות כאב — נראות צוות
    [
      'בדיקת כאב:\nנראות צוות',
      '',
      '"כשהצוות שלך משתמש ב-AI, האם יש לך נראות למה שקורה שם? או שזה בעצם קופסה שחורה עד שמישהו מראה לך את הפלט?"',
      'כאב מנהיגות — תשובת Fish Model: שכבת Digest / נראות',
      ''
    ],
    // בדיקת נקודות כאב — אמון
    [
      'בדיקת כאב:\nאמון בפלט',
      '',
      '"כשה-AI מפיק משהו — טקסט, ספק, המלצה — איך אתה יודע מה לסמוך עליו? האם יש לך דרך לדעת מה הוא באמת החליט מול מה שהוא ניחש?"',
      'אטימות אמון — תשובת Fish Model: קבלת Trust Receipt',
      ''
    ],
    // הפנייה
    [
      'הפנייה',
      '2 דק\'',
      'ברגע שאתה שומע כאב אמיתי (דוגמה ספציפית, אנחה):\n\n"אוכל לשתף משהו שאנחנו בונים? זה קשור ישירות למה שתיארת."\n\n[פיץ\']:\n"אנחנו בונים את Duble Slash. זו מתודולוגיה וכלי קל שנותנים לכלי ה-AI הקשר והמבנה לעבוד כמו שמעצבים עובדים בפועל — שלבים, העברות, רמת פירוט נכונה לגודל הנכון של הבעיה. הרעיון המרכזי הוא שה-AI שכבר יש לך הוא מסוגל מספיק — הוא פשוט אין לו מושג איפה אתה בתהליך או כמה גדולה הבעיה. אנחנו נותנים לו את זה. התוצאה: סשנים שממשיכים מאיפה שהפסקת, פלטים בגודל הנכון, והעברות שמעבירות כוונה בפועל."\n\nעצור. תן להם להגיב.\n\n"זה נוחת? איזה חלק מדבר אליך הכי הרבה — או לא?"',
      'האזן לאיזה חלק הם אוחזים. זה מה שתדגיש בהמשך.',
      ''
    ],
    // כשירות לפיילוט
    [
      'כשירות לפיילוט',
      '8 דק\'',
      'אם השיחה חמה:\n"אנחנו מריצים פיילוט של 8 שבועות עם קבוצה קטנה של סטודיאות — לגמרי בחינם, עם ליווי צמוד. בתמורה: משוב שבועי ואפשרות לציין אתכם ברפרנס ברגע שיוצא לאוויר. זה נשמע כמו משהו שתרצה להיות חלק ממנו?"\n\nאם כן / "ספר לי עוד":\n"האם הוצאה על כלי AI זו החלטה שלך, או שהיא עוברת דרך מישהו אחר?"\n"האם יש לך אחד-שניים מעצבים שכבר יותר עמוק בשימוש ב-AI שיהיו בצורה טבעית הבודקים?"\n"מה יגרום ל-8 שבועות להרגיש ששווה את זה — מה יצטרך להיות נכון?"\n\nאם מהסס:\n"מה ההיסוס — האם זה עיתוי, התאמה, משהו לגבי המוצר?"',
      'בעלים שמקבל החלטות על כלים = קונה נכון.\nמעצב שכבר עמוק ב-AI = בודק טבעי.\nהבנת מה שווה עבורם = ROI לאחר פיילוט.',
      ''
    ],
    // סגירה
    [
      'סגירה',
      '2 דק\'',
      'אם מוכשר:\n"אשלח לך מסמך קצר שמסביר את הפיילוט בפרטים. אם זה נראה נכון, נוכל לעשות שיחת המשך קצרה עם מי שצריך להיות בתמונה ולאשר משם."\n\nאם לא הרגע הנכון:\n"לגמרי בסדר. אוכל לשמור אותך ברשימה ולחזור בעוד חודש כשיש לנו יותר להראות?"',
      'תמיד צא עם פעולה הבאה. גם "לא עכשיו" צריך תאריך.',
      ''
    ],
  ];

  for (const row of scriptRows) {
    script.appendRow(row);
  }

  // Format script sheet
  const lastRow = script.getLastRow();
  script.getRange(2, 1, lastRow - 1, 5).setWrap(true).setVerticalAlignment('top');
  script.setColumnWidth(1, 140);
  script.setColumnWidth(2, 70);
  script.setColumnWidth(3, 380);
  script.setColumnWidth(4, 260);
  script.setColumnWidth(5, 220);

  // Alternate row colors
  for (let i = 2; i <= lastRow; i++) {
    const color = (i % 2 === 0) ? '#f8f9ff' : '#ffffff';
    script.getRange(i, 1, 1, 5).setBackground(color);
  }

  // Highlight pain probe rows
  const painRows = [4, 5, 6, 7, 8]; // 1-indexed from header
  for (const r of painRows) {
    script.getRange(r + 1, 1).setBackground('#fff3e0').setFontWeight('bold');
  }

  // ── Sheet 2: Signal Capture ────────────────────────────────────────────
  const capture = ss.insertSheet('לכידת סיגנל');
  capture.setRightToLeft(true);

  const captureHeaders = [
    'שם הסטודיו',
    'תאריך',
    'שם איש קשר',
    'בגרות AI',
    'כאב מרכזי שציינו',
    'עניין בפיילוט',
    'ציטוט ישיר',
    'פעולה הבאה',
  ];
  capture.appendRow(captureHeaders);
  capture.getRange(1, 1, 1, 8).setBackground('#1a1a2e').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11);

  // 10 empty data rows
  for (let i = 0; i < 10; i++) {
    capture.appendRow(['', '', '', '', '', '', '', '']);
  }

  // Dropdowns
  const aiMaturityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['נמוכה', 'בינונית', 'גבוהה'], true).build();
  const pilotInterestRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['כן', 'אולי', 'לא'], true).build();

  capture.getRange(2, 4, 10, 1).setDataValidation(aiMaturityRule);
  capture.getRange(2, 6, 10, 1).setDataValidation(pilotInterestRule);

  capture.setColumnWidth(1, 160);
  capture.setColumnWidth(2, 100);
  capture.setColumnWidth(3, 160);
  capture.setColumnWidth(4, 100);
  capture.setColumnWidth(5, 280);
  capture.setColumnWidth(6, 120);
  capture.setColumnWidth(7, 300);
  capture.setColumnWidth(8, 200);
  capture.getRange(2, 1, 10, 8).setWrap(true).setVerticalAlignment('top');

  // ── Sheet 3: Qualification Checklist ──────────────────────────────────
  const qualify = ss.insertSheet('כשירות לפיילוט');
  qualify.setRightToLeft(true);

  qualify.appendRow(['קריטריון כשירות', 'עדיפות', 'שאלה לשאול', 'תשובה']);
  qualify.getRange(1, 1, 1, 4).setBackground('#1a1a2e').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11);

  const qualifyRows = [
    ['הבעלים מקבל החלטות על כלים', 'חובה', 'האם הוצאה על כלי AI זו החלטה שלך?', ''],
    ['הסטודיו מחייב לפי שעות (ROI מהיר)', 'גבוהה', 'האם אתם מחייבים לפי שעה / פרויקט?', ''],
    ['יש מעצב שכבר משתמש ב-AI ביומיום', 'גבוהה', 'מי בצוות הכי עמוק ב-AI כרגע?', ''],
    ['צוות קטן מספיק לאונבורדינג צמוד (2–20)', 'בינונית', 'כמה מעצבים בצוות?', ''],
    ['מוכנות להיות רפרנס ציבורי', 'בינונית', 'נוח לכם שנציין אתכם ברגע שמשחררים?', ''],
    ['מוכנות למשוב שבועי', 'בינונית', 'מה עומס העבודה שלכם ב-8 שבועות הקרובים?', ''],
    ['לא חברת בת של תאגיד גדול', 'חובה', '(בדוק מראש)', ''],
  ];

  for (const row of qualifyRows) {
    qualify.appendRow(row);
  }

  qualify.setColumnWidth(1, 260);
  qualify.setColumnWidth(2, 100);
  qualify.setColumnWidth(3, 300);
  qualify.setColumnWidth(4, 220);
  qualify.getRange(2, 1, qualifyRows.length, 4).setWrap(true).setVerticalAlignment('top');

  const priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['חובה', 'גבוהה', 'בינונית', 'נמוכה'], true).build();
  qualify.getRange(2, 2, qualifyRows.length, 1).setDataValidation(priorityRule);

  // Color priority cells
  const priorityColors = { 'חובה': '#ffebee', 'גבוהה': '#fff8e1', 'בינונית': '#f1f8e9' };
  for (let i = 0; i < qualifyRows.length; i++) {
    const p = qualifyRows[i][1];
    if (priorityColors[p]) {
      qualify.getRange(i + 2, 2).setBackground(priorityColors[p]);
    }
  }

  qualify.getRange(1, 1, 1, 4).setBackground('#1a1a2e').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(11);

  // ── Final touches ──────────────────────────────────────────────────────
  ss.setActiveSheet(script);

  const url = ss.getUrl();
  Logger.log('✅ הגיליון נוצר: ' + url);
  SpreadsheetApp.getUi().alert('✅ הגיליון נוצר!\n\n' + url);
}
