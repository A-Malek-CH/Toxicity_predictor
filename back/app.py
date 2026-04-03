"""
Toxicity Predictor — Backend API Server

Flask application providing molecular properties and visualization
endpoints using RDKit and SmilesDB.

Usage:
    pip install -r requirements.txt
    python app.py
"""

from flask import Flask, jsonify
from flask_cors import CORS
from routes.molecule import molecule_bp


def create_app():
    app = Flask(__name__)

    # Enable CORS for the Next.js frontend (dev on port 3000)
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"],
        }
    })

    # Register blueprints
    app.register_blueprint(molecule_bp)

    # Health check endpoint
    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({
            "status": "ok",
            "service": "toxicity-predictor-backend",
        }), 200

    return app


if __name__ == "__main__":
    app = create_app()
    print("\n  Toxicity Predictor Backend")
    print("  ─────────────────────────────────")
    print("  Server:    http://localhost:5000")
    print("  Endpoints:")
    print("    GET /api/health")
    print("    GET /api/molecule/properties?smiles=<SMILES>")
    print("    GET /api/molecule/image?smiles=<SMILES>&width=400&height=400")
    print("  ─────────────────────────────────\n")
    app.run(host="0.0.0.0", port=5000, debug=True)
