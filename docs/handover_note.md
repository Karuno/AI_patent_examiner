# AI Handover Note

## Repository
- Project: AI_patent_examiner
- Central manifest: `dist/manifest.json`
- Criteria: `01_criteria_json/*.json`
- Case digest schema: `02_case_digest_schema/case_digest_unified_v2.schema.json`
- Rejection notice format: `04_rejection_notice_format/*.json`
- Phrase bank: `phrase_bank/*.json`

## Purpose
- Automate Japanese patent examination support (novelty, inventive step, clarity, support, unity).
- Flow: 本願+引例候補 → case_digest(JSON) → rejection notice (NRR).

## Current State
- criteria_json:
  - 36(6)1 support: DONE
  - 36(6)2 clarity: DONE
  - 37 unity: DONE
  - 29 novelty/inventive_step: partially, inventive step rationale needs refinement
- case_digest schema: unified (v2). Lightweight, judgments link to criteria judgment_id. Prior_arts simplification under discussion.
- rejection_notice_format: skeleton exists. Needs enrichment from NFR/起案文例.
- phrase_bank: not yet consolidated. 起案文例.xlsx is source.

## Immediate Focus
- Add `description/examples` to case_digest schema fields to help LLM output correct JSON.
- Ensure inventive step rationale types are preserved and aligned across schema & criteria.
- Link phrase_bank entries to criteria judgment_id to enable automatic NRR draft generation.
- Consider lightweight prior_art referencing (id only + external registry).
- Plan interface for human input: table→JSON converter.

## Principles
- criteria_json = dictionary of judgment elements (with id, tests, examples).
- case_digest = claim-level decision + reasons + supporting refs (id matches criteria).
- rejection_notice_format = block structure rules for NRR.
- phrase_bank = typical phrases, keyed by judgment id or rationale type.
- AJV schema validation + manifest autogen ensure consistency.