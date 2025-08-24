// scripts/generate-manifest.mjs
import { promises as fs } from "fs";
import { glob } from "glob";
import path from "path";

const REPO = process.env.GITHUB_REPOSITORY || "Karuno/AI_patent_examiner";
const SHA  = process.env.GITHUB_SHA || "main"; // PR上はコミットSHA、手元はmainでもOK

const ROOT = process.cwd();
const pick = async (pattern) => (await glob(pattern, { cwd: ROOT, nodir: true })).sort();

const toRaw = (p) => `https://raw.githubusercontent.com/${REPO}/${SHA}/${p.replace(/^\.\//, "")}`;

const guessArticle = (p) => {
  const m = path.basename(p).match(/^criteria_([0-9_]+)_/);
  return m ? m[1].replace(/_/g, "_") : undefined;
};

// 「必須」判定ルール（必要に応じて調整）
const isMustHave = (p) => {
  if (p.includes("01_criteria_json/criteria_36_6_1_support.json")) return true;
  if (p.includes("01_criteria_json/criteria_36_6_2_clarity.json")) return true;
  if (p.includes("04_rejection_notice_format/rejection_notice_format.json")) return true;
  return false;
};

const main = async () => {
  const criteria = await pick("01_criteria_json/**/*.json");
  const rnf      = await pick("04_rejection_notice_format/**/*.json");

  const files = [
    ...criteria.map(p => ({
      id: path.basename(p, ".json"),
      article: guessArticle(p),
      desc: "criteria",
      url_raw: toRaw(p),
      must_have: isMustHave(p)
    })),
    ...rnf.map(p => ({
      id: path.basename(p, ".json"),
      desc: "rejection_notice_format",
      url_raw: toRaw(p),
      must_have: isMustHave(p)
    })),
  ];

  const manifest = {
    version: "1.0",
    generated_at: new Date().toISOString(),
    ref: SHA,
    files,
    notes: "Stop-on-Missing: must_have=true が取得できない場合は処理を停止する。"
  };

  await fs.mkdir("dist", { recursive: true });
  await fs.writeFile("dist/manifest.json", JSON.stringify(manifest, null, 2), "utf-8");
  console.log("manifest generated: dist/manifest.json");
};

main().catch((e) => { console.error(e); process.exit(1); });
