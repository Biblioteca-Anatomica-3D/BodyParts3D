import http.server
import socketserver
import webbrowser
import os

# Puerto del servidor
PORT = 5500

# Carpeta actual
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Servidor corriendo en http://localhost:{PORT}")
        # Abrir navegador automáticamente en index.html
        webbrowser.open(f"http://localhost:{PORT}/index.html")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
