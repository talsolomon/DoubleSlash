# Bake-off scripts — Latrun (Route 1, Tel Aviv to Jerusalem)

_Landmark for the first Hebrew voice + story bake-off. Age target ~6-10. Each variant is written in the 6-beat structure (attention, prompt, pause, reveal, story, hook). Hebrew is what the kids hear; English gloss is for verification only._

> **Grounding note.** The facts below are real, but per our accuracy rule they must be source-verified (Wikipedia/Wikidata) before production. In production the LLM receives sourced facts, it does not supply them from memory. For this bake-off they are authored to test tone and voice, not to ship.

## The real facts (source layer)
- **Now:** Yad LaShiryon (the Armored Corps memorial + tank museum) sits at Latrun, with many real tanks on display, visible from the road. The large stone building is a former British Mandate "Tegart" police fort (built ~1940s).
- **~80 years ago (1948):** fierce battles were fought at Latrun over the road to besieged Jerusalem; the "Burma Road" bypass was built nearby to reach the city.
- **Long ago:** the site has guarded the road to Jerusalem for centuries; Crusaders built a castle here ("Le Toron des Chevaliers", ~12th century), a likely origin of the name Latrun. The Latrun Trappist monastery and its vineyards date to the late 1800s.
- **Ancient / biblical:** the neighboring Ayalon Valley is where, in the Book of Joshua, the sun is told to "stand still over Gibeon, and the moon over the Valley of Ayalon."

---

## Variant A — "The Playful Explorer" (high energy, hunt-and-spot)

1. **attention (right):** היי חברים! עוד רגע קורה כאן משהו מגניב. תסתכלו טוב טוב ימינה, מהחלון של צד ימין.
2. **prompt:** אתם רואים על הגבעה בניין גדול מאבן, שנראה כמו טירה עם מגדל? נסו למצוא אותו. מי מוצא ראשון?
3. **pause:** _(silence ~3s)_
4. **reveal:** מצאתם? כל הכבוד! זה המבצר של לטרון.
5. **story:** לפני הרבה מאוד שנים בנו כאן מבצר חזק כדי לשמור על הדרך לירושלים. והנה הפתעה: ממש לידו יש היום מוזיאון עם טנקים אמיתיים! תסתכלו, אולי תצליחו לספור כמה טנקים אתם רואים.
6. **hook:** עוד מעט, קצת אחרי המבצר, אני אראה לכם עמק שבו קרה סיפור מדהים על השמש. תישארו איתי!

_Gloss: Hey friends! Something cool is about to happen. Look right, out the right window. See the big stone building on the hill that looks like a castle with a tower? Try to find it, who finds it first? ... Found it? Well done! That's the Latrun fortress. Long, long ago they built a strong fort here to guard the road to Jerusalem. And a surprise: right next to it there's a museum today with real tanks! Look, can you count how many tanks you see? In a little while, just past the fortress, I'll show you a valley where an amazing story about the sun happened. Stay with me!_

---

## Variant B — "The Warm Storyteller" (gentle, cozy, narrative)

1. **attention (right):** אה, אני מכיר את המקום הזה. חברים, תעיפו מבט עדין ימינה, אל מעבר לחלון.
2. **prompt:** שם, על הגבעה השקטה, מסתתר בניין אבן גדול. אתם רואים אותו?
3. **pause:** _(silence ~3s)_
4. **reveal:** יפה מאוד. זה המבצר של לטרון, והוא עומד כאן שנים רבות מאוד.
5. **story:** פעם, מזמן מזמן, אנשים בנו את המבצר הזה כדי לשמור על כל מי שנסע בדרך הזאת לירושלים, בדיוק כמונו עכשיו. ובימים שבהם סבא וסבתא היו ילדים, היו כאן קרבות גדולים על הדרך הזאת. היום, ממש ליד, נחים טנקים ישנים במוזיאון, שקטים ורגועים.
6. **hook:** תכף נמשיך, ואני אספר לכם על עמק מיוחד שנמצא ממש קרוב. יהיה יפה.

_Gloss: Ah, I know this place. Friends, take a gentle look to the right, past the window. There, on the quiet hill, a big stone building is hiding. Do you see it? ... Lovely. That's the Latrun fortress, and it has stood here for many years. Once, long long ago, people built this fort to protect everyone who traveled this road to Jerusalem, just like us now. And in the days when grandma and grandpa were children, there were big battles over this road. Today, right nearby, old tanks rest in a museum, quiet and calm. We'll continue soon, and I'll tell you about a special valley very close by. It will be lovely._

---

## Variant C — "The Adventure/Mystery" (suspense, secrets)

1. **attention (right):** רגע... שקט לרגע. יש כאן סוד, ורק מי שמסתכל ימינה עכשיו יגלה אותו.
2. **prompt:** על הגבעה, מחכה בניין אבן ענק ומסתורי. מי מכם מוצא אותו ראשון?
3. **pause:** _(silence ~3s)_
4. **reveal:** מצאתם אותו! זה המבצר של לטרון, שומר הדרך.
5. **story:** המבצר הזה שמר במשך שנים על הדרך לירושלים, וראה המון דברים. אבירים עברו כאן פעם, ואחר כך היו כאן קרבות אמיתיים. וכמו אוצר חבוי, ממש לצידו, מחכים לכם טנקים אמיתיים במוזיאון. כמה מהם אתם מספיקים לראות?
6. **hook:** אבל הסוד הכי גדול עוד לפנינו: עמק שבו, מספרים, השמש עצרה מלכת. עוד רגע נגיע אליו.

_Gloss: Wait... quiet for a second. There's a secret here, and only whoever looks right now will discover it. On the hill, a huge mysterious stone building is waiting. Who finds it first? ... You found it! That's the Latrun fortress, guardian of the road. This fort guarded the road to Jerusalem for years and saw so many things. Knights once passed here, and later there were real battles. And like a hidden treasure, right beside it, real tanks wait for you in a museum. How many can you spot? But the biggest secret is still ahead: a valley where, they say, the sun stopped moving. We'll reach it in a moment._

---

## The generation prompt (for the multi-LLM side of the bake-off)
Give this, plus the sourced facts, to each candidate LLM so they produce their own version and we compare:

> You are a warm, playful Hebrew-speaking companion riding in a family car, talking to children aged 6-10. Using ONLY the facts provided, write a short narration about the landmark coming up on the RIGHT. Structure it as beats: (1) direct their eyes to the right, (2) prompt them to hunt for it, (3) a 3-second pause, (4) reveal and celebrate, (5) tell the story simply and vividly including what was here long ago, (6) hook them toward what's next. Natural spoken Hebrew, short sentences, concrete images, a little suspense. Never state a fact that is not in the provided sources. Do not use em dashes.
