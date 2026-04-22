---
title: "Part 3 — Attack surface reduction rules"
description: How to enable and tune attack surface reduction (ASR) rules for Defender for Endpoint without breaking line-of-business apps.
sidebar:
  label: 3. ASR rules
  order: 3
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 3
---

import { Aside, Steps } from '@astrojs/starlight/components';

With devices onboarded in [Part 2](/guides/defender-for-endpoint/02-onboarding/), the fastest way to add defensive value is to enable attack surface reduction (ASR) rules. This part covers a safe rollout path.

## What ASR rules do

ASR rules block common malware and exploitation techniques — things like Office applications spawning child processes, obfuscated scripts running, or credential theft from LSASS. Each rule can run in one of three modes:

- **Audit** — log events only, take no action. Use this first.
- **Block** — enforce the rule. Use this after auditing.
- **Warn** — prompt the user and let them allow the action. Useful during transition.

## Recommended rollout path

<Steps>

1. **Audit** every rule you plan to use for 2–4 weeks.
2. **Review audit events** in the Defender portal and flag any false positives.
3. **Author exclusions** for validated line-of-business apps.
4. **Switch to Block** in waves — pilot group first, then broader rollout.

</Steps>

<Aside type="tip">
Skipping the audit phase is the most common cause of help-desk tickets during an MDE rollout. Budget the time.
</Aside>

## Rules to enable first

These three rules are low-risk and high-value for most environments:

### Block credential stealing from LSASS

Prevents tools such as Mimikatz from scraping credentials out of the Local Security Authority Subsystem Service.

### Block Office applications from creating child processes

Blocks the classic "Word spawns PowerShell" attack chain used by most macro-based malware.

### Block executable content from email client and webmail

Stops users from launching executables that arrived as attachments in Outlook or OWA.

## Review audit data

Use this KQL query in **Advanced hunting** to surface audit events across your fleet:

```kusto
DeviceEvents
| where ActionType startswith "AsrRule"
| summarize Count = count() by DeviceName, ActionType, FileName, bin(Timestamp, 1d)
| order by Count desc
```

Patterns that show up legitimately across many devices are strong candidates for exclusions.

## Wrapping up the series

You now have MDE licensed, onboarded, and providing real-time protection. Next steps worth exploring on your own:

- Enable automated investigation and response.
- Integrate Defender alerts into your SIEM.
- Review the **Threat and vulnerability management** dashboard weekly.

← [Back to the series overview](/guides/defender-for-endpoint/)
