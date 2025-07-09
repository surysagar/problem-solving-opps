import { Problem } from '@/types'

export const jobsProblems: Problem[] = [
  {
    id: 'jobs-1',
    title: 'Remote Job - 50L Package',
    description: 'Explore high-paying remote opportunities with 50L+ salary packages. Focus on senior-level positions in tech, consulting, or specialized fields.',
    difficulty: 'Hard',
    category: 'jobs',
    solution: `// Remote Job Opportunities - 50L+ Package
class RemoteJobFinder {
  private static HIGH_SALARY_THRESHOLD = 5000000; // 50L in rupees
  
  static findHighPayingRemoteJobs(): {
    category: string;
    positions: string[];
    salaryRange: string;
    requirements: string[];
    companies: string[];
  }[] {
    return [
      {
        category: 'Senior Software Engineering',
        positions: [
          'Senior Full Stack Developer',
          'Principal Software Engineer',
          'Tech Lead',
          'Architecture Lead',
          'Senior DevOps Engineer'
        ],
        salaryRange: '50L - 80L',
        requirements: [
          '8+ years of experience',
          'Expert in multiple programming languages',
          'System design expertise',
          'Team leadership experience',
          'Remote work experience'
        ],
        companies: [
          'Netflix',
          'Google',
          'Microsoft',
          'Amazon',
          'Meta',
          'Uber',
          'Airbnb'
        ]
      },
      {
        category: 'Product Management',
        positions: [
          'Senior Product Manager',
          'Product Director',
          'VP of Product',
          'Head of Product'
        ],
        salaryRange: '50L - 100L',
        requirements: [
          '10+ years of product experience',
          'Proven track record of successful products',
          'Strategic thinking',
          'Cross-functional leadership',
          'Data-driven decision making'
        ],
        companies: [
          'Stripe',
          'Shopify',
          'Notion',
          'Figma',
          'Linear',
          'Vercel'
        ]
      },
      {
        category: 'Data Science & AI',
        positions: [
          'Senior Data Scientist',
          'ML Engineer',
          'AI Research Scientist',
          'Data Engineering Lead'
        ],
        salaryRange: '50L - 90L',
        requirements: [
          'PhD in relevant field',
          'Published research papers',
          'Experience with large-scale ML systems',
          'Expert in Python/R',
          'Cloud platform expertise'
        ],
        companies: [
          'OpenAI',
          'Anthropic',
          'Hugging Face',
          'Databricks',
          'Snowflake'
        ]
      },
      {
        category: 'Consulting & Strategy',
        positions: [
          'Senior Consultant',
          'Strategy Manager',
          'Management Consultant',
          'Business Development Director'
        ],
        salaryRange: '50L - 120L',
        requirements: [
          'MBA from top-tier school',
          'Consulting experience',
          'Client relationship management',
          'Strategic analysis skills',
          'International experience'
        ],
        companies: [
          'McKinsey',
          'BCG',
          'Bain',
          'Deloitte',
          'PwC'
        ]
      }
    ];
  }
  
  static calculateCompensationBreakdown(baseSalary: number): {
    baseSalary: number;
    equity: number;
    bonus: number;
    benefits: number;
    totalCompensation: number;
  } {
    const equity = baseSalary * 0.3; // 30% equity
    const bonus = baseSalary * 0.2; // 20% bonus
    const benefits = baseSalary * 0.15; // 15% benefits
    
    return {
      baseSalary,
      equity,
      bonus,
      benefits,
      totalCompensation: baseSalary + equity + bonus + benefits
    };
  }
  
  static getRemoteWorkBenefits(): string[] {
    return [
      'Flexible working hours',
      'No commute time',
      'Global talent pool access',
      'Cost savings on office expenses',
      'Better work-life balance',
      'Access to international markets',
      'Tax advantages',
      'Location independence'
    ];
  }
}

// Example usage:
const jobFinder = new RemoteJobFinder();
const highPayingJobs = jobFinder.findHighPayingRemoteJobs();

console.log('High-Paying Remote Job Opportunities:');
highPayingJobs.forEach(job => {
  console.log(\`\\n\${job.category}:\`);
  console.log(\`Salary Range: \${job.salaryRange}\`);
  console.log(\`Positions: \${job.positions.join(', ')}\`);
  console.log(\`Top Companies: \${job.companies.join(', ')}\`);
});

// Calculate compensation for a 60L base salary
const compensation = jobFinder.calculateCompensationBreakdown(6000000);
console.log('\\nCompensation Breakdown (60L base):');
console.log('Base Salary:', compensation.baseSalary.toLocaleString('en-IN'));
console.log('Equity:', compensation.equity.toLocaleString('en-IN'));
console.log('Bonus:', compensation.bonus.toLocaleString('en-IN'));
console.log('Benefits:', compensation.benefits.toLocaleString('en-IN'));
console.log('Total Compensation:', compensation.totalCompensation.toLocaleString('en-IN'));`,
    testCases: [
      { 
        input: 'findHighPayingRemoteJobs().length', 
        output: '4' 
      },
      { 
        input: 'calculateCompensationBreakdown(5000000).totalCompensation', 
        output: '8250000' 
      }
    ],
    explanation: `This solution provides a comprehensive framework for finding high-paying remote jobs with 50L+ packages:

Key Features:
1. **Multiple Categories**: Covers tech, product, data science, and consulting
2. **Detailed Requirements**: Lists specific skills and experience needed
3. **Company Examples**: Includes top-tier companies known for high compensation
4. **Compensation Breakdown**: Shows how total compensation is structured
5. **Remote Benefits**: Highlights advantages of remote work

The compensation structure typically includes:
- Base salary (60-70% of total)
- Equity/RSUs (20-30% of total)
- Performance bonuses (15-25% of total)
- Benefits and perks (10-15% of total)

This approach helps job seekers understand the full compensation package and target the right opportunities.`
  },
  {
    id: 'jobs-2',
    title: 'Remote Job - 25L Package',
    description: 'Explore mid-level remote opportunities with 25L salary packages. Focus on roles that offer growth potential and work-life balance.',
    difficulty: 'Medium',
    category: 'jobs',
    solution: `// Remote Job Opportunities - 25L Package
class MidLevelRemoteJobFinder {
  private static MID_SALARY_THRESHOLD = 2500000; // 25L in rupees
  
  static findMidLevelRemoteJobs(): {
    category: string;
    positions: string[];
    salaryRange: string;
    requirements: string[];
    growthPotential: string;
    companies: string[];
  }[] {
    return [
      {
        category: 'Software Development',
        positions: [
          'Full Stack Developer',
          'Frontend Developer',
          'Backend Developer',
          'Mobile App Developer',
          'QA Engineer'
        ],
        salaryRange: '25L - 40L',
        requirements: [
          '3-5 years of experience',
          'Proficiency in modern frameworks',
          'Database knowledge',
          'API development experience',
          'Version control expertise'
        ],
        growthPotential: 'High - Can grow to senior/lead roles',
        companies: [
          'Razorpay',
          'CRED',
          'PhonePe',
          'Swiggy',
          'Zomato',
          'Ola',
          'Byju\'s'
        ]
      },
      {
        category: 'Digital Marketing',
        positions: [
          'Senior Marketing Manager',
          'Growth Marketing Specialist',
          'Content Marketing Lead',
          'SEO/SEM Specialist',
          'Social Media Manager'
        ],
        salaryRange: '25L - 35L',
        requirements: [
          '4-6 years of marketing experience',
          'Data analysis skills',
          'Campaign management',
          'Tool proficiency (Google Analytics, etc.)',
          'Creative thinking'
        ],
        growthPotential: 'Medium - Can move to marketing director roles',
        companies: [
          'Nykaa',
          'Mamaearth',
          'Sugar Cosmetics',
          'Wakefit',
          'The Man Company'
        ]
      },
      {
        category: 'Customer Success',
        positions: [
          'Customer Success Manager',
          'Account Manager',
          'Client Relationship Manager',
          'Support Team Lead'
        ],
        salaryRange: '25L - 30L',
        requirements: [
          '3-5 years of customer-facing experience',
          'Excellent communication skills',
          'Problem-solving ability',
          'CRM software knowledge',
          'Cross-functional collaboration'
        ],
        growthPotential: 'Medium - Can advance to senior CS roles',
        companies: [
          'Freshworks',
          'Zoho',
          'Chargebee',
          'Kissflow',
          'BrowserStack'
        ]
      },
      {
        category: 'Sales & Business Development',
        positions: [
          'Sales Manager',
          'Business Development Executive',
          'Partnership Manager',
          'Enterprise Sales Executive'
        ],
        salaryRange: '25L - 45L',
        requirements: [
          '3-5 years of sales experience',
          'Proven track record',
          'Negotiation skills',
          'Market knowledge',
          'Relationship building'
        ],
        growthPotential: 'High - Commission-based growth potential',
        companies: [
          'Salesforce',
          'HubSpot',
          'Zoom',
          'Slack',
          'Notion'
        ]
      }
    ];
  }
  
  static calculateWorkLifeBalance(): {
    flexibleHours: boolean;
    remoteWork: boolean;
    vacationDays: number;
    learningBudget: number;
    healthBenefits: boolean;
  } {
    return {
      flexibleHours: true,
      remoteWork: true,
      vacationDays: 25,
      learningBudget: 50000, // 50K for courses/certifications
      healthBenefits: true
    };
  }
  
  static getCareerGrowthPath(position: string): string[] {
    const growthPaths: Record<string, string[]> = {
      'Full Stack Developer': [
        'Senior Developer',
        'Tech Lead',
        'Engineering Manager',
        'CTO'
      ],
      'Marketing Manager': [
        'Senior Marketing Manager',
        'Marketing Director',
        'VP of Marketing',
        'CMO'
      ],
      'Customer Success Manager': [
        'Senior CSM',
        'CS Director',
        'VP of Customer Success',
        'Chief Customer Officer'
      ],
      'Sales Manager': [
        'Senior Sales Manager',
        'Sales Director',
        'VP of Sales',
        'Chief Revenue Officer'
      ]
    };
    
    return growthPaths[position] || ['Senior Role', 'Manager', 'Director', 'VP'];
  }
}

// Example usage:
const midLevelFinder = new MidLevelRemoteJobFinder();
const midLevelJobs = midLevelFinder.findMidLevelRemoteJobs();

console.log('Mid-Level Remote Job Opportunities (25L+):');
midLevelJobs.forEach(job => {
  console.log(\`\\n\${job.category}:\`);
  console.log(\`Salary Range: \${job.salaryRange}\`);
  console.log(\`Growth Potential: \${job.growthPotential}\`);
  console.log(\`Positions: \${job.positions.join(', ')}\`);
});

// Check work-life balance benefits
const workLifeBalance = midLevelFinder.calculateWorkLifeBalance();
console.log('\\nWork-Life Balance Benefits:');
console.log('Flexible Hours:', workLifeBalance.flexibleHours);
console.log('Remote Work:', workLifeBalance.remoteWork);
console.log('Vacation Days:', workLifeBalance.vacationDays);
console.log('Learning Budget:', workLifeBalance.learningBudget.toLocaleString('en-IN'));

// Show career growth path
const growthPath = midLevelFinder.getCareerGrowthPath('Full Stack Developer');
console.log('\\nCareer Growth Path for Full Stack Developer:');
growthPath.forEach((role, index) => {
  console.log(\`\${index + 1}. \${role}\`);
});`,
    testCases: [
      { 
        input: 'findMidLevelRemoteJobs().length', 
        output: '4' 
      },
      { 
        input: 'calculateWorkLifeBalance().vacationDays', 
        output: '25' 
      }
    ],
    explanation: `This solution focuses on mid-level remote opportunities with 25L+ packages:

Key Features:
1. **Balanced Compensation**: Good salary with growth potential
2. **Work-Life Balance**: Flexible hours, remote work, good benefits
3. **Career Growth**: Clear progression paths for each role
4. **Indian Companies**: Focus on companies with strong presence in India
5. **Skill Development**: Learning budgets and training opportunities

Advantages of 25L remote jobs:
- Better work-life balance than high-pressure roles
- Opportunity to learn and grow
- Stable income with benefits
- Remote flexibility
- Lower stress compared to senior roles

This level is perfect for professionals who want good compensation while maintaining work-life balance and having room for growth.`
  },
  {
    id: 'jobs-3',
    title: 'Business Mind Ideas for Next 5 Years',
    description: 'Explore innovative business ideas and opportunities that are likely to succeed in the next 5 years. Focus on emerging trends, technology, and market gaps.',
    difficulty: 'Hard',
    category: 'jobs',
    solution: `// Business Ideas for Next 5 Years
class FutureBusinessIdeas {
  static getHighPotentialIdeas(): {
    category: string;
    ideas: {
      name: string;
      description: string;
      marketSize: string;
      investment: string;
      timeline: string;
      keySuccessFactors: string[];
    }[];
  }[] {
    return [
      {
        category: 'AI & Automation',
        ideas: [
          {
            name: 'AI-Powered Personal Health Coach',
            description: 'Personalized health and fitness coaching using AI, with real-time monitoring and customized recommendations.',
            marketSize: 'Global: $50B+ by 2028',
            investment: '₹50L - ₹2Cr initial',
            timeline: '2-3 years to profitability',
            keySuccessFactors: [
              'AI/ML expertise',
              'Healthcare partnerships',
              'Data privacy compliance',
              'User engagement metrics'
            ]
          },
          {
            name: 'Automated Content Creation Platform',
            description: 'AI platform that creates marketing content, social media posts, and articles for businesses.',
            marketSize: 'Global: $30B+ by 2027',
            investment: '₹25L - ₹1Cr initial',
            timeline: '1-2 years to break-even',
            keySuccessFactors: [
              'Content quality',
              'Industry-specific templates',
              'SEO optimization',
              'Multi-language support'
            ]
          },
          {
            name: 'Smart Home Energy Management',
            description: 'IoT-based system to optimize home energy consumption and reduce electricity bills.',
            marketSize: 'India: ₹15,000Cr by 2026',
            investment: '₹75L - ₹3Cr initial',
            timeline: '2-3 years to scale',
            keySuccessFactors: [
              'Hardware partnerships',
              'Energy efficiency algorithms',
              'Government subsidies',
              'Consumer education'
            ]
          }
        ]
      },
      {
        category: 'Sustainability & Green Tech',
        ideas: [
          {
            name: 'Eco-Friendly Packaging Solutions',
            description: 'Biodegradable and sustainable packaging alternatives for e-commerce and retail.',
            marketSize: 'Global: $200B+ by 2025',
            investment: '₹1Cr - ₹5Cr initial',
            timeline: '3-4 years to profitability',
            keySuccessFactors: [
              'Material innovation',
              'Cost competitiveness',
              'Supply chain partnerships',
              'Regulatory compliance'
            ]
          },
          {
            name: 'Electric Vehicle Charging Network',
            description: 'Network of fast-charging stations for electric vehicles across cities.',
            marketSize: 'India: ₹25,000Cr by 2027',
            investment: '₹2Cr - ₹10Cr initial',
            timeline: '2-3 years to break-even',
            keySuccessFactors: [
              'Strategic locations',
              'Government partnerships',
              'Technology partnerships',
              'Customer convenience'
            ]
          },
          {
            name: 'Waste-to-Energy Solutions',
            description: 'Converting organic waste into energy using advanced technologies.',
            marketSize: 'India: ₹10,000Cr by 2026',
            investment: '₹5Cr - ₹20Cr initial',
            timeline: '4-5 years to profitability',
            keySuccessFactors: [
              'Technology efficiency',
              'Municipal partnerships',
              'Environmental compliance',
              'Energy pricing'
            ]
          }
        ]
      },
      {
        category: 'Digital Health & Wellness',
        ideas: [
          {
            name: 'Mental Health Tech Platform',
            description: 'Digital platform connecting users with mental health professionals and providing self-help tools.',
            marketSize: 'Global: $100B+ by 2028',
            investment: '₹30L - ₹1.5Cr initial',
            timeline: '2-3 years to profitability',
            keySuccessFactors: [
              'Licensed professionals',
              'Privacy and security',
              'Insurance partnerships',
              'User engagement'
            ]
          },
          {
            name: 'Personalized Nutrition Service',
            description: 'AI-driven nutrition planning based on genetics, lifestyle, and health goals.',
            marketSize: 'Global: $40B+ by 2027',
            investment: '₹50L - ₹2Cr initial',
            timeline: '1-2 years to break-even',
            keySuccessFactors: [
              'Scientific validation',
              'Personalization accuracy',
              'Food delivery partnerships',
              'Health outcome tracking'
            ]
          },
          {
            name: 'Telemedicine for Rural Areas',
            description: 'Healthcare services for rural populations using telemedicine and mobile clinics.',
            marketSize: 'India: ₹5,000Cr by 2026',
            investment: '₹1Cr - ₹5Cr initial',
            timeline: '3-4 years to profitability',
            keySuccessFactors: [
              'Rural infrastructure',
              'Healthcare partnerships',
              'Government support',
              'Affordable pricing'
            ]
          }
        ]
      },
      {
        category: 'Education & EdTech',
        ideas: [
          {
            name: 'Skill-Based Learning Platform',
            description: 'Platform focusing on practical skills needed for emerging job markets.',
            marketSize: 'Global: $300B+ by 2027',
            investment: '₹25L - ₹1Cr initial',
            timeline: '1-2 years to break-even',
            keySuccessFactors: [
              'Industry partnerships',
              'Job placement success',
              'Content quality',
              'Technology platform'
            ]
          },
          {
            name: 'AR/VR Education Solutions',
            description: 'Immersive learning experiences using augmented and virtual reality.',
            marketSize: 'Global: $20B+ by 2026',
            investment: '₹50L - ₹2Cr initial',
            timeline: '2-3 years to profitability',
            keySuccessFactors: [
              'Content development',
              'Hardware partnerships',
              'Educational partnerships',
              'User experience'
            ]
          },
          {
            name: 'Micro-Learning for Professionals',
            description: 'Bite-sized learning modules for busy professionals to upskill.',
            marketSize: 'Global: $50B+ by 2028',
            investment: '₹20L - ₹75L initial',
            timeline: '1-2 years to profitability',
            keySuccessFactors: [
              'Content relevance',
              'Mobile optimization',
              'Corporate partnerships',
              'Learning analytics'
            ]
          }
        ]
      }
    ];
  }
  
  static calculateBusinessMetrics(
    initialInvestment: number,
    monthlyRevenue: number,
    monthlyExpenses: number
  ): {
    breakEvenMonths: number;
    annualRevenue: number;
    annualProfit: number;
    roi: number;
    paybackPeriod: number;
  } {
    const monthlyProfit = monthlyRevenue - monthlyExpenses;
    const breakEvenMonths = initialInvestment / monthlyProfit;
    const annualRevenue = monthlyRevenue * 12;
    const annualProfit = monthlyProfit * 12;
    const roi = (annualProfit / initialInvestment) * 100;
    const paybackPeriod = initialInvestment / annualProfit;
    
    return {
      breakEvenMonths: Math.ceil(breakEvenMonths),
      annualRevenue,
      annualProfit,
      roi,
      paybackPeriod: Math.ceil(paybackPeriod * 12) // in months
    };
  }
  
  static getMarketTrends(): {
    trend: string;
    growthRate: string;
    keyDrivers: string[];
    opportunities: string[];
  }[] {
    return [
      {
        trend: 'Remote Work & Digital Nomadism',
        growthRate: '25% annually',
        keyDrivers: [
          'COVID-19 acceleration',
          'Technology advancement',
          'Work-life balance demand',
          'Cost savings'
        ],
        opportunities: [
          'Remote work tools',
          'Co-living spaces',
          'Digital nomad services',
          'Virtual team management'
        ]
      },
      {
        trend: 'Sustainability & ESG',
        growthRate: '30% annually',
        keyDrivers: [
          'Climate change awareness',
          'Government regulations',
          'Consumer demand',
          'Investor pressure'
        ],
        opportunities: [
          'Green technology',
          'Sustainable products',
          'Carbon offset services',
          'ESG consulting'
        ]
      },
      {
        trend: 'Personalization & AI',
        growthRate: '35% annually',
        keyDrivers: [
          'Data availability',
          'AI advancement',
          'Consumer expectations',
          'Competitive advantage'
        ],
        opportunities: [
          'AI-powered services',
          'Personalized products',
          'Predictive analytics',
          'Custom experiences'
        ]
      }
    ];
  }
}

// Example usage:
const businessIdeas = new FutureBusinessIdeas();
const ideas = businessIdeas.getHighPotentialIdeas();

console.log('High-Potential Business Ideas for Next 5 Years:');
ideas.forEach(category => {
  console.log(\`\\n\${category.category}:\`);
  category.ideas.forEach(idea => {
    console.log(\`\\n\${idea.name}:\`);
    console.log(\`Market Size: \${idea.marketSize}\`);
    console.log(\`Investment: \${idea.investment}\`);
    console.log(\`Timeline: \${idea.timeline}\`);
  });
});

// Calculate business metrics for a sample idea
const metrics = businessIdeas.calculateBusinessMetrics(
  10000000, // 1Cr investment
  500000,   // 5L monthly revenue
  300000    // 3L monthly expenses
);

console.log('\\nBusiness Metrics:');
console.log('Break-even (months):', metrics.breakEvenMonths);
console.log('Annual Revenue:', metrics.annualRevenue.toLocaleString('en-IN'));
console.log('Annual Profit:', metrics.annualProfit.toLocaleString('en-IN'));
console.log('ROI:', metrics.roi.toFixed(2) + '%');
console.log('Payback Period (months):', metrics.paybackPeriod);

// Show market trends
const trends = businessIdeas.getMarketTrends();
console.log('\\nKey Market Trends:');
trends.forEach(trend => {
  console.log(\`\\n\${trend.trend} (\${trend.growthRate}):\`);
  console.log('Opportunities:', trend.opportunities.join(', '));
});`,
    testCases: [
      { 
        input: 'getHighPotentialIdeas().length', 
        output: '4' 
      },
      { 
        input: 'calculateBusinessMetrics(10000000, 500000, 300000).roi', 
        output: '24' 
      }
    ],
    explanation: `This solution provides a comprehensive analysis of business opportunities for the next 5 years:

Key Features:
1. **Multiple Categories**: Covers AI, sustainability, health, and education
2. **Detailed Analysis**: Market size, investment needs, timelines
3. **Success Factors**: Key requirements for each business idea
4. **Financial Metrics**: ROI, break-even, and payback calculations
5. **Market Trends**: Current trends driving these opportunities

Business Ideas Focus:
- **AI & Automation**: Leveraging AI for personalized services
- **Sustainability**: Green tech and eco-friendly solutions
- **Digital Health**: Mental health and wellness platforms
- **Education**: Skill-based and immersive learning

Each idea includes:
- Market size projections
- Investment requirements
- Timeline to profitability
- Key success factors
- Risk considerations

This framework helps entrepreneurs identify and evaluate business opportunities based on market trends, technology advancement, and consumer needs.`
  }
] 