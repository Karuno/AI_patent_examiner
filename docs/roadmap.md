# Roadmap（次にやること）

## 0) 足回りの整備（すぐやる）
- [ ] `docs/overview.md` をコミット（現状版＋Stop-on-Missing規約）
- [ ] `.gitattributes`（`*.json text eol=lf`）で改行統一
- [ ] `dist/manifest.json` に **must_have** を設定し、公開RAW URLを最新化
- [ ] CI（ajv）に **manifest のURL生存チェック**＆**SHA256任意検証**を追加
- [ ] Issue/PR テンプレ（目的・出典・互換性・テスト観点）を追加

**DoD**: mainに緑チェックでマージ、manifest参照の「必須不在→即停止」警告が出る

---

## 1) criteria の確定（36条6項1号, 36条6項2号, 37条，29条1項3号，29条2項）
- [ ] `criteria_36_6_1_support.json`：類型(1)(3)(4)＋tests／(2)は `excluded_judgments`  
- [ ] `criteria_36_6_2_clarity.json`：**JPO原文の(1)〜(5)**＋tests/examples（済・微修）
- [ ] `criteria_37_unity.json`：  
  - [ ] meso単位（STF／効率性）  
  - [ ] **STF判断の方法**（最近似公知, 相違, 効果, 特別性の基準）を追記  
  - [ ] STF不在時の判断（共通STFなし／課題相違／技術的関連性低／効率性）を `issues_catalog` に反映  
- [ ] `29_1_3_novelty.json`
- [ ] `29_2_inventive_step.json`
- [ ] すべてに `compiled_on` を付与

**DoD**: 5本の criteria がmanifestに登録／ajvパス／JPO原文の出典ページをmetaに記載

---

## 2) phrase_bank（起案文例の吸上げ）
- [ ] `50_jpo_criteria` と `起案文例.xlsx` をもとに **文例 → ラベル化**  
- [ ] メタ情報：  
  - 適用条文・類型ID、使い所（中ブロック／小ブロック／総括）、口調、禁則語の置換ルール  
- [ ] **進歩性の総括**など「固定パターン」は必ず網羅（実例から抽出）

**DoD**: `03_phrase_bank/` に初版が入り、RNFから参照可能（judgment_idと1対多でリンク）

---

## 3) rejection_notice_format（RNF）の整備
- [ ] 大ブロック構成：①単一性 → ②サポートor明確性（本質順） → ③新規性＋進歩性 → ④進歩性  
- [ ] 中ブロック：**請求項集合×文献集合**（③/④）、**論理付け**の種類をIDで  
- [ ] 小ブロック：同様に〜／簡潔補足／個別補足  
- [ ] **典型的な総括文の固定パターン**（進歩性は確定。ほかはNFR学習で真値化）  
- [ ] `notification_guidance` を **RNF側に移設**（criteriaから外す）

**DoD**: `04_rejection_notice_format/rejection_notice_format.json` が ajv パス、phrase_bank結線済み

---

## 4) case_digest の強化（判定IDの精度アップ）
- [ ] 明確性・サポート・単一性：**criteriaの tests を直参照**する実装方針に整理  
- [ ] 進歩性：  
  - [ ] **論理付けの類型**（組合せ／周知（根拠あり/なし）／慣用（根拠あり/なし）／設計的事項／適宜なしえる）を `rationale.type` に正規化  
  - [ ] `template_hint_ids` を rationale 単位で保持（RNFの文例誘導に利用）  
- [ ] 引用箇所 locator：**混合指定**を許可（段落＋図＋請求項の組み合わせ）

**DoD**: `02_schemas/case_digest_schema.json` v1.6 が合意・ajvパス、サンプル2〜3件がバリデート通過

---

## 5) NFR（＋起案文例）の走査と学習
- [ ] NFR判定：**A131 を含み、本文に「＜＜＜＜　　最後　　＞＞＞＞」が無い**HTMLだけ抽出  
- [ ] 各件から：  
  - [ ] 大ブロック→中ブロック→小ブロックの**構造特徴**  
  - [ ] 進歩性の**総括固定文**／論理付け記述のバリエーション  
  - [ ] 明確性・サポート・単一性の**総括言い回し**  
- [ ] phrase_bank と RNF の**マッピング追加PR**を連打できるよう小粒で

**DoD**: `03_phrase_bank/` が増強、`04_rejection_notice_format/` が更新、サンプルRNF生成で所望の文が出る

---

## 6) 生成パイプラインの試走（手動→半自動）
- [ ] **Stop-on-Missing** の実装：必須資料が取れないと**即停止**（manifestの `must_have:true`）  
- [ ] 入力：本願請求項＋引例（PDF/HTML）  
- [ ] 出力：`case_digest.json` → RNFドラフト（Markdown/Docx）  
- [ ] 保存：出力＋**使用した入力（プロンプトも）**を `outputs/YYYYMMDD_caseX/` に保存

**DoD**: 1件を端から端まで回せる、再現性のある成果物が残る

---

## 7) API化（後工程）
- [ ] シンプルAPI（/build_digest, /build_nrr）を作成  
- [ ] 保存層：S3 or Git（コミット bot）  
- [ ] 監査ログ：入力/出力/モデル/温度/トークン/manifestハッシュを記録  
- [ ] 失敗時の**中断と復帰**（途中成果を必ず保存）

**DoD**: 連続ジョブで取りこぼしゼロ、失敗時も再開可能

---

## 運用ルール（横断）
- **出典主義**：JPO基準・起案文例・引例本文が読めないなら処理停止  
- **互換維持**：スキーマ互換性チェックをCIで強制  
- **小粒PR**：criteria→phrase_bank→RNF→digest の順で**小分け**にアップデート  
- **命名統一**：`criteria_<article>_<topic>.json`／`compiled_on: YYYY-MM-DD`  
- **タグ**：`[criteria]`, `[phrase_bank]`, `[RNF]`, `[digest]`, `[schema]` をPRタイトルにプレフィックス
