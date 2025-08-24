# AI Patent Examiner – Overview & Runbook

## 0. 用語（Terminology）
- **NRR**: Notification of Reason for Refusal（拒絶理由通知書）  
  ※本プロジェクトでは “書式JSON” ではなく **通知書そのもの** を指す語として統一。
- **RNF JSON**: NRR を生成するための **フォーマット規則JSON**（大/中/小ブロック構成、総括パターン等）。
- **criteria JSON**: JPO審査基準の「判断類型・適用テスト（tests）・補助判断要素」を機械可読化した基準ミラー。
- **case_digest**: 請求項×条文×（必要に応じて）文献集合の**判断結果サマリ**。NRR生成の中間成果物。
- **manifest**: 参照すべきファイル一式（RAW URL / 必須フラグ）を列挙した読み込みエントリ。

---

## 1. 目的
JPO審査基準に準拠し、**本願＋引用文献**から **case_digest** を構築し、**NRR（拒絶理由通知書）**のドラフトを安定生成する。

---

## 2. 方針

### 方針1：審査AIの推論方針
- **事実と判断の分離**  
  - 事実＝本願・引用文献の記載、審査基準の規定等（出典と locator を必ず保持）。  
  - 判断＝審査官の解釈・適用結果（どの **criteria の判断要素**に該当したかで表明）。
- **プロセスの独立**  
  - *判断プロセス*（本願＋引例→case_digest）と、*起案プロセス*（case_digest→NRR）は独立。  
- **基準準拠＋柔軟拡張**  
  - 原則は **審査基準の判断要素に基づく**。  
  - 実務ロジック（ユーザー合意の補助ルール）は **case_digest** レビューを通じて段階的に採用（ID化・PR運用）。
- **NRRの書きぶり**  
  - 文献の事実には **記載箇所（locator）** を、基準に基づく判断には **由来（criteriaのID）** を明示。
- **共通実装要件**  
  - プロジェクト共通の **「事実＋出典」** と **「判断要素」** を定義・参照。  
  - **Stop‑on‑Missing**：必須根拠（manifest指定・本願・引例・criteria 等）が欠ける場合は **ログを残して即停止**（内部知識で埋めない）。  
  - **トレーサビリティ** と **ハルシネーション防止**を最優先。

### 方針2：審査AIの学習方針
- 目的：実際の NRR・起案文例・審査基準の運用から、**判断** と **起案** を継続的にチューニング。
- 第一段階（起案能力の向上）  
  1) 既存 NRR から **case_digest** と **起案文例（phrase_bank）** を抽出。  
  2) 別系統AIで **case_digest＋各アセット→NRR生成** を試行。  
  3) 元NRRとの差分を解析し、**RNF/phrase_bank/criteriaの改善PR** を小粒で反映。
- 第二段階（判断能力の向上）  
  - **本願＋引例候補→case_digest** を行い、差分解析・事例化・ルールID化を繰り返す。

### 方針3：作業方針
- ユーザー指示と過去理解が矛盾する可能性があるときは、作業前に **本ドキュメントおよび manifest** を参照し、  
  具体的にどこが矛盾し得るかを提示 → 合意後に実行。

---

## 3. データ構成（参考）
```

01_criteria_json/                        # 審査基準
  ├─ 29_1_3_novelty.json               # 新規性＋進歩性
  ├─ 29_2_inventive_step.json          # 進歩性
  ├─ criteria_36_6_1_support.json      # サポート要件（類型1/3/4。2は運用除外）
  ├─ criteria_36_6_2_clarity.json      # 明確性要件（類型1〜5）
  └─ criteria_37_unity.json            # 単一性（STF/効率性ほか拡充中）
02_schemas/                             # ajv でCI検証するスキーマ
03_phrase_bank/                         # 起案文例＋適用条件
04_rnf_json/                            # NRR生成用のフォーマット規則JSON
dist/manifest.json                      # RAW URL＋必須フラグ（CIで自動生成）
docs/roadmap.md                         # 次にやること

```

---

## 4. Stop‑on‑Missing（必須が無ければ停止）
**必須例**：`manifest.json`（must_have:true）、criteria_*、04_rnf_json、**本願請求項**、**引用文献本文**。  
- 取得失敗／権限エラー／空応答／文字化け・DRM 等→ **即停止**し、エラーを返す。  
- **内部知識で補完しない**。  
- 必要なときのみ、分割基準ファイルや該当章だけを取得（計算量最小化）。

---

## 5. 推論パイプライン

### 5.1 判断プロセス（本願＋引例 → case_digest）
**入力**：本願請求項＋引例（本文必須）＋ criteria_*  
**出力**：`case_digest.json`  
1) 前提確認（Stop‑on‑Missing）  
2) 請求項の認定／記載抽出（locator は **段落・図・請求項 等の混在**を許容）  
3) 条文ごとに適用：明確性/サポート/単一性は **criteria.tests** を適用  
4) 新規性＋進歩性は主/副引例・相違点・論理付け種別を正規化  
5) **criteria/RNF と整合する判断ID**で `case_digest` を出力

### 5.2 起案プロセス（case_digest → NRR）
**入力**：`case_digest.json`＋`04_rnf_json/*`＋`phrase_bank/*`  
**出力**：NRRドラフト（Markdown/Docx）  
- 大ブロック：①単一性 → ②サポート or 明確性（本質順） → ③新規性＋進歩性（セット） → ④進歩性  
- 中ブロック（③/④）：**請求項集合×文献集合**。最初は「請求項1×主引例1」で記載事項→対比→相違点→（副引例）→論理付け→総括。  
- 小ブロック：同様に〜／個別補足。  
- 総括文：条文別の **固定パターン**（phrase_bank で表現揺れを管理）。

---

## 6. 追加の学習・検証タスク（5 と 6 の間に新設）

### 6.1 **テスト**：本願＋引例候補＋criteria で **case_digest を自動生成可能か**
- 成功条件：criteria.tests に準拠した **判断IDの一貫性**、locator の妥当性、再現性。  
- 必要に応じて **判断事例の抽出・保存**（small JSON with “when to fire” 条件）。

### 6.2 **インターフェイス**：審査官の判断を AI に伝える入力面
- 目的：判断 AI が未確定な箇所に対し、**審査官の裁量判断（例：用語解釈、阻害要因の有無）**を明示的に注入。  
- 仕様（最小）：  
  - `judgment_overrides[]`: `{ id, article, scope, value, rationale? }`  
  - scope は 請求項・文献・相違点・論理付け 単位で指定。  
  - case_digest 生成時に **override を優先**し、criteria.tests の結果と両方をログ化。

---

## 7. CI / 運用
- **manifest 自動生成**：PR時に `/scripts/generate-manifest.mjs` が `dist/manifest.json` を更新しコミット。  
- **ajv 検証**：criteria、04_rnf_json、case_digest、manifest を CI でバリデート。  
- **小粒PR**：criteria → phrase_bank → 04_rnf_json → digest の順で段階的に改善。  
- **メタ**：全 criteria に `compiled_on: YYYY-MM-DD` を付与。  
- **改行・差分**：`.gitattributes` で LF 固定・JSON diff を有効化。

---
