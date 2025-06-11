import { Problem } from '@/types'

export const graphsProblems: Problem[] = [
  {
    id: 'graphs-1',
    title: 'Breadth-First Search',
    description: `Implement breadth-first search for a graph.`,
    difficulty: 'Medium',
    solution: `function bfs(graph: Map<number, number[]>, start: number): number[] {
  const visited = new Set<number>();
  const queue: number[] = [start];
  const result: number[] = [];
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      queue.push(...graph.get(node) || []);
    }
  }
  
  return result;
}`,
    testCases: [
      {
        input: 'graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}, start = 2',
        output: '[2, 0, 3, 1]'
      }
    ]
  }
] 