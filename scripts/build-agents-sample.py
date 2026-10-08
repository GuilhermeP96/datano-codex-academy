#!/usr/bin/env python3
"""Build only the explicitly public sample; no private runtime or course input."""
from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]
for name in ['agents-sample-data.js','agents-sample-zip.js']:
 (root/'plugins/datano-sample/skills/delivery-kit/references'/name).write_bytes((root/name).read_bytes())
files={
 'README.md':'docs/AGENTS-SAMPLE.md',
 'LICENSE':'plugins/datano-sample/LICENSE',
 'package.json':'plugins/datano-sample/package.json',
 '.claude-plugin/plugin.json':'plugins/datano-sample/.claude-plugin/plugin.json',
 '.mcp.json':'plugins/datano-sample/.mcp.json',
 'delivery-mcp.py':'plugins/datano-sample/delivery-mcp.py',
 'skills/first-delivery/SKILL.md':'plugins/datano-sample/skills/first-delivery/SKILL.md',
 'skills/delivery-kit/SKILL.md':'plugins/datano-sample/skills/delivery-kit/SKILL.md',
 'skills/delivery-kit/references/agents-sample-data.js':'agents-sample-data.js',
 'skills/delivery-kit/references/agents-sample-zip.js':'agents-sample-zip.js',
 'skills/delivery-kit/scripts/assemble-delivery.mjs':'plugins/datano-sample/skills/delivery-kit/scripts/assemble-delivery.mjs',
 'skills/delivery-kit/package.json':'plugins/datano-sample/skills/delivery-kit/package.json',
}
blobs={name:(root/source).read_bytes() for name,source in files.items()}
staging=root/'datano-agents-sample.zip.tmp'
with zipfile.ZipFile(staging,'w',zipfile.ZIP_DEFLATED) as archive:
 for name,blob in sorted(blobs.items()):
  info=zipfile.ZipInfo(name,date_time=(2026,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;archive.writestr(info,blob)
staging.replace(root/'datano-agents-sample.zip')
print('Built public DatanO-Agents sample: '+str(len(files))+' allowlisted files.')
