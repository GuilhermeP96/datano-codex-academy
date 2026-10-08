#!/usr/bin/env python3
"""Public thin stdio adapter. Premium data stays behind the licensed service."""
import json
import os
import sys
import urllib.request
import urllib.error
ENDPOINT = "https://academy.datano.com.br/api/mcp"

def forward(message):
    credential = os.environ.get("DATANO_LICENSE_TOKEN", "")
    headers = {"Content-Type": "application/json", "Accept": "application/json, text/event-stream"}
    if credential:
        headers["Authorization"] = "Bearer " + credential
    req = urllib.request.Request(ENDPOINT, json.dumps(message).encode(), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            data = response.read(1000000)
        return json.loads(data) if data else None
    except (urllib.error.URLError, ValueError):
        if "id" not in message:
            return None
        return {"jsonrpc": "2.0", "id": message["id"], "error": {"code": -32000, "message": "DatanO service unavailable; no operation executed."}}

if __name__ == "__main__":
    for line in sys.stdin:
        if len(line) > 32768:
            continue
        try:
            message = json.loads(line)
            if not isinstance(message, dict):
                raise ValueError("Invalid Request")
            result = forward(message)
        except ValueError:
            result = {"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}}
        if result is not None:
            print(json.dumps(result, ensure_ascii=False), flush=True)
