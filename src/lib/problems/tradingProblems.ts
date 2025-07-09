import { Problem } from '@/types'

export const tradingProblems: Problem[] = [
  {
    id: 'trading-1',
    title: 'Business Growth Calculator',
    description: 'Create a function that calculates business growth with a minimum of 1%, no maximum limit, but no negative values allowed.',
    difficulty: 'Medium',
    category: 'trading',
    solution: `// Business Growth Calculator
function calculateBusinessGrowth(currentValue: number, growthRate: number): number {
  // Ensure growth rate is not negative
  if (growthRate < 0) {
    throw new Error('Growth rate cannot be negative');
  }
  
  // Ensure minimum growth rate of 1%
  const adjustedGrowthRate = Math.max(growthRate, 0.01);
  
  // Calculate new value with growth
  const newValue = currentValue * (1 + adjustedGrowthRate);
  
  return newValue;
}

// Example usage:
const currentRevenue = 100000;
const growthRate = 0.05; // 5% growth

try {
  const newRevenue = calculateBusinessGrowth(currentRevenue, growthRate);
  console.log('New Revenue:', newRevenue); // 105000
  
  // Test with growth rate below 1%
  const lowGrowth = calculateBusinessGrowth(currentRevenue, 0.005); // 0.5%
  console.log('Low Growth Revenue:', lowGrowth); // 101000 (enforced 1% minimum)
  
  // Test with negative growth (should throw error)
  // calculateBusinessGrowth(currentRevenue, -0.02); // Error: Growth rate cannot be negative
} catch (error) {
  console.error('Error:', error.message);
}

// Advanced version with validation and formatting
class BusinessGrowthCalculator {
  private static MIN_GROWTH_RATE = 0.01; // 1%
  
  static calculate(currentValue: number, growthRate: number): {
    originalValue: number;
    growthRate: number;
    adjustedGrowthRate: number;
    newValue: number;
    growthAmount: number;
    percentageGrowth: number;
  } {
    // Validate inputs
    if (currentValue < 0) {
      throw new Error('Current value cannot be negative');
    }
    
    if (growthRate < 0) {
      throw new Error('Growth rate cannot be negative');
    }
    
    // Apply minimum growth rate
    const adjustedGrowthRate = Math.max(growthRate, this.MIN_GROWTH_RATE);
    
    // Calculate results
    const newValue = currentValue * (1 + adjustedGrowthRate);
    const growthAmount = newValue - currentValue;
    const percentageGrowth = (adjustedGrowthRate * 100);
    
    return {
      originalValue: currentValue,
      growthRate: growthRate,
      adjustedGrowthRate: adjustedGrowthRate,
      newValue: newValue,
      growthAmount: growthAmount,
      percentageGrowth: percentageGrowth
    };
  }
  
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}

// Usage example:
const calculator = BusinessGrowthCalculator;
const result = calculator.calculate(50000, 0.03);

console.log('Business Growth Analysis:');
console.log('Original Value:', calculator.formatCurrency(result.originalValue));
console.log('Requested Growth Rate:', (result.growthRate * 100).toFixed(1) + '%');
console.log('Applied Growth Rate:', (result.adjustedGrowthRate * 100).toFixed(1) + '%');
console.log('New Value:', calculator.formatCurrency(result.newValue));
console.log('Growth Amount:', calculator.formatCurrency(result.growthAmount));`,
    testCases: [
      { 
        input: 'calculateBusinessGrowth(100000, 0.05)', 
        output: '105000' 
      },
      { 
        input: 'calculateBusinessGrowth(50000, 0.005)', 
        output: '50500' 
      },
      { 
        input: 'calculateBusinessGrowth(200000, 0.15)', 
        output: '230000' 
      }
    ],
    explanation: `This solution implements a business growth calculator with the following key features:

1. **Minimum Growth Rate**: Enforces a 1% minimum growth rate using Math.max(growthRate, 0.01)
2. **No Maximum Limit**: Allows unlimited growth rates (no upper bound)
3. **No Negative Values**: Throws an error for negative growth rates
4. **Input Validation**: Validates that current value is not negative
5. **Comprehensive Output**: Returns detailed information including growth amount and percentage

The advanced version includes:
- A class-based approach for better organization
- Currency formatting for professional output
- Detailed return object with all relevant metrics
- Error handling for invalid inputs

This is useful for financial modeling, business planning, and investment analysis where you need to ensure minimum growth thresholds while allowing for unlimited upside potential.`
  },
  {
    id: 'trading-2',
    title: 'Delta Trading with Transaction Charges',
    description: 'Create a delta trading calculator that accounts for 5x transaction charges and maintains liquidity by blowing up margin used for the trade.',
    difficulty: 'Hard',
    category: 'trading',
    solution: `// Delta Trading Calculator with Transaction Charges
class DeltaTradingCalculator {
  private static TRANSACTION_CHARGE_MULTIPLIER = 5; // 5x transaction charges
  private static LIQUIDITY_BUFFER = 1.0; // 100% margin blow-up for liquidity
  
  static calculateDeltaTrade(
    positionSize: number,
    deltaValue: number,
    baseTransactionCharge: number,
    availableMargin: number
  ): {
    positionSize: number;
    deltaValue: number;
    baseTransactionCharge: number;
    actualTransactionCharge: number;
    marginRequired: number;
    marginUsed: number;
    remainingLiquidity: number;
    totalCost: number;
    riskMetrics: {
      marginUtilization: number;
      liquidityRatio: number;
      chargeToDeltaRatio: number;
    };
  } {
    // Calculate 5x transaction charges
    const actualTransactionCharge = baseTransactionCharge * this.TRANSACTION_CHARGE_MULTIPLIER;
    
    // Calculate margin required (position size + transaction charges)
    const marginRequired = positionSize + actualTransactionCharge;
    
    // Calculate margin used (including liquidity buffer)
    const marginUsed = marginRequired * this.LIQUIDITY_BUFFER;
    
    // Calculate remaining liquidity
    const remainingLiquidity = availableMargin - marginUsed;
    
    // Calculate total cost
    const totalCost = positionSize + actualTransactionCharge;
    
    // Calculate risk metrics
    const marginUtilization = (marginUsed / availableMargin) * 100;
    const liquidityRatio = (remainingLiquidity / availableMargin) * 100;
    const chargeToDeltaRatio = (actualTransactionCharge / deltaValue) * 100;
    
    return {
      positionSize,
      deltaValue,
      baseTransactionCharge,
      actualTransactionCharge,
      marginRequired,
      marginUsed,
      remainingLiquidity,
      totalCost,
      riskMetrics: {
        marginUtilization,
        liquidityRatio,
        chargeToDeltaRatio
      }
    };
  }
  
  static validateTrade(
    positionSize: number,
    availableMargin: number,
    baseTransactionCharge: number
  ): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Calculate required margin
    const actualTransactionCharge = baseTransactionCharge * this.TRANSACTION_CHARGE_MULTIPLIER;
    const marginRequired = positionSize + actualTransactionCharge;
    const marginUsed = marginRequired * this.LIQUIDITY_BUFFER;
    
    // Check if enough margin available
    if (marginUsed > availableMargin) {
      errors.push('Insufficient margin for this trade');
    }
    
    // Check if transaction charges are excessive
    const chargeRatio = (actualTransactionCharge / positionSize) * 100;
    if (chargeRatio > 10) {
      warnings.push('Transaction charges exceed 10% of position size');
    }
    
    // Check liquidity buffer
    const liquidityRatio = ((availableMargin - marginUsed) / availableMargin) * 100;
    if (liquidityRatio < 20) {
      warnings.push('Low liquidity buffer (< 20%)');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  }
  
  static formatPercentage(value: number): string {
    return value.toFixed(2) + '%';
  }
}

// Example usage:
const calculator = DeltaTradingCalculator;

// Scenario 1: Normal delta trade
const trade1 = calculator.calculateDeltaTrade(
  10000,    // Position size: $10,000
  500,      // Delta value: $500
  50,       // Base transaction charge: $50
  50000     // Available margin: $50,000
);

console.log('=== Delta Trading Analysis ===');
console.log('Position Size:', calculator.formatCurrency(trade1.positionSize));
console.log('Delta Value:', calculator.formatCurrency(trade1.deltaValue));
console.log('Base Transaction Charge:', calculator.formatCurrency(trade1.baseTransactionCharge));
console.log('Actual Transaction Charge (5x):', calculator.formatCurrency(trade1.actualTransactionCharge));
console.log('Margin Required:', calculator.formatCurrency(trade1.marginRequired));
console.log('Margin Used (with liquidity):', calculator.formatCurrency(trade1.marginUsed));
console.log('Remaining Liquidity:', calculator.formatCurrency(trade1.remainingLiquidity));
console.log('Total Cost:', calculator.formatCurrency(trade1.totalCost));
console.log('\\nRisk Metrics:');
console.log('Margin Utilization:', calculator.formatPercentage(trade1.riskMetrics.marginUtilization));
console.log('Liquidity Ratio:', calculator.formatPercentage(trade1.riskMetrics.liquidityRatio));
console.log('Charge to Delta Ratio:', calculator.formatPercentage(trade1.riskMetrics.chargeToDeltaRatio));

// Validate the trade
const validation = calculator.validateTrade(
  trade1.positionSize,
  50000,
  trade1.baseTransactionCharge
);

console.log('\\nTrade Validation:');
console.log('Valid:', validation.isValid);
if (validation.errors.length > 0) {
  console.log('Errors:', validation.errors);
}
if (validation.warnings.length > 0) {
  console.log('Warnings:', validation.warnings);
}

// Scenario 2: High transaction charge scenario
const trade2 = calculator.calculateDeltaTrade(
  5000,     // Smaller position
  200,      // Smaller delta
  200,      // Higher base transaction charge
  20000     // Lower available margin
);

console.log('\\n=== High Transaction Charge Scenario ===');
console.log('Position Size:', calculator.formatCurrency(trade2.positionSize));
console.log('Actual Transaction Charge:', calculator.formatCurrency(trade2.actualTransactionCharge));
console.log('Charge to Delta Ratio:', calculator.formatPercentage(trade2.riskMetrics.chargeToDeltaRatio));

// Advanced: Portfolio-level delta management
class DeltaPortfolioManager {
  private trades: any[] = [];
  
  addTrade(trade: any) {
    this.trades.push(trade);
  }
  
  getPortfolioMetrics(): {
    totalPositionSize: number;
    totalDeltaValue: number;
    totalTransactionCharges: number;
    totalMarginUsed: number;
    portfolioDelta: number;
    averageChargeRatio: number;
  } {
    const totalPositionSize = this.trades.reduce((sum, trade) => sum + trade.positionSize, 0);
    const totalDeltaValue = this.trades.reduce((sum, trade) => sum + trade.deltaValue, 0);
    const totalTransactionCharges = this.trades.reduce((sum, trade) => sum + trade.actualTransactionCharge, 0);
    const totalMarginUsed = this.trades.reduce((sum, trade) => sum + trade.marginUsed, 0);
    
    return {
      totalPositionSize,
      totalDeltaValue,
      totalTransactionCharges,
      totalMarginUsed,
      portfolioDelta: totalDeltaValue,
      averageChargeRatio: (totalTransactionCharges / totalDeltaValue) * 100
    };
  }
}

// Portfolio example
const portfolio = new DeltaPortfolioManager();
portfolio.addTrade(trade1);
portfolio.addTrade(trade2);

const portfolioMetrics = portfolio.getPortfolioMetrics();
console.log('\\n=== Portfolio Metrics ===');
console.log('Total Position Size:', calculator.formatCurrency(portfolioMetrics.totalPositionSize));
console.log('Total Delta Value:', calculator.formatCurrency(portfolioMetrics.totalDeltaValue));
console.log('Total Transaction Charges:', calculator.formatCurrency(portfolioMetrics.totalTransactionCharges));
console.log('Total Margin Used:', calculator.formatCurrency(portfolioMetrics.totalMarginUsed));
console.log('Portfolio Delta:', calculator.formatCurrency(portfolioMetrics.portfolioDelta));
console.log('Average Charge Ratio:', calculator.formatPercentage(portfolioMetrics.averageChargeRatio));`,
    testCases: [
      { 
        input: 'DeltaTradingCalculator.calculateDeltaTrade(10000, 500, 50, 50000).totalCost', 
        output: '10250' 
      },
      { 
        input: 'DeltaTradingCalculator.calculateDeltaTrade(5000, 200, 200, 20000).actualTransactionCharge', 
        output: '1000' 
      },
      { 
        input: 'DeltaTradingCalculator.calculateDeltaTrade(15000, 750, 75, 75000).remainingLiquidity', 
        output: '60000' 
      }
    ],
    explanation: `This delta trading calculator implements a comprehensive system for managing delta trades with the following key features:

## **Core Features:**

1. **5x Transaction Charges**: Automatically multiplies base transaction charges by 5x
2. **Liquidity Management**: Blows up margin by 100% to maintain liquidity buffer
3. **Risk Metrics**: Calculates margin utilization, liquidity ratio, and charge-to-delta ratios
4. **Trade Validation**: Validates trades for margin sufficiency and risk thresholds

## **Key Components:**

### **DeltaTradingCalculator Class:**
- calculateDeltaTrade(): Main calculation method
- validateTrade(): Trade validation with error/warning system
- formatCurrency() & formatPercentage(): Professional formatting

### **Risk Management:**
- Margin Utilization: Percentage of available margin used
- Liquidity Ratio: Remaining liquidity as percentage of total margin
- Charge to Delta Ratio: Transaction charges relative to delta value

### **Portfolio Management:**
- DeltaPortfolioManager class for managing multiple trades
- Portfolio-level metrics and risk aggregation
- Average charge ratios across all positions

## **Practical Applications:**

1. Options Trading: Managing delta exposure with transaction costs
2. Futures Trading: Calculating margin requirements with fees
3. Risk Management: Ensuring adequate liquidity buffers
4. Portfolio Optimization: Balancing delta exposure across positions

## **Risk Considerations:**

- High Transaction Costs: 5x charges can significantly impact profitability
- Liquidity Requirements: 100% margin blow-up ensures safety but reduces leverage
- Charge-to-Delta Ratios: High ratios indicate poor trade economics
- Margin Utilization: High utilization increases risk of margin calls

This system is essential for professional traders who need to account for all costs and maintain proper risk management in delta-neutral strategies.`
  }
]; 