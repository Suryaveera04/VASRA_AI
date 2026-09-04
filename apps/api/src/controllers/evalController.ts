import { Request, Response } from 'express';
import { syntheticEvaluationDataset } from '../seed/evalDataset.js';
import { ShoppingAgentService } from '../services/shoppingAgentService.js';

export const runBenchmarkEval = async (req: Request, res: Response): Promise<void> => {
  try {
    let matchedConstraints = 0;
    let productsReturnedCount = 0;
    const total = syntheticEvaluationDataset.length;
    const results: any[] = [];

    for (const testCase of syntheticEvaluationDataset) {
      const resp = await ShoppingAgentService.handleMessage({
        sessionId: `eval_sess_${testCase.id}`,
        message: testCase.query,
      });

      const returnedProds = resp.recommendedProducts || [];
      const hasProducts = returnedProds.length > 0;
      if (hasProducts) productsReturnedCount++;

      // Verify constraints
      let constraintMatch = true;
      if (testCase.expectedMaxPrice) {
        const prices = returnedProds.map((p: any) => p.price);
        if (prices.some((pr: number) => pr > testCase.expectedMaxPrice!)) {
          constraintMatch = false;
        }
      }

      if (constraintMatch && hasProducts) {
        matchedConstraints++;
      }

      results.push({
        id: testCase.id,
        query: testCase.query,
        productsCount: returnedProds.length,
        state: resp.state,
        explainability: resp.explainabilityBadge,
        passed: constraintMatch && hasProducts,
      });
    }

    const accuracyRate = ((matchedConstraints / total) * 100).toFixed(1);
    const retrievalRate = ((productsReturnedCount / total) * 100).toFixed(1);

    res.json({
      success: true,
      totalQueries: total,
      accuracyRate: `${accuracyRate}%`,
      retrievalRate: `${retrievalRate}%`,
      benchmarkPassed: parseFloat(accuracyRate) >= 80,
      timestamp: new Date().toISOString(),
      results: results.slice(0, 10), // Return sample 10 results
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Benchmark evaluation failed' });
  }
};
