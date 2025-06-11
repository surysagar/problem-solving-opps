import { Problem } from '@/types'

export const recursionProblems: Problem[] = [
  {
    id: '1',
    title: 'Factorial',
    description: 'Calculate the factorial of a number using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function factorial(n: number): number {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}`,
    testCases: [
      {
        input: 'n = 5',
        output: '120'
      },
      {
        input: 'n = 0',
        output: '1'
      }
    ]
  },
  {
    id: '2',
    title: 'Sum of N Natural Numbers',
    description: 'Calculate the sum of first N natural numbers using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function sum(n: number): number {
  if (n === 0) return 0;
  return n + sum(n - 1);
}`,
    testCases: [
      {
        input: 'n = 5',
        output: '15'
      },
      {
        input: 'n = 10',
        output: '55'
      }
    ]
  },
  {
    id: '3',
    title: 'Fibonacci',
    description: 'Calculate the nth Fibonacci number using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
    testCases: [
      {
        input: 'n = 6',
        output: '8'
      },
      {
        input: 'n = 8',
        output: '21'
      }
    ]
  },
  {
    id: '4',
    title: 'Power of a Number',
    description: 'Calculate the power of a number using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function power(base: number, exp: number): number {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}`,
    testCases: [
      {
        input: 'base = 2, exp = 3',
        output: '8'
      },
      {
        input: 'base = 5, exp = 2',
        output: '25'
      }
    ]
  },
  {
    id: '5',
    title: 'Print 1 to N',
    description: 'Print numbers from 1 to N using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function printUp(n: number): void {
  if (n === 0) return;
  printUp(n - 1);
  console.log(n);
}`,
    testCases: [
      {
        input: 'n = 5',
        output: '1 2 3 4 5'
      },
      {
        input: 'n = 3',
        output: '1 2 3'
      }
    ]
  },
  {
    id: '6',
    title: 'Print N to 1',
    description: 'Print numbers from N to 1 using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function printDown(n: number): void {
  if (n === 0) return;
  console.log(n);
  printDown(n - 1);
}`,
    testCases: [
      {
        input: 'n = 5',
        output: '5 4 3 2 1'
      },
      {
        input: 'n = 3',
        output: '3 2 1'
      }
    ]
  },
  {
    id: '7',
    title: 'Array Palindrome',
    description: 'Check if an array is palindrome using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function isPalindrome(arr: number[], start: number = 0, end: number = arr.length - 1): boolean {
  if (start >= end) return true;
  if (arr[start] !== arr[end]) return false;
  return isPalindrome(arr, start + 1, end - 1);
}`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 2, 1]',
        output: 'true'
      },
      {
        input: 'arr = [1, 2, 3, 4]',
        output: 'false'
      }
    ]
  },
  {
    id: '8',
    title: 'Find Max in Array',
    description: 'Find maximum element in array using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function findMax(arr: number[], i: number = 0): number {
  if (i === arr.length - 1) return arr[i];
  return Math.max(arr[i], findMax(arr, i + 1));
}`,
    testCases: [
      {
        input: 'arr = [1, 6, 2, 9, 4]',
        output: '9'
      },
      {
        input: 'arr = [5, 2, 8, 1]',
        output: '8'
      }
    ]
  },
  {
    id: '9',
    title: 'Reverse String',
    description: 'Reverse a string using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function reverse(str: string): string {
  if (str === "") return "";
  return reverse(str.slice(1)) + str[0];
}`,
    testCases: [
      {
        input: 'str = "hello"',
        output: 'olleh'
      },
      {
        input: 'str = "world"',
        output: 'dlrow'
      }
    ]
  },
  {
    id: '10',
    title: 'Sum of Digits',
    description: 'Calculate sum of digits in a number using recursion',
    difficulty: 'Easy',
    category: 'recursion',
    solution: `function sumDigits(n: number): number {
  if (n === 0) return 0;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}`,
    testCases: [
      {
        input: 'n = 123',
        output: '6'
      },
      {
        input: 'n = 456',
        output: '15'
      }
    ]
  },
  {
    id: '11',
    title: 'Binary Search',
    description: 'Implement binary search using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function binarySearch(arr: number[], target: number, left: number = 0, right: number = arr.length - 1): number {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  return arr[mid] > target
    ? binarySearch(arr, target, left, mid - 1)
    : binarySearch(arr, target, mid + 1, right);
}`,
    testCases: [
      {
        input: 'arr = [1, 2, 4, 5, 8], target = 5',
        output: '3'
      },
      {
        input: 'arr = [1, 2, 4, 5, 8], target = 3',
        output: '-1'
      }
    ]
  },
  {
    id: '12',
    title: 'First Index of Target',
    description: 'Find first index of target in array using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function firstIndex(arr: number[], target: number, i: number = 0): number {
  if (i === arr.length) return -1;
  if (arr[i] === target) return i;
  return firstIndex(arr, target, i + 1);
}`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 3], target = 3',
        output: '2'
      },
      {
        input: 'arr = [1, 2, 3, 4], target = 5',
        output: '-1'
      }
    ]
  },
  {
    id: '13',
    title: 'Flatten Array',
    description: 'Flatten a nested array using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function flatten(arr: any[]): number[] {
  return arr.reduce((acc: number[], val: any) =>
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}`,
    testCases: [
      {
        input: 'arr = [1, [2, [3, 4]], 5]',
        output: '[1, 2, 3, 4, 5]'
      },
      {
        input: 'arr = [1, [2, 3], [4, [5, 6]]]',
        output: '[1, 2, 3, 4, 5, 6]'
      }
    ]
  },
  {
    id: '14',
    title: 'String Permutations',
    description: 'Generate all permutations of a string using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function permutations(str: string, prefix: string = ""): string[] {
  if (str.length === 0) return [prefix];
  const result: string[] = [];
  for (let i = 0; i < str.length; i++) {
    const newPrefix = prefix + str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    result.push(...permutations(remaining, newPrefix));
  }
  return result;
}`,
    testCases: [
      {
        input: 'str = "abc"',
        output: '["abc", "acb", "bac", "bca", "cab", "cba"]'
      },
      {
        input: 'str = "ab"',
        output: '["ab", "ba"]'
      }
    ]
  },
  {
    id: '15',
    title: 'String Palindrome',
    description: 'Check if a string is palindrome using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function isPalin(str: string): boolean {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalin(str.slice(1, -1));
}`,
    testCases: [
      {
        input: 'str = "racecar"',
        output: 'true'
      },
      {
        input: 'str = "hello"',
        output: 'false'
      }
    ]
  },
  {
    id: '16',
    title: 'Recursive Map',
    description: 'Implement map function using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function recursiveMap<T, U>(arr: T[], fn: (x: T) => U, i: number = 0): U[] {
  if (i === arr.length) return [];
  return [fn(arr[i])].concat(recursiveMap(arr, fn, i + 1));
}`,
    testCases: [
      {
        input: 'arr = [1, 2, 3], fn = x => x * 2',
        output: '[2, 4, 6]'
      },
      {
        input: 'arr = [1, 2, 3], fn = x => x.toString()',
        output: '["1", "2", "3"]'
      }
    ]
  },
  {
    id: '17',
    title: 'All Subsets',
    description: 'Generate all subsets of an array using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function subsets<T>(arr: T[], i: number = 0, curr: T[] = []): T[][] {
  if (i === arr.length) return [curr];
  return [
    ...subsets(arr, i + 1, curr),
    ...subsets(arr, i + 1, [...curr, arr[i]])
  ];
}`,
    testCases: [
      {
        input: 'arr = [1, 2]',
        output: '[[], [2], [1], [1, 2]]'
      },
      {
        input: 'arr = [1]',
        output: '[[], [1]]'
      }
    ]
  },
  {
    id: '18',
    title: 'Climb Stairs',
    description: 'Count ways to climb n stairs (1 or 2 steps) using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function climbStairs(n: number): number {
  if (n <= 1) return 1;
  return climbStairs(n - 1) + climbStairs(n - 2);
}`,
    testCases: [
      {
        input: 'n = 4',
        output: '5'
      },
      {
        input: 'n = 3',
        output: '3'
      }
    ]
  },
  {
    id: '19',
    title: 'Count Zeros',
    description: 'Count number of zeros in a number using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function countZeros(n: number): number {
  if (n === 0) return 1;
  if (n < 10) return n === 0 ? 1 : 0;
  return (n % 10 === 0 ? 1 : 0) + countZeros(Math.floor(n / 10));
}`,
    testCases: [
      {
        input: 'n = 102030',
        output: '3'
      },
      {
        input: 'n = 1000',
        output: '3'
      }
    ]
  },
  {
    id: '20',
    title: 'GCD',
    description: 'Calculate Greatest Common Divisor using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}`,
    testCases: [
      {
        input: 'a = 24, b = 36',
        output: '12'
      },
      {
        input: 'a = 54, b = 24',
        output: '6'
      }
    ]
  },
  {
    id: '21',
    title: 'N-Queens',
    description: 'Solve the N-Queens problem using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));
  
  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
      if (col - row + i >= 0 && board[i][col - row + i] === 'Q') return false;
      if (col + row - i < n && board[i][col + row - i] === 'Q') return false;
    }
    return true;
  }
  
  function place(row: number) {
    if (row === n) {
      result.push(board.map(row => row.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        place(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  place(0);
  return result;
}`,
    testCases: [
      {
        input: 'n = 4',
        output: '[".Q..","...Q","Q...","..Q."]'
      },
      {
        input: 'n = 1',
        output: '["Q"]'
      }
    ]
  },
  {
    id: '22',
    title: 'Sudoku Solver',
    description: 'Solve a Sudoku puzzle using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function solveSudoku(board: string[][]): boolean {
  function isValid(row: number, col: number, num: string): boolean {
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num ||
          board[boxRow + Math.floor(i / 3)][boxCol + i % 3] === num) return false;
    }
    return true;
  }
  
  function solve(): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          for (let num = 1; num <= 9; num++) {
            const numStr = num.toString();
            if (isValid(r, c, numStr)) {
              board[r][c] = numStr;
              if (solve()) return true;
              board[r][c] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  return solve();
}`,
    testCases: [
      {
        input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: 'true'
      }
    ]
  },
  {
    id: '23',
    title: 'Maze Paths',
    description: 'Find all paths in a maze using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function mazePaths(maze: number[][], x: number = 0, y: number = 0, path: string = ""): string[] {
  const n = maze.length;
  const result: string[] = [];
  
  if (x < 0 || y < 0 || x >= n || y >= n || maze[x][y] === 0) return result;
  if (x === n - 1 && y === n - 1) {
    result.push(path);
    return result;
  }
  
  maze[x][y] = 0; // mark visited
  result.push(...mazePaths(maze, x + 1, y, path + 'D'));
  result.push(...mazePaths(maze, x - 1, y, path + 'U'));
  result.push(...mazePaths(maze, x, y + 1, path + 'R'));
  result.push(...mazePaths(maze, x, y - 1, path + 'L'));
  maze[x][y] = 1; // unmark
  
  return result;
}`,
    testCases: [
      {
        input: 'maze = [[1, 0, 0], [1, 1, 0], [0, 1, 1]]',
        output: '["DRDR"]'
      },
      {
        input: 'maze = [[1, 1], [1, 1]]',
        output: '["DR", "RD"]'
      }
    ]
  },
  {
    id: '24',
    title: 'Valid Parentheses Generator',
    description: 'Generate all valid parentheses combinations using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function generateParens(n: number): string[] {
  const result: string[] = [];
  
  function generate(open: number, close: number, str: string) {
    if (open === n && close === n) {
      result.push(str);
      return;
    }
    if (open < n) generate(open + 1, close, str + "(");
    if (close < open) generate(open, close + 1, str + ")");
  }
  
  generate(0, 0, "");
  return result;
}`,
    testCases: [
      {
        input: 'n = 3',
        output: '["((()))", "(()())", "(())()", "()(())", "()()()"]'
      },
      {
        input: 'n = 1',
        output: '["()"]'
      }
    ]
  },
  {
    id: '25',
    title: 'Word Break',
    description: 'Check if a string can be segmented into dictionary words using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function wordBreak(s: string, wordDict: string[]): boolean {
  const memo = new Map<string, boolean>();
  
  function canBreak(str: string): boolean {
    if (str === "") return true;
    if (memo.has(str)) return memo.get(str)!;
    
    for (const word of wordDict) {
      if (str.startsWith(word)) {
        if (canBreak(str.slice(word.length))) {
          memo.set(str, true);
          return true;
        }
      }
    }
    
    memo.set(str, false);
    return false;
  }
  
  return canBreak(s);
}`,
    testCases: [
      {
        input: 's = "leetcode", wordDict = ["leet", "code"]',
        output: 'true'
      },
      {
        input: 's = "applepenapple", wordDict = ["apple", "pen"]',
        output: 'true'
      }
    ]
  },
  {
    id: '26',
    title: 'Combination Sum',
    description: 'Find all combinations that sum up to target using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  
  function backtrack(start: number, sum: number, path: number[]) {
    if (sum > target) return;
    if (sum === target) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(i, sum + candidates[i], path);
      path.pop();
    }
  }
  
  backtrack(0, 0, []);
  return result;
}`,
    testCases: [
      {
        input: 'candidates = [2,3,6,7], target = 7',
        output: '[[2,2,3],[7]]'
      },
      {
        input: 'candidates = [2,3,5], target = 8',
        output: '[[2,2,2,2],[2,3,3],[3,5]]'
      }
    ]
  },
  {
    id: '27',
    title: 'Power Set',
    description: 'Generate all possible subsets of a set using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function powerSet<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  
  function generate(i: number, curr: T[]) {
    if (i === arr.length) {
      result.push([...curr]);
      return;
    }
    generate(i + 1, curr);
    curr.push(arr[i]);
    generate(i + 1, curr);
    curr.pop();
  }
  
  generate(0, []);
  return result;
}`,
    testCases: [
      {
        input: 'arr = [1, 2]',
        output: '[[], [2], [1], [1, 2]]'
      },
      {
        input: 'arr = [1, 2, 3]',
        output: '[[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]'
      }
    ]
  },
  {
    id: '28',
    title: 'Tower of Hanoi',
    description: 'Solve Tower of Hanoi puzzle using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function hanoi(n: number, from: string, to: string, aux: string): string[] {
  const moves: string[] = [];
  
  function move(n: number, from: string, to: string, aux: string) {
    if (n === 1) {
      moves.push(\`Move disk 1 from \${from} to \${to}\`);
      return;
    }
    move(n - 1, from, aux, to);
    moves.push(\`Move disk \${n} from \${from} to \${to}\`);
    move(n - 1, aux, to, from);
  }
  
  move(n, from, to, aux);
  return moves;
}`,
    testCases: [
      {
        input: 'n = 3, from = "A", to = "C", aux = "B"',
        output: '["Move disk 1 from A to C", "Move disk 2 from A to B", "Move disk 1 from C to B", "Move disk 3 from A to C", "Move disk 1 from B to A", "Move disk 2 from B to C", "Move disk 1 from A to C"]'
      }
    ]
  },
  {
    id: '29',
    title: 'Count Islands',
    description: 'Count number of islands in a grid using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function numIslands(grid: string[][]): number {
  let count = 0;
  const n = grid.length;
  const m = grid[0].length;
  
  function dfs(i: number, j: number) {
    if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  
  return count;
}`,
    testCases: [
      {
        input: 'grid = [["1","1","0","0"],["1","0","0","1"],["0","0","1","1"]]',
        output: '3'
      },
      {
        input: 'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]',
        output: '1'
      }
    ]
  },
  {
    id: '30',
    title: 'Serialize/Deserialize Tree',
    description: 'Serialize and deserialize a binary tree using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function serialize(root: TreeNode | null): string {
  if (!root) return 'null';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data: string): TreeNode | null {
  const nodes = data.split(',');
  
  function build(): TreeNode | null {
    const val = nodes.shift();
    if (val === 'null') return null;
    const node = new TreeNode(parseInt(val!));
    node.left = build();
    node.right = build();
    return node;
  }
  
  return build();
}`,
    testCases: [
      {
        input: 'root = [1,2,3,null,null,4,5]',
        output: '[1,2,3,null,null,4,5]'
      }
    ]
  },
  {
    id: '31',
    title: 'Array Permutations',
    description: 'Generate all permutations of an array using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function permute<T>(nums: T[]): T[][] {
  const result: T[][] = [];
  
  function backtrack(start: number) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }
  
  backtrack(0);
  return result;
}`,
    testCases: [
      {
        input: 'nums = [1, 2, 3]',
        output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]]'
      }
    ]
  },
  {
    id: '32',
    title: 'Generate Binary Numbers',
    description: 'Generate all binary numbers of length n using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function generateBinary(n: number): string[] {
  const result: string[] = [];
  
  function generate(curr: string) {
    if (curr.length === n) {
      result.push(curr);
      return;
    }
    generate(curr + '0');
    generate(curr + '1');
  }
  
  generate('');
  return result;
}`,
    testCases: [
      {
        input: 'n = 3',
        output: '["000", "001", "010", "011", "100", "101", "110", "111"]'
      }
    ]
  },
  {
    id: '33',
    title: 'Kth Smallest in BST',
    description: 'Find kth smallest element in BST using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function kthSmallest(root: TreeNode | null, k: number): number {
  let count = 0;
  let result = 0;
  
  function inorder(node: TreeNode | null) {
    if (!node) return;
    inorder(node.left);
    count++;
    if (count === k) {
      result = node.val;
      return;
    }
    inorder(node.right);
  }
  
  inorder(root);
  return result;
}`,
    testCases: [
      {
        input: 'root = [3,1,4,null,2], k = 1',
        output: '1'
      }
    ]
  },
  {
    id: '34',
    title: 'Decimal to Binary',
    description: 'Convert decimal number to binary using recursion',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function decToBin(n: number): string {
  if (n === 0) return '';
  return decToBin(Math.floor(n / 2)) + (n % 2);
}`,
    testCases: [
      {
        input: 'n = 10',
        output: '1010'
      },
      {
        input: 'n = 7',
        output: '111'
      }
    ]
  },
  {
    id: '35',
    title: 'Deep Clone',
    description: 'Create a deep clone of an object using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function deepClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) return obj;
  const clone = Array.isArray(obj) ? [] : {} as T;
  for (let key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}`,
    testCases: [
      {
        input: 'obj = {a: 1, b: {c: 2}}',
        output: '{a: 1, b: {c: 2}}'
      }
    ]
  },
  {
    id: '36',
    title: 'Recursive File Search',
    description: 'Search for a file in a nested file structure using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

function searchFiles(root: FileNode, target: string): string | null {
  if (root.type === 'file' && root.name === target) {
    return root.name;
  }
  if (root.type === 'directory' && root.children) {
    for (const child of root.children) {
      const result = searchFiles(child, target);
      if (result) return result;
    }
  }
  return null;
}`,
    testCases: [
      {
        input: 'root = {name: "root", type: "directory", children: [{name: "file1.txt", type: "file"}, {name: "dir1", type: "directory", children: [{name: "file2.txt", type: "file"}]}]}, target = "file2.txt"',
        output: 'file2.txt'
      }
    ]
  },
  {
    id: '37',
    title: 'Memoized Fibonacci',
    description: 'Calculate Fibonacci numbers using recursion with memoization',
    difficulty: 'Medium',
    category: 'recursion',
    solution: `function fib(n: number, memo: Record<number, number> = {}): number {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
    testCases: [
      {
        input: 'n = 50',
        output: '12586269025'
      }
    ]
  },
  {
    id: '38',
    title: 'Longest Common Subsequence',
    description: 'Find longest common subsequence of two strings using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function lcs(s1: string, s2: string): number {
  const memo = new Map<string, number>();
  
  function findLCS(i: number, j: number): number {
    const key = \`\${i},\${j}\`;
    if (memo.has(key)) return memo.get(key)!;
    if (i === s1.length || j === s2.length) return 0;
    
    if (s1[i] === s2[j]) {
      memo.set(key, 1 + findLCS(i + 1, j + 1));
    } else {
      memo.set(key, Math.max(findLCS(i + 1, j), findLCS(i, j + 1)));
    }
    
    return memo.get(key)!;
  }
  
  return findLCS(0, 0);
}`,
    testCases: [
      {
        input: 's1 = "abcde", s2 = "ace"',
        output: '3'
      }
    ]
  },
  {
    id: '39',
    title: 'Crossword Fill',
    description: 'Fill a crossword grid with words using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function fillWords(grid: string[][], words: string[]): boolean {
  function canPlace(word: string, row: number, col: number, horizontal: boolean): boolean {
    if (horizontal) {
      if (col + word.length > grid[0].length) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== '-' && grid[row][col + i] !== word[i]) return false;
      }
    } else {
      if (row + word.length > grid.length) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== '-' && grid[row + i][col] !== word[i]) return false;
      }
    }
    return true;
  }
  
  function placeWord(word: string, row: number, col: number, horizontal: boolean): void {
    if (horizontal) {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = word[i];
      }
    }
  }
  
  function solve(index: number): boolean {
    if (index === words.length) return true;
    
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (canPlace(words[index], i, j, true)) {
          const temp = grid[i].slice(j, j + words[index].length);
          placeWord(words[index], i, j, true);
          if (solve(index + 1)) return true;
          for (let k = 0; k < words[index].length; k++) {
            grid[i][j + k] = temp[k];
          }
        }
        if (canPlace(words[index], i, j, false)) {
          const temp = grid.map(row => row[j]).slice(i, i + words[index].length);
          placeWord(words[index], i, j, false);
          if (solve(index + 1)) return true;
          for (let k = 0; k < words[index].length; k++) {
            grid[i + k][j] = temp[k];
          }
        }
      }
    }
    return false;
  }
  
  return solve(0);
}`,
    testCases: [
      {
        input: 'grid = [["-","-","-"],["-","-","-"],["-","-","-"]], words = ["cat", "dog"]',
        output: 'true'
      }
    ]
  },
  {
    id: '40',
    title: 'Evaluate Postfix',
    description: 'Evaluate postfix expression using recursion',
    difficulty: 'Hard',
    category: 'recursion',
    solution: `function evalPostfix(expr: string): number {
  const stack: number[] = [];
  
  function evaluate(tokens: string[]): number {
    if (tokens.length === 0) return stack[0];
    const token = tokens.shift()!;
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.floor(a / b)); break;
      }
    }
    return evaluate(tokens);
  }
  
  return evaluate(expr.split(' '));
}`,
    testCases: [
      {
        input: 'expr = "2 3 1 * + 9 -"',
        output: '-4'
      }
    ]
  }
] 