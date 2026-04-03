"""
SmilesDB Service — Supplementary molecular data lookup from smilesdb.org.

SmilesDB is a SMILES-first molecular database with ~5000 molecules.
It provides supplementary info (formula, weight, LogP, TPSA, etc.) for
molecules in its database. Since it's a lookup (not a computation engine),
not every SMILES will match. When no match is found, RDKit-computed
properties are used instead.
"""

from typing import Optional

import requests
from rdkit import Chem

# Cache the full SmilesDB dataset in memory (loaded once on first call)
_smilesdb_cache = None
_SMILESDB_API_URL = "https://smilesdb.org/api/smiles/full"
_REQUEST_TIMEOUT = 10  # seconds


def _load_database() -> list:
    """
    Fetch the full SmilesDB dataset and cache it.
    Returns an empty list if the API is unreachable.
    """
    global _smilesdb_cache
    if _smilesdb_cache is not None:
        return _smilesdb_cache

    try:
        response = requests.get(_SMILESDB_API_URL, timeout=_REQUEST_TIMEOUT)
        response.raise_for_status()
        data = response.json()

        # The API may return a dict with a data key or a list directly
        if isinstance(data, dict) and "data" in data:
            _smilesdb_cache = data["data"]
        elif isinstance(data, list):
            _smilesdb_cache = data
        else:
            _smilesdb_cache = []

        print(f"[SmilesDB] Loaded {len(_smilesdb_cache)} molecules from database")
        return _smilesdb_cache

    except Exception as e:
        print(f"[SmilesDB] Warning: Could not load database — {e}")
        _smilesdb_cache = []
        return _smilesdb_cache


def _canonicalize(smiles: str) -> str:
    """Convert a SMILES string to its canonical form for comparison."""
    try:
        mol = Chem.MolFromSmiles(smiles)
        if mol:
            return Chem.MolToSmiles(mol)
    except Exception:
        pass
    return smiles


def lookup_smiles(smiles: str) -> Optional[dict]:
    """
    Look up a SMILES string in the SmilesDB database.
    Uses canonical SMILES comparison for matching.

    Returns a dict with SmilesDB data if found, or None if not found.
    Data spec fields: SMILES, formula, weight, num_atoms, num_bonds,
    LogP, TPSA, rotatable_bonds, hbond_donors, hbond_acceptors.
    """
    database = _load_database()
    if not database:
        return None

    canonical_query = _canonicalize(smiles)

    for entry in database:
        entry_smiles = entry.get("SMILES", "")
        canonical_entry = _canonicalize(entry_smiles)

        if canonical_query == canonical_entry:
            return entry

    return None
