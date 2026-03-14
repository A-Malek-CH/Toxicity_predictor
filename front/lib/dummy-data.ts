export interface ModelPrediction {
  modelName: string;
  description: string;
  ld50: number;
  confidence: number;
  modelType: 'text' | 'graph' | 'fingerprint' | 'ensemble';
}

export interface MolecularProperties {
  molecularWeight: number;
  formula: string;
  atomCount: number;
  hydrogenBondDonors: number;
  hydrogenBondAcceptors: number;
  logP: number;
}

export interface ResearchMetrics {
  modelAgreement: number;
  uncertaintyScore: number;
  experimentalDataPoints: number;
  modelConsensus: 'strong' | 'moderate' | 'weak';
}

export interface PredictionResult {
  smiles: string;
  textModel: ModelPrediction;
  graphModel: ModelPrediction;
  fingerprintModel: ModelPrediction;
  ensemble: ModelPrediction;
  toxicityLevel: 'low' | 'medium' | 'high';
  molecularProperties: MolecularProperties;
  researchMetrics: ResearchMetrics;
}

export interface ExampleMolecule {
  smiles: string;
  label: string;
  description: string;
}

export const generateDummyPrediction = (
  smiles: string = 'CC(=O)OC1=CC=CC=C1C(=O)O'
): PredictionResult => {
  // Simulate some variation based on SMILES input
  const baseMultiplier = smiles.length % 5 / 10 + 0.8;
  const charSum = smiles.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const textLD50 = parseFloat((2.31 * baseMultiplier).toFixed(2));
  const graphLD50 = parseFloat((2.48 * baseMultiplier).toFixed(2));
  const fingerprintLD50 = parseFloat((2.26 * baseMultiplier).toFixed(2));
  const ensembleLD50 = parseFloat((2.35 * baseMultiplier).toFixed(2));

  // Calculate model agreement (0-1 range, higher is better agreement)
  const predictions = [textLD50, graphLD50, fingerprintLD50];
  const mean = predictions.reduce((a, b) => a + b) / predictions.length;
  const variance = predictions.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / predictions.length;
  const modelAgreement = Math.max(0, Math.min(1, 1 - variance / 0.5)); // Normalize to 0-1

  return {
    smiles,
    textModel: {
      modelName: 'SMILES Transformer',
      description: 'Deep learning model that parses SMILES strings using transformer architecture',
      ld50: textLD50,
      confidence: 0.92,
      modelType: 'text',
    },
    graphModel: {
      modelName: 'Graph Neural Network',
      description: 'GNN that constructs and processes molecular graphs for prediction',
      ld50: graphLD50,
      confidence: 0.89,
      modelType: 'graph',
    },
    fingerprintModel: {
      modelName: 'Fingerprint-based',
      description: 'ECFP4 molecular fingerprint features with XGBoost classifier',
      ld50: fingerprintLD50,
      confidence: 0.85,
      modelType: 'fingerprint',
    },
    ensemble: {
      modelName: 'Ensemble Model',
      description: 'Weighted average of all three models for robust prediction',
      ld50: ensembleLD50,
      confidence: 0.95,
      modelType: 'ensemble',
    },
    toxicityLevel: ensembleLD50 > 2.5 ? 'low' : ensembleLD50 > 1.8 ? 'medium' : 'high',
    molecularProperties: {
      molecularWeight: Math.round((smiles.length * 12 + charSum % 50) * 1.5),
      formula: `C${Math.floor(smiles.length / 3)}H${Math.floor(smiles.length / 2)}O${smiles.includes('O') ? 2 : 0}`,
      atomCount: smiles.replace(/[^A-Z]/g, '').length,
      hydrogenBondDonors: (smiles.match(/N|O/g) || []).length,
      hydrogenBondAcceptors: (smiles.match(/O|N/g) || []).length,
      logP: parseFloat((charSum % 50 / 10 - 2.5).toFixed(2)),
    },
    researchMetrics: {
      modelAgreement: parseFloat(modelAgreement.toFixed(3)),
      uncertaintyScore: parseFloat((0.2 + charSum % 30 / 100).toFixed(3)),
      experimentalDataPoints: Math.floor(50 + charSum % 150),
      modelConsensus:
        modelAgreement > 0.85
          ? 'strong'
          : modelAgreement > 0.65
            ? 'moderate'
            : 'weak',
    },
  };
};

export const exampleSmiles = 'CC(=O)OC1=CC=CC=C1C(=O)O';

export const exampleSmilesList: ExampleMolecule[] = [
  {
    smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
    label: 'Aspirin',
    description: 'Pain reliever and anti-inflammatory drug',
  },
  {
    smiles: 'CC(C)Cc1ccc(cc1)C(C)C(O)=O',
    label: 'Ibuprofen',
    description: 'NSAID with analgesic and antipyretic properties',
  },
  {
    smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
    label: 'Caffeine',
    description: 'Stimulant alkaloid found in beverages',
  },
];
