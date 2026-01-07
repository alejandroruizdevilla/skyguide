#!/usr/bin/env python3
"""
Simple HTTP server with live reload functionality.
Watches for file changes and automatically refreshes the browser.
"""

import http.server
import socketserver
import os
import threading
import time
from pathlib import Path
from datetime import datetime

PORT = 8000
DIRECTORY = "."

class LiveReloadHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler that injects live reload script into HTML files."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Add CORS headers to allow live reload
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        """Serve GET requests with live reload injection for HTML files."""
        if self.path == '/livereload.js':
            self.send_livereload_script()
        elif self.path == '/reload-check':
            self.send_reload_check()
        else:
            # Serve the file normally
            super().do_GET()

    def send_livereload_script(self):
        """Send the live reload JavaScript."""
        script = b"""
(function() {
    let lastModified = null;

    function checkForReload() {
        fetch('/reload-check')
            .then(response => response.json())
            .then(data => {
                if (lastModified === null) {
                    lastModified = data.modified;
                } else if (lastModified !== data.modified) {
                    console.log('File changed, reloading...');
                    window.location.reload();
                }
            })
            .catch(err => console.error('Reload check failed:', err));
    }

    // Check every 500ms for changes
    setInterval(checkForReload, 500);
    console.log('Live reload active - watching for changes...');
})();
"""
        self.send_response(200)
        self.send_header('Content-type', 'application/javascript')
        self.send_header('Content-Length', len(script))
        self.end_headers()
        self.wfile.write(script)

    def send_reload_check(self):
        """Send the current modification time of watched files."""
        import json

        # Get the latest modification time of HTML files
        max_mtime = 0
        for file in Path('.').glob('*.html'):
            mtime = file.stat().st_mtime
            if mtime > max_mtime:
                max_mtime = mtime

        response = json.dumps({'modified': max_mtime})
        response_bytes = response.encode('utf-8')

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Content-Length', len(response_bytes))
        self.end_headers()
        self.wfile.write(response_bytes)

    def guess_type(self, path):
        """Override to inject live reload script into HTML files."""
        mimetype = super().guess_type(path)
        return mimetype

def inject_livereload():
    """Inject live reload script into HTML files."""
    html_file = Path('index.html')
    if html_file.exists():
        content = html_file.read_text()
        if '<script src="/livereload.js"></script>' not in content:
            # Inject before closing body tag
            if '</body>' in content:
                content = content.replace('</body>', '<script src="/livereload.js"></script>\n</body>')
                html_file.write_text(content)
                print(f"✓ Injected live reload script into {html_file}")
            else:
                print(f"⚠ Warning: Could not find </body> tag in {html_file}")

def remove_livereload():
    """Remove live reload script from HTML files."""
    html_file = Path('index.html')
    if html_file.exists():
        content = html_file.read_text()
        content = content.replace('<script src="/livereload.js"></script>\n', '')
        html_file.write_text(content)
        print(f"✓ Removed live reload script from {html_file}")

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def main():
    print("=" * 60)
    print("🚀 FLIGHT SIMULATOR WEBSITE - DEV SERVER")
    print("=" * 60)

    # Inject live reload script
    inject_livereload()

    try:
        with ReusableTCPServer(("", PORT), LiveReloadHandler) as httpd:
            print(f"\n✓ Server running at: http://localhost:{PORT}")
            print(f"✓ Serving directory: {os.path.abspath(DIRECTORY)}")
            print(f"✓ Live reload: ACTIVE (watching *.html files)")
            print(f"\n📡 Open http://localhost:{PORT} in your browser")
            print("\nPress Ctrl+C to stop the server\n")
            print("=" * 60)

            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Shutting down server...")
        remove_livereload()
        print("✓ Server stopped successfully")
        print("=" * 60)

if __name__ == "__main__":
    main()
