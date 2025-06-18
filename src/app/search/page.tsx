'use client'

import { problems } from '@/lib/problems';
import { useSearchParams } from 'next/navigation';

function getAllProblems() {
  // Flatten all problems from all categories
  return Object.values(problems).flat();
}

function getProblemText(problem: any) {
  if ('question' in problem) {
    return problem.question;
  }
  return `${problem.title} ${problem.description} ${problem.solution}`;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const allProblems = getAllProblems();
  const results = query
    ? allProblems.filter(
        p => getProblemText(p).toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p className="text-muted-foreground">No results found.</p>
      ) : (
        <div className="space-y-4">
          {results.map(problem => (
            <div key={problem.id} className="border rounded p-4 bg-muted">
              <h3 className="font-semibold text-lg mb-1">{problem.title}</h3>
              {'question' in problem ? (
                <p className="text-sm text-muted-foreground mb-2">{problem.question}</p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-2">{problem.description}</p>
                  <pre className="bg-background p-2 rounded text-xs overflow-x-auto mb-2">{problem.solution}</pre>
                </>
              )}
              <span className="text-xs text-muted-foreground">Category: {problem.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 