#!/usr/bin/env node
// TripStory Hebrew voice bake-off harness.
// Speaks the Latrun scripts through premium TTS engines so you can A/B by ear.
// Optionally also regenerates the story with multiple LLMs (the model side of the bake-off).
//
// This is a THROWAWAY TEST HARNESS, not product code. It writes audio files you listen to.
//
// Usage:
//   node tts-bakeoff.mjs            # synthesize all variants with every engine you have a key for
//   node tts-bakeoff.mjs --variant B
//   node tts-bakeoff.mjs --gen      # also run the multi-LLM story generation
//
// Keys (set only the ones you want to test; missing ones are skipped, not errors):
//   ELEVENLABS_API_KEY        + ELEVENLABS_VOICE_ID (a Hebrew-capable voice)
//   AZURE_TTS_KEY             + AZURE_TTS_REGION      (e.g. westeurope)
//   GOOGLE_TTS_KEY                                    (Cloud Text-to-Speech API key)
//   ANTHROPIC_API_KEY / OPENAI_API_KEY               (only for --gen)
//
// Output: ./out/<variant>__<engine>.mp3  and (with --gen) ./out/<variant>__<model>.txt

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const OUT = new URL("./out/", import.meta.url);

// The scripts, joined into a single spoken string per variant, with SSML-style pauses.
// Keep in sync with latrun-scripts.md. Pauses are the "look out the window" beats.
const VARIANTS = {
  A: [
    "היי חברים! עוד רגע קורה כאן משהו מגניב. תסתכלו טוב טוב ימינה, מהחלון של צד ימין.",
    "אתם רואים על הגבעה בניין גדול מאבן, שנראה כמו טירה עם מגדל? נסו למצוא אותו. מי מוצא ראשון?",
    "__PAUSE__",
    "מצאתם? כל הכבוד! זה המבצר של לטרון.",
    "לפני הרבה מאוד שנים בנו כאן מבצר חזק כדי לשמור על הדרך לירושלים. והנה הפתעה: ממש לידו יש היום מוזיאון עם טנקים אמיתיים! תסתכלו, אולי תצליחו לספור כמה טנקים אתם רואים.",
    "עוד מעט, קצת אחרי המבצר, אני אראה לכם עמק שבו קרה סיפור מדהים על השמש. תישארו איתי!"
  ],
  B: [
    "אה, אני מכיר את המקום הזה. חברים, תעיפו מבט עדין ימינה, אל מעבר לחלון.",
    "שם, על הגבעה השקטה, מסתתר בניין אבן גדול. אתם רואים אותו?",
    "__PAUSE__",
    "יפה מאוד. זה המבצר של לטרון, והוא עומד כאן שנים רבות מאוד.",
    "פעם, מזמן מזמן, אנשים בנו את המבצר הזה כדי לשמור על כל מי שנסע בדרך הזאת לירושלים, בדיוק כמונו עכשיו. ובימים שבהם סבא וסבתא היו ילדים, היו כאן קרבות גדולים על הדרך הזאת. היום, ממש ליד, נחים טנקים ישנים במוזיאון, שקטים ורגועים.",
    "תכף נמשיך, ואני אספר לכם על עמק מיוחד שנמצא ממש קרוב. יהיה יפה."
  ],
  C: [
    "רגע... שקט לרגע. יש כאן סוד, ורק מי שמסתכל ימינה עכשיו יגלה אותו.",
    "על הגבעה, מחכה בניין אבן ענק ומסתורי. מי מכם מוצא אותו ראשון?",
    "__PAUSE__",
    "מצאתם אותו! זה המבצר של לטרון, שומר הדרך.",
    "המבצר הזה שמר במשך שנים על הדרך לירושלים, וראה המון דברים. אבירים עברו כאן פעם, ואחר כך היו כאן קרבות אמיתיים. וכמו אוצר חבוי, ממש לצידו, מחכים לכם טנקים אמיתיים במוזיאון. כמה מהם אתם מספיקים לראות?",
    "אבל הסוד הכי גדול עוד לפנינו: עמק שבו, מספרים, השמש עצרה מלכת. עוד רגע נגיע אליו."
  ]
};

const PLAIN = (beats) => beats.filter(b => b !== "__PAUSE__").join(" ");
const SSML = (beats) =>
  `<speak>${beats.map(b => b === "__PAUSE__" ? '<break time="3s"/>' : `<s>${esc(b)}</s>`).join("")}</speak>`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function save(name, buf) {
  await writeFile(new URL(name, OUT), buf);
  console.log("  wrote out/" + name);
}

// --- ElevenLabs ---
async function elevenlabs(variant, beats) {
  const key = process.env.ELEVENLABS_API_KEY, voice = process.env.ELEVENLABS_VOICE_ID;
  if (!key || !voice) return skip("elevenlabs", "ELEVENLABS_API_KEY + ELEVENLABS_VOICE_ID");
  // ElevenLabs reads plain text; approximate the pause with an ellipsis break.
  const text = beats.map(b => b === "__PAUSE__" ? " ... ... ... " : b).join(" ");
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
  });
  if (!res.ok) return fail("elevenlabs", res.status, await res.text());
  await save(`${variant}__elevenlabs.mp3`, Buffer.from(await res.arrayBuffer()));
}

