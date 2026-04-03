"""
Molecule Routes — API endpoints for molecular properties and visualization.
"""

from flask import Blueprint, request, jsonify, Response
from services import rdkit_service, smilesdb_service

molecule_bp = Blueprint("molecule", __name__, url_prefix="/api/molecule")


@molecule_bp.route("/properties", methods=["GET"])
def get_properties():
    """
    GET /api/molecule/properties?smiles=<SMILES>

    Compute molecular properties from a SMILES string using RDKit.
    Optionally enriches with SmilesDB data if a match is found.

    Returns JSON:
    {
        "smiles": "...",
        "molecularWeight": 180.16,
        "formula": "C9H8O4",
        "atomCount": 13,
        "logP": 1.31,
        "hydrogenBondDonors": 1,
        "hydrogenBondAcceptors": 4,
        "numBonds": 13,
        "tpsa": 63.6,
        "rotatableBonds": 3,
        "smilesDbMatch": true/false
    }
    """
    smiles = request.args.get("smiles", "").strip()

    if not smiles:
        return jsonify({"error": "Missing 'smiles' query parameter"}), 400

    # Validate SMILES with RDKit
    mol = rdkit_service.validate_smiles(smiles)
    if mol is None:
        return jsonify({"error": f"Invalid SMILES string: '{smiles}'"}), 400

    # Compute properties with RDKit
    properties = rdkit_service.compute_properties(mol)
    properties["smiles"] = smiles

    # Try supplementary SmilesDB lookup (non-blocking)
    try:
        smilesdb_data = smilesdb_service.lookup_smiles(smiles)
        properties["smilesDbMatch"] = smilesdb_data is not None

        if smilesdb_data:
            # Add any extra fields from SmilesDB that RDKit doesn't provide
            properties["smilesDbData"] = {
                k: v for k, v in smilesdb_data.items()
                if k not in ("SMILES",)
            }
    except Exception as e:
        print(f"[SmilesDB] Lookup failed: {e}")
        properties["smilesDbMatch"] = False

    return jsonify(properties), 200


@molecule_bp.route("/image", methods=["GET"])
def get_image():
    """
    GET /api/molecule/image?smiles=<SMILES>&width=400&height=400

    Generate a 2D molecular structure image as PNG.
    Returns image/png content.
    """
    smiles = request.args.get("smiles", "").strip()
    width = request.args.get("width", 400, type=int)
    height = request.args.get("height", 400, type=int)

    if not smiles:
        return jsonify({"error": "Missing 'smiles' query parameter"}), 400

    # Validate SMILES with RDKit
    mol = rdkit_service.validate_smiles(smiles)
    if mol is None:
        return jsonify({"error": f"Invalid SMILES string: '{smiles}'"}), 400

    try:
        image_bytes = rdkit_service.generate_image(mol, width, height)
        return Response(
            image_bytes,
            mimetype="image/svg+xml",
            headers={
                "Cache-Control": "public, max-age=3600",
                "Content-Disposition": f"inline; filename=molecule.svg",
            },
        )
    except Exception as e:
        return jsonify({"error": f"Image generation failed: {str(e)}"}), 500
