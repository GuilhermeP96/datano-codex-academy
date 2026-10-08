#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
npm ci --ignore-scripts
npm run check
npm run test:agents
npm test
npm run build
python3 -m py_compile plugins/datano-sample/delivery-mcp.py
