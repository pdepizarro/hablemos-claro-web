---
description: "Generate Spanish institutional copy for Hablemos Claro website sections: manifesto, volunteer CTAs, events, members, social/contact, and donation messaging ('Compra libertad')."
mode: "ask"
---
Generate website copy in Spanish for Hablemos Claro using an institutional and serious tone.

## Inputs
- Section name: ${input:section:Name of the section to write}
- Goal: ${input:goal:What this text should achieve}
- Audience: ${input:audience:Target audience}
- Length: ${input:length:Short (40-80 words) | Medium (80-140 words) | Long (140-220 words)}
- Include CTA: ${input:cta:Yes | No}
- CTA target: ${input:cta_target:Contact | Volunteers | Events | Donation | Social}

## Requirements
- Keep style formal, clear, and persuasive.
- Avoid slang, insults, or inflammatory language.
- Use concise paragraphs optimized for web reading.
- If CTA is enabled, provide 2 CTA variants.

## Output Format
1. Main copy
2. Alternative version (shorter)
3. Suggested headline
4. Suggested CTA(s)