// --- Azure neural (SSML, supports true breaks) ---
async function azure(variant, beats) {
  const key = process.env.AZURE_TTS_KEY, region = process.env.AZURE_TTS_REGION;
  if (!key || !region) return skip("azure", "AZURE_TTS_KEY + AZURE_TTS_REGION");
  const voice = process.env.AZURE_TTS_VOICE || "he-IL-AvriNeural"; // also try he-IL-HilaNeural
  const ssml = `<speak version="1.0" xml:lang="he-IL"><voice name="${voice}">${
    beats.map(b => b === "__PAUSE__" ? '<break time="3s"/>' : esc(b) + " ").join("")
  }</voice></speak>`;
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3"
    },
    body: ssml
  });
  if (!res.ok) return fail("azure", res.status, await res.text());
  await save(`${variant}__azure.mp3`, Buffer.from(await res.arrayBuffer()));
}

// --- Google Cloud TTS (SSML) ---
async function google(variant, beats) {
  const key = process.env.GOOGLE_TTS_KEY;
  if (!key) return skip("google", "GOOGLE_TTS_KEY");
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { ssml: SSML(beats) },
      voice: { languageCode: "he-IL", name: process.env.GOOGLE_TTS_VOICE || "he-IL-Wavenet-A" },
      audioConfig: { audioEncoding: "MP3", speakingRate: 0.95, pitch: 1.0 }
    })
  });
  if (!res.ok) return fail("google", res.status, await res.text());
  const j = await res.json();
  await save(`${variant}__google.mp3`, Buffer.from(j.audioContent, "base64"));
}

// --- Optional: multi-LLM story generation (the model side of the bake-off) ---
const FACTS = `Latrun, Route 1 (Tel Aviv to Jerusalem). Facts (use ONLY these):
- Now: Yad LaShiryon armored corps museum with real tanks visible from the road; the large stone building is a former British Mandate police fort.
- ~80 years ago (1948): fierce battles over the road to besieged Jerusalem; the "Burma Road" bypass was built nearby.
- Long ago: the site guarded the road to Jerusalem for centuries; Crusaders built a castle here ("Le Toron"). A Trappist monastery and vineyards date to the late 1800s.
- Ancient/biblical: the neighboring Ayalon Valley is where the sun is told to "stand still" in the Book of Joshua.`;

const GEN_PROMPT = `You are a warm, playful Hebrew-speaking companion in a family car, talking to children aged 6-10. Using ONLY the facts provided, write a short narration about the landmark coming up on the RIGHT. Structure it as beats: (1) direct their eyes right, (2) prompt them to hunt for it, (3) a 3-second pause, (4) reveal and celebrate, (5) tell the story simply and vividly including what was here long ago, (6) hook toward what's next. Natural spoken Hebrew, short sentences, concrete images, a little suspense. Never state a fact not in the sources. Do not use em dashes.\n\n${FACTS}`;

async function genAnthropic() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return skip("gen:anthropic", "ANTHROPIC_API_KEY");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-5", max_tokens: 900, messages: [{ role: "user", content: GEN_PROMPT }] })
  });
  if (!res.ok) return fail("gen:anthropic", res.status, await res.text());
  const j = await res.json();
  await save("GEN__anthropic.txt", Buffer.from(j.content.map(c => c.text || "").join(""), "utf8"));
}

async function genOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return skip("gen:openai", "OPENAI_API_KEY");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: GEN_PROMPT }] })
  });
  if (!res.ok) return fail("gen:openai", res.status, await res.text());
  const j = await res.json();
  await save("GEN__openai.txt", Buffer.from(j.choices[0].message.content, "utf8"));
}

function skip(engine, need) { console.log(`  skip ${engine} (set ${need})`); }
function fail(engine, status, body) { console.error(`  FAIL ${engine} [${status}]: ${String(body).slice(0, 300)}`); }

async function main() {
  const args = process.argv.slice(2);
  const only = args.includes("--variant") ? args[args.indexOf("--variant") + 1] : null;
  const doGen = args.includes("--gen");
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

  const variants = only ? [only] : Object.keys(VARIANTS);
  for (const v of variants) {
    const beats = VARIANTS[v];
    if (!beats) { console.error("unknown variant " + v); continue; }
    console.log(`\nVariant ${v}:`);
    await elevenlabs(v, beats);
    await azure(v, beats);
    await google(v, beats);
  }
  if (doGen) {
    console.log("\nStory generation (multi-LLM):");
    await genAnthropic();
    await genOpenAI();
  }
  console.log("\nDone. Listen to the files in ./out and pick the voice (BE-BD-06) and, with --gen, the model (BE-BD-05).");
}

main().catch(e => { console.error(e); process.exit(1); });
