# Public sample version gate

The published sample is version 1.1.1, as declared by
`plugins/datano-sample/.claude-plugin/plugin.json`. The download test must pin
that published version, not an unpublished 1.1.2. Issue: #1.

The existing ZIP has 13 allowlisted entries, valid CRC and SHA256
`f7186255f5daed44408fd387cde3db316d055f4986269625fe2ad53a22486c55`.
All entries match the source mapping in `scripts/build-agents-sample.py`.
Neither the ZIP nor its manifest/version was changed by this test correction.

Validation on 2026-10-27: the desktop setup/download scenario failed on the
incorrect version assertion before the fix. Afterward, all six sample browser
scenarios passed on desktop/mobile, including download/hash/CRC, accessibility,
human review reset and inert exports. `npm run check` and `npm run test:agents`
also passed. Reproduce with these commands and
`npx playwright test tests/agents-sample.spec.js` using existing dependencies.

This is a test-only review change, not a new sample release or deployment.
A future version update must coordinate manifest, artifact and test expectation.
Rollback is a versioned revert of this test correction; published bytes remain
unchanged. Browser fixtures do not prove private licensed delivery.
