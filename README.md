# Tiny Stack VM — tiny-stack-vm-01-run-20261122

[![tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/quintana111/tiny-stack-vm-01-run-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/quintana111/tiny-stack-vm-01-run-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A faithful, compact interpreter of make.fun's tiny stack ISA: 32-bit wrapping ints, a 256-value stack, branches, calls, 256 words of memory, input/output, all ten traps with their exact exit codes, and the step and output limits. `main.ts` is the whole VM (Node 22, run as `node /bot/main.ts`).

**Grading.** On the kit's practice set (`grade-local --driver process`): score **1,000,000** — all 40 instances at 1,000 each, two executions byte-identical.
