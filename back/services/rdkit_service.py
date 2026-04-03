"""
RDKit Service — Molecular property computation and 2D image generation.
"""

import io
from rdkit import Chem
from rdkit.Chem import Draw, Descriptors, rdMolDescriptors


def validate_smiles(smiles: str):
    """
    Parse a SMILES string and return an RDKit Mol object.
    Returns None if the SMILES is invalid.
    """
    if not smiles or not smiles.strip():
        return None
    try:
        mol = Chem.MolFromSmiles(smiles.strip())
        return mol
    except Exception:
        return None


def compute_properties(mol) -> dict:
    """
    Compute molecular properties from an RDKit Mol object.
    Returns a dictionary matching the frontend MolecularProperties interface,
    plus additional descriptors.
    """
    return {
        "molecularWeight": round(Descriptors.MolWt(mol), 2),
        "formula": rdMolDescriptors.CalcMolFormula(mol),
        "atomCount": mol.GetNumAtoms(),
        "logP": round(Descriptors.MolLogP(mol), 2),
        "hydrogenBondDonors": Descriptors.NumHDonors(mol),
        "hydrogenBondAcceptors": Descriptors.NumHAcceptors(mol),
        # Additional properties
        "numBonds": mol.GetNumBonds(),
        "tpsa": round(Descriptors.TPSA(mol), 2),
        "rotatableBonds": Descriptors.NumRotatableBonds(mol),
    }


def generate_image(mol, width: int = 400, height: int = 400) -> bytes:
    """
    Generate a 2D depiction of the molecule as SVG bytes.
    Uses a dark-themed transparent background suitable for the frontend.
    """
    # Clamp dimensions to reasonable range
    width = max(200, min(width, 1200))
    height = max(200, min(height, 1200))

    # Generate 2D coordinates
    from rdkit.Chem import AllChem
    from rdkit.Chem.Draw import rdMolDraw2D
    AllChem.Compute2DCoords(mol)

    # Use RDKit's built-in SVG drawer (native text format, no C-extension dependencies)
    drawer = rdMolDraw2D.MolDraw2DSVG(width, height)
    drawer_opts = drawer.drawOptions()

    # Dark background styling to match the frontend theme
    drawer_opts.setBackgroundColour((0.06, 0.07, 0.09, 1.0))  # Dark slate (#0f1117)

    # Set specific element colors for common atoms using palette update
    atom_colors = {
        6: (0.85, 0.85, 0.90),    # C — light gray
        7: (0.35, 0.55, 1.0),     # N — blue
        8: (1.0, 0.35, 0.35),     # O — red
        9: (0.0, 0.9, 0.5),      # F — green
        15: (1.0, 0.6, 0.2),      # P — orange
        16: (1.0, 0.85, 0.2),     # S — yellow
        17: (0.0, 0.9, 0.5),     # Cl — green
        35: (0.65, 0.15, 0.15),   # Br — dark red
        53: (0.58, 0.0, 0.83),    # I — purple
    }
    
    # Update the global color palette for this drawing
    drawer_opts.updateAtomPalette(atom_colors)

    drawer_opts.bondLineWidth = 2.5
    drawer_opts.padding = 0.15
    drawer_opts.additionalAtomLabelPadding = 0.12

    # Draw using SVG
    drawer.DrawMolecule(mol)
    drawer.FinishDrawing()
    
    # Return SVG bytes so Flask can serve it as an image
    svg_text = drawer.GetDrawingText()
    # It might be a string in older versions
    if isinstance(svg_text, str):
        return svg_text.encode('utf-8')
    return svg_text
