import { Problem } from '@/types'

export const cssProblems: Problem[] = [
  {
    id: 'css-1',
    title: 'Component-Level CSS vs Global CSS',
    description: 'Understanding the pros and cons of component-level CSS versus global CSS, and when to apply each approach in modern web development.',
    difficulty: 'Medium',
    category: 'css',
    solution: `// Component-Level CSS vs Global CSS Analysis

// 1. Component-Level CSS (CSS Modules, Styled Components, etc.)
class ComponentLevelCSS {
  static pros = [
    'Scoped styles prevent naming conflicts',
    'Better encapsulation and modularity',
    'Easier to maintain and refactor',
    'Component-specific styling',
    'Better tree-shaking and optimization',
    'Reduced CSS bundle size',
    'Clear component boundaries',
    'Easier testing and debugging'
  ];
  
  static cons = [
    'Potential for style duplication',
    'Harder to maintain design consistency',
    'More complex setup and tooling',
    'Learning curve for team members',
    'Limited global design system integration',
    'Potential performance overhead',
    'Harder to implement global themes',
    'CSS-in-JS runtime overhead'
  ];
  
  static useCases = [
    'Component libraries and design systems',
    'Large applications with many components',
    'Teams working on isolated features',
    'Applications requiring strict style isolation',
    'Micro-frontend architectures',
    'Projects with complex component hierarchies'
  ];
}

// 2. Global CSS
class GlobalCSS {
  static pros = [
    'Simpler setup and learning curve',
    'Better for global design consistency',
    'Easier to implement global themes',
    'Faster development for small projects',
    'Better browser caching',
    'No runtime overhead',
    'Easier to implement responsive design',
    'Better for legacy codebases'
  ];
  
  static cons = [
    'Naming conflicts and specificity issues',
    'Harder to maintain as project grows',
    'Global scope pollution',
    'Difficult to refactor safely',
    'No automatic tree-shaking',
    'Larger CSS bundles',
    'Harder to achieve component isolation',
    'Potential for style leakage'
  ];
  
  static useCases = [
    'Small to medium-sized projects',
    'Simple landing pages',
    'Legacy applications',
    'Projects with tight deadlines',
    'Applications with simple styling needs',
    'Teams new to modern CSS approaches'
  ];
}

// 3. CSS Modules Implementation
// Component-level CSS with CSS Modules
const styles = {
  button: 'button_abc123',
  primary: 'primary_def456',
  disabled: 'disabled_ghi789'
};

function Button({ variant = 'default', disabled, children }) {
  const buttonClass = \`\${styles.button} \${variant === 'primary' ? styles.primary : ''} \${disabled ? styles.disabled : ''}\`;
  
  return (
    <button className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
}

// CSS file: Button.module.css
/*
.button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
*/

// 4. Styled Components Implementation
import styled from 'styled-components';

const StyledButton = styled.button\`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  
  \${props => props.variant === 'primary' && \`
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  \`}
  
  \${props => props.disabled && \`
    opacity: 0.6;
    cursor: not-allowed;
  \`}
\`;

function StyledButtonComponent({ variant = 'default', disabled, children }) {
  return (
    <StyledButton variant={variant} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

// 5. Global CSS Implementation
// Global CSS file: styles.css
/*
/* Global styles */
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
}

/* Component styles */
.btn {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Utility classes */
.text-center { text-align: center; }
.mt-1 { margin-top: 0.25rem; }
.mb-1 { margin-bottom: 0.25rem; }
*/

// 6. Hybrid Approach
class HybridCSSApproach {
  static strategy = {
    global: [
      'CSS reset/normalize',
      'Typography system',
      'Color variables',
      'Spacing system',
      'Utility classes',
      'Global animations',
      'Layout grid system'
    ],
    component: [
      'Component-specific styles',
      'Interactive states',
      'Complex animations',
      'Component variants',
      'Theme-specific styling'
    ]
  };
  
  static implementation = {
    globalCSS: \`
      /* Global CSS Variables */
      :root {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
        --spacing-unit: 8px;
        --border-radius: 4px;
      }
      
      /* Global utility classes */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-unit);
      }
      
      .text-center { text-align: center; }
      .mt-1 { margin-top: var(--spacing-unit); }
      .mb-1 { margin-bottom: var(--spacing-unit); }
    \`,
    
    componentCSS: \`
      /* Component-specific styles */
      .button {
        padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
        border: 1px solid var(--secondary-color);
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .button:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    \`
  };
}

// 7. Performance Comparison
class CSSPerformanceAnalysis {
  static componentLevel = {
    bundleSize: 'Smaller initial CSS bundle',
    runtime: 'Potential overhead with CSS-in-JS',
    caching: 'Better tree-shaking',
    loading: 'Styles loaded with components'
  };
  
  static globalCSS = {
    bundleSize: 'Larger initial CSS bundle',
    runtime: 'No runtime overhead',
    caching: 'Better browser caching',
    loading: 'Styles loaded upfront'
  };
  
  static optimization = {
    criticalCSS: 'Extract critical styles for above-the-fold content',
    lazyLoading: 'Load non-critical styles asynchronously',
    codeSplitting: 'Split CSS by routes or features',
    purging: 'Remove unused CSS in production'
  };
}

// 8. Best Practices
class CSSBestPractices {
  static componentLevel = [
    'Use consistent naming conventions',
    'Implement design tokens and variables',
    'Create reusable component variants',
    'Document component APIs',
    'Test component styles in isolation',
    'Use TypeScript for better type safety',
    'Implement proper theming support'
  ];
  
  static globalCSS = [
    'Use CSS custom properties for theming',
    'Implement a consistent naming convention (BEM, SMACSS)',
    'Create a comprehensive design system',
    'Use CSS Grid and Flexbox for layouts',
    'Implement responsive design patterns',
    'Optimize for performance and maintainability',
    'Document global styles and utilities'
  ];
  
  static hybrid = [
    'Define clear boundaries between global and component styles',
    'Use design tokens consistently across both approaches',
    'Implement proper CSS architecture (ITCSS, 7-1 pattern)',
    'Create style guides and documentation',
    'Regularly audit and refactor styles',
    'Use automated tools for style consistency',
    'Implement proper testing strategies'
  ];
}

// 9. Migration Strategies
class CSSMigrationStrategy {
  static toComponentLevel = [
    'Start with new components using component-level CSS',
    'Gradually refactor existing components',
    'Create a design system with component-level styles',
    'Implement proper tooling and build processes',
    'Train team on new CSS approaches',
    'Set up linting and formatting rules',
    'Create migration guidelines and documentation'
  ];
  
  static toGlobalCSS = [
    'Audit existing component styles',
    'Extract common patterns to global CSS',
    'Create a comprehensive design system',
    'Implement proper CSS architecture',
    'Set up CSS optimization tools',
    'Create style guides and documentation',
    'Establish CSS governance processes'
  ];
}

// 10. Decision Framework
class CSSDecisionFramework {
  static evaluateProject(project) {
    const factors = {
      teamSize: project.teamSize,
      projectSize: project.projectSize,
      complexity: project.complexity,
      timeline: project.timeline,
      maintenance: project.maintenance,
      performance: project.performance
    };
    
    let componentScore = 0;
    let globalScore = 0;
    
    // Team size factor
    if (factors.teamSize > 5) componentScore += 2;
    else globalScore += 1;
    
    // Project size factor
    if (factors.projectSize === 'large') componentScore += 2;
    else if (factors.projectSize === 'medium') componentScore += 1;
    else globalScore += 2;
    
    // Complexity factor
    if (factors.complexity === 'high') componentScore += 2;
    else globalScore += 1;
    
    // Timeline factor
    if (factors.timeline === 'tight') globalScore += 2;
    else componentScore += 1;
    
    // Maintenance factor
    if (factors.maintenance === 'long-term') componentScore += 2;
    else globalScore += 1;
    
    // Performance factor
    if (factors.performance === 'critical') {
      componentScore += 1;
      globalScore += 1;
    }
    
    return {
      recommendation: componentScore > globalScore ? 'component-level' : 'global',
      componentScore,
      globalScore,
      factors
    };
  }
}

// Example usage
const projectAnalysis = CSSDecisionFramework.evaluateProject({
  teamSize: 8,
  projectSize: 'large',
  complexity: 'high',
  timeline: 'flexible',
  maintenance: 'long-term',
  performance: 'important'
});

console.log('CSS Approach Recommendation:', projectAnalysis.recommendation);
console.log('Component Score:', projectAnalysis.componentScore);
console.log('Global Score:', projectAnalysis.globalScore);`,
    testCases: [
      {
        input: 'ComponentLevelCSS.pros.length',
        output: '8'
      },
      {
        input: 'GlobalCSS.cons.includes("Naming conflicts and specificity issues")',
        output: 'true'
      },
      {
        input: 'CSSDecisionFramework.evaluateProject({teamSize: 3, projectSize: "small", complexity: "low", timeline: "tight", maintenance: "short-term", performance: "standard"}).recommendation',
        output: 'global'
      }
    ],
    explanation: `This comprehensive analysis covers the key differences between component-level CSS and global CSS approaches in modern web development.

## **Component-Level CSS:**

### **Pros:**
- **Scoped Styles**: Prevents naming conflicts and style leakage
- **Better Encapsulation**: Each component manages its own styles
- **Easier Maintenance**: Changes are isolated to specific components
- **Tree Shaking**: Unused styles can be automatically removed
- **Component Isolation**: Clear boundaries between component styles
- **Better Testing**: Styles can be tested in isolation
- **Design System Integration**: Easier to create consistent component libraries

### **Cons:**
- **Style Duplication**: Common styles may be repeated across components
- **Design Consistency**: Harder to maintain global design consistency
- **Setup Complexity**: Requires additional tooling and configuration
- **Learning Curve**: Team members need to learn new CSS approaches
- **Runtime Overhead**: CSS-in-JS solutions add runtime overhead
- **Global Theme Implementation**: More complex to implement global themes

## **Global CSS:**

### **Pros:**
- **Simple Setup**: Easier to get started and understand
- **Design Consistency**: Better for maintaining global design systems
- **Performance**: No runtime overhead, better browser caching
- **Faster Development**: Quicker to implement for simple projects
- **Global Themes**: Easier to implement application-wide theming
- **Responsive Design**: Better for implementing responsive patterns
- **Legacy Support**: Works well with existing codebases

### **Cons:**
- **Naming Conflicts**: CSS specificity and naming collision issues
- **Maintenance Challenges**: Harder to maintain as projects grow
- **Global Scope Pollution**: Styles can affect unintended elements
- **Refactoring Difficulty**: Changes can have unintended consequences
- **Bundle Size**: Larger CSS bundles due to lack of tree shaking
- **Component Isolation**: Difficult to achieve true component isolation

## **When to Use Each Approach:**

### **Component-Level CSS is Best For:**
- Large applications with many components
- Component libraries and design systems
- Teams working on isolated features
- Applications requiring strict style isolation
- Micro-frontend architectures
- Projects with complex component hierarchies
- Long-term maintenance projects

### **Global CSS is Best For:**
- Small to medium-sized projects
- Simple landing pages and marketing sites
- Legacy applications and maintenance
- Projects with tight deadlines
- Applications with simple styling needs
- Teams new to modern CSS approaches
- Projects requiring quick prototyping

## **Hybrid Approach:**

Many modern applications use a hybrid approach:
- **Global CSS**: For design tokens, utilities, and global styles
- **Component CSS**: For component-specific styling and interactions

This provides the benefits of both approaches while minimizing their drawbacks.

## **Performance Considerations:**

- **Component CSS**: Better tree shaking, smaller initial bundles
- **Global CSS**: Better browser caching, no runtime overhead
- **Optimization**: Both approaches benefit from critical CSS extraction and lazy loading

## **Migration Strategies:**

- **Gradual Migration**: Start with new components using the preferred approach
- **Design System**: Create comprehensive design systems to guide the migration
- **Tooling**: Implement proper build tools and linting rules
- **Documentation**: Create clear guidelines and best practices

The choice between component-level and global CSS should be based on project requirements, team expertise, and long-term maintenance considerations.`
  }
] 