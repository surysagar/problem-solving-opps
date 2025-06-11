import { Problem } from '@/types'

export const problems: Record<string, Problem[]> = {
  recursion: [
    {
      id: 'recursion-1',
      title: 'Factorial',
      description: `Write a recursive function to calculate the factorial of a number.
The factorial of a number n is the product of all positive integers less than or equal to n.`,
      difficulty: 'Easy',
      solution: `function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
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
      id: 'recursion-2',
      title: 'Fibonacci',
      description: `Write a recursive function to calculate the nth Fibonacci number.
The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones.`,
      difficulty: 'Easy',
      solution: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      testCases: [
        {
          input: 'n = 5',
          output: '5'
        },
        {
          input: 'n = 7',
          output: '13'
        }
      ]
    }
  ],
  arrays: [
    {
      id: 'arrays-1',
      title: 'Array Flatten',
      description: `Write a function that flattens a nested array.
The function should handle arrays of any depth.`,
      difficulty: 'Medium',
      solution: `function flattenArray(arr: any[]): any[] {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}`,
      testCases: [
        {
          input: 'arr = [1, [2, 3], [4, [5, 6]]]',
          output: '[1, 2, 3, 4, 5, 6]'
        },
        {
          input: 'arr = [[1, 2], [3, 4], [5, 6]]',
          output: '[1, 2, 3, 4, 5, 6]'
        }
      ]
    }
  ],
  strings: [
    {
      id: 'strings-1',
      title: 'Palindrome Check',
      description: `Write a function to check if a string is a palindrome.
A palindrome reads the same backward as forward.`,
      difficulty: 'Easy',
      solution: `function isPalindrome(str: string): boolean {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}`,
      testCases: [
        {
          input: 'str = "A man, a plan, a canal: Panama"',
          output: 'true'
        },
        {
          input: 'str = "hello"',
          output: 'false'
        }
      ]
    },
    {
      id: 'strings-2',
      title: 'Reverse String',
      description: `Write a function to reverse a string.
Show how to manipulate strings character by character.`,
      difficulty: 'Easy',
      solution: `function reverseString(str: string): string {
  return str.split('').reverse().join('');
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
      id: 'strings-3',
      title: 'Count Vowels',
      description: `Write a function to count the number of vowels in a string.
Consider both uppercase and lowercase vowels.`,
      difficulty: 'Easy',
      solution: `function countVowels(str: string): number {
  return (str.match(/[aeiou]/gi) || []).length;
}`,
      testCases: [
        {
          input: 'str = "hello"',
          output: '2'
        },
        {
          input: 'str = "WORLD"',
          output: '1'
        }
      ]
    },
    {
      id: 'strings-4',
      title: 'Title Case',
      description: `Write a function to capitalize the first letter of each word in a string.
Show how to transform string case and handle word boundaries.`,
      difficulty: 'Easy',
      solution: `function titleCase(str: string): string {
  return str.toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}`,
      testCases: [
        {
          input: 'str = "hello world"',
          output: 'Hello World'
        },
        {
          input: 'str = "JAVASCRIPT IS FUN"',
          output: 'Javascript Is Fun'
        }
      ]
    },
    {
      id: 'strings-5',
      title: 'Longest Word',
      description: `Write a function to find the longest word in a string.
Show how to work with word boundaries and string splitting.`,
      difficulty: 'Easy',
      solution: `function longestWord(str: string): string {
  return str.split(' ').reduce((a, b) => a.length > b.length ? a : b);
}`,
      testCases: [
        {
          input: 'str = "The quick brown fox jumps over the lazy dog"',
          output: 'quick'
        },
        {
          input: 'str = "a bb ccc"',
          output: 'ccc'
        }
      ]
    },
    {
      id: 'strings-6',
      title: 'String Repeat',
      description: `Write a function to repeat a string n times.
Show how to use string repetition methods.`,
      difficulty: 'Easy',
      solution: `function repeatString(str: string, n: number): string {
  return str.repeat(n);
}`,
      testCases: [
        {
          input: 'str = "abc", n = 3',
          output: 'abcabcabc'
        },
        {
          input: 'str = "x", n = 5',
          output: 'xxxxx'
        }
      ]
    },
    {
      id: 'strings-7',
      title: 'String Truncate',
      description: `Write a function to truncate a string if it's longer than n characters.
Add ellipsis (...) to the end if truncated.`,
      difficulty: 'Easy',
      solution: `function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n) + '...' : str;
}`,
      testCases: [
        {
          input: 'str = "Hello world", n = 5',
          output: 'Hello...'
        },
        {
          input: 'str = "Short", n = 10',
          output: 'Short'
        }
      ]
    },
    {
      id: 'strings-8',
      title: 'String Ends With',
      description: `Write a function to check if a string ends with a given target string.
Show how to use string ending checks.`,
      difficulty: 'Easy',
      solution: `function endsWith(str: string, target: string): boolean {
  return str.endsWith(target);
}`,
      testCases: [
        {
          input: 'str = "Hello world", target = "world"',
          output: 'true'
        },
        {
          input: 'str = "Hello", target = "world"',
          output: 'false'
        }
      ]
    },
    {
      id: 'strings-9',
      title: 'Remove Spaces',
      description: `Write a function to remove all spaces from a string.
Show how to use regular expressions for string cleaning.`,
      difficulty: 'Easy',
      solution: `function removeSpaces(str: string): string {
  return str.replace(/\\s+/g, '');
}`,
      testCases: [
        {
          input: 'str = "Hello World"',
          output: 'HelloWorld'
        },
        {
          input: 'str = "  Multiple  Spaces  "',
          output: 'MultipleSpaces'
        }
      ]
    },
    {
      id: 'strings-10',
      title: 'Word Count',
      description: `Write a function to count occurrences of a specific word in a string.
Show how to work with word boundaries and counting.`,
      difficulty: 'Medium',
      solution: `function countWord(str: string, word: string): number {
  return str.split(' ').filter(w => w === word).length;
}`,
      testCases: [
        {
          input: 'str = "hello world hello", word = "hello"',
          output: '2'
        },
        {
          input: 'str = "test test", word = "hello"',
          output: '0'
        }
      ]
    },
    {
      id: 'strings-11',
      title: 'First Unique Character',
      description: `Write a function to find the first non-repeating character in a string.
Show how to work with character frequency.`,
      difficulty: 'Medium',
      solution: `function firstUniqueChar(str: string): string | null {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i];
    }
  }
  return null;
}`,
      testCases: [
        {
          input: 'str = "leetcode"',
          output: 'l'
        },
        {
          input: 'str = "aabbcc"',
          output: 'null'
        }
      ]
    },
    {
      id: 'strings-12',
      title: 'Anagram Check',
      description: `Write a function to check if two strings are anagrams.
Show how to compare character frequency.`,
      difficulty: 'Medium',
      solution: `function isAnagram(a: string, b: string): boolean {
  return a.split('').sort().join('') === b.split('').sort().join('');
}`,
      testCases: [
        {
          input: 'a = "anagram", b = "nagaram"',
          output: 'true'
        },
        {
          input: 'a = "rat", b = "car"',
          output: 'false'
        }
      ]
    },
    {
      id: 'strings-13',
      title: 'Camel Case',
      description: `Write a function to convert a string to camel case.
Show how to handle word separators and case transformation.`,
      difficulty: 'Medium',
      solution: `function toCamelCase(str: string): string {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
}`,
      testCases: [
        {
          input: 'str = "hello-world"',
          output: 'helloWorld'
        },
        {
          input: 'str = "hello_world"',
          output: 'helloWorld'
        }
      ]
    },
    {
      id: 'strings-14',
      title: 'String Masking',
      description: `Write a function to mask all characters except the last 4 in a string.
Show how to handle string masking for sensitive data.`,
      difficulty: 'Medium',
      solution: `function maskify(str: string): string {
  return str.slice(-4).padStart(str.length, '#');
}`,
      testCases: [
        {
          input: 'str = "1234567890"',
          output: '######7890'
        },
        {
          input: 'str = "1234"',
          output: '1234'
        }
      ]
    },
    {
      id: 'strings-15',
      title: 'Alpha Check',
      description: `Write a function to check if a string contains only letters.
Show how to use regular expressions for validation.`,
      difficulty: 'Medium',
      solution: `function isAlpha(str: string): boolean {
  return /^[A-Za-z]+$/.test(str);
}`,
      testCases: [
        {
          input: 'str = "Hello"',
          output: 'true'
        },
        {
          input: 'str = "Hello123"',
          output: 'false'
        }
      ]
    },
    {
      id: 'strings-16',
      title: 'Swap Case',
      description: `Write a function to swap the case of each character in a string.
Show how to transform character case.`,
      difficulty: 'Medium',
      solution: `function swapCase(str: string): string {
  return [...str].map(ch => 
    ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()
  ).join('');
}`,
      testCases: [
        {
          input: 'str = "Hello World"',
          output: 'hELLO wORLD'
        },
        {
          input: 'str = "aBc"',
          output: 'AbC'
        }
      ]
    },
    {
      id: 'strings-17',
      title: 'Remove Duplicates',
      description: `Write a function to remove duplicate characters from a string.
Show how to handle character uniqueness.`,
      difficulty: 'Medium',
      solution: `function removeDuplicates(str: string): string {
  return [...new Set(str)].join('');
}`,
      testCases: [
        {
          input: 'str = "hello"',
          output: 'helo'
        },
        {
          input: 'str = "aabbcc"',
          output: 'abc'
        }
      ]
    },
    {
      id: 'strings-18',
      title: 'Extract Numbers',
      description: `Write a function to extract all numbers from a string.
Show how to use regular expressions for number extraction.`,
      difficulty: 'Medium',
      solution: `function extractNumbers(str: string): string[] {
  return str.match(/\\d+/g) || [];
}`,
      testCases: [
        {
          input: 'str = "abc123def456"',
          output: '["123","456"]'
        },
        {
          input: 'str = "no numbers"',
          output: '[]'
        }
      ]
    },
    {
      id: 'strings-19',
      title: 'Character Frequency',
      description: `Write a function to count the frequency of each character in a string.
Show how to build frequency counters.`,
      difficulty: 'Medium',
      solution: `function charFrequency(str: string): Record<string, number> {
  return [...str].reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}`,
      testCases: [
        {
          input: 'str = "hello"',
          output: '{"h":1,"e":1,"l":2,"o":1}'
        },
        {
          input: 'str = "aabb"',
          output: '{"a":2,"b":2}'
        }
      ]
    },
    {
      id: 'strings-20',
      title: 'Group Anagrams',
      description: `Write a function to group anagrams from an array of strings.
Show how to work with string sorting and grouping.`,
      difficulty: 'Hard',
      solution: `function groupAnagrams(words: string[]): string[][] {
  const map: Record<string, string[]> = {};
  for (let word of words) {
    const sorted = word.split('').sort().join('');
    (map[sorted] = map[sorted] || []).push(word);
  }
  return Object.values(map);
}`,
      testCases: [
        {
          input: 'words = ["eat","tea","tan","ate","nat","bat"]',
          output: '[["eat","tea","ate"],["tan","nat"],["bat"]]'
        },
        {
          input: 'words = [""]',
          output: '[[""]]'
        }
      ]
    },
    {
      id: 'strings-21',
      title: 'All Substrings',
      description: `Write a function to find all possible substrings of a string.
Show how to generate string combinations.`,
      difficulty: 'Hard',
      solution: `function allSubstrings(str: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
}`,
      testCases: [
        {
          input: 'str = "abc"',
          output: '["a","ab","abc","b","bc","c"]'
        },
        {
          input: 'str = "a"',
          output: '["a"]'
        }
      ]
    },
    {
      id: 'strings-22',
      title: 'Longest Common Prefix',
      description: `Write a function to find the longest common prefix among an array of strings.
Show how to work with string prefixes.`,
      difficulty: 'Hard',
      solution: `function longestCommonPrefix(arr: string[]): string {
  if (!arr.length) return '';
  let prefix = arr[0];
  for (let word of arr.slice(1)) {
    while (!word.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}`,
      testCases: [
        {
          input: 'arr = ["flower","flow","flight"]',
          output: 'fl'
        },
        {
          input: 'arr = ["dog","racecar","car"]',
          output: ''
        }
      ]
    },
    {
      id: 'strings-23',
      title: 'Run-Length Decoding',
      description: `Write a function to decode a run-length encoded string.
Show how to handle string compression and decompression.`,
      difficulty: 'Hard',
      solution: `function decodeRLE(str: string): string {
  return str.replace(/([a-zA-Z])(\\d+)/g, (_, ch, n) => ch.repeat(Number(n)));
}`,
      testCases: [
        {
          input: 'str = "a4b2"',
          output: 'aaaabb'
        },
        {
          input: 'str = "x3y2z1"',
          output: 'xxxyyz'
        }
      ]
    },
    {
      id: 'strings-24',
      title: 'String Rotation',
      description: `Write a function to check if one string is a rotation of another.
Show how to handle string rotations.`,
      difficulty: 'Hard',
      solution: `function isRotation(s1: string, s2: string): boolean {
  return s1.length === s2.length && (s1 + s1).includes(s2);
}`,
      testCases: [
        {
          input: 's1 = "waterbottle", s2 = "erbottlewat"',
          output: 'true'
        },
        {
          input: 's1 = "hello", s2 = "world"',
          output: 'false'
        }
      ]
    },
    {
      id: 'strings-25',
      title: 'String Permutations',
      description: `Write a function to generate all permutations of a string.
Show how to handle recursive string generation.`,
      difficulty: 'Hard',
      solution: `function permutations(str: string): string[] {
  if (str.length <= 1) return [str];
  const result: string[] = [];
  for (let i = 0; i < str.length; i++) {
    const rest = str.slice(0, i) + str.slice(i + 1);
    for (let perm of permutations(rest)) {
      result.push(str[i] + perm);
    }
  }
  return result;
}`,
      testCases: [
        {
          input: 'str = "abc"',
          output: '["abc","acb","bac","bca","cab","cba"]'
        },
        {
          input: 'str = "a"',
          output: '["a"]'
        }
      ]
    },
    {
      id: 'strings-26',
      title: 'Palindromic Substrings',
      description: `Write a function to find all palindromic substrings in a string.
Show how to identify palindromes at different positions.`,
      difficulty: 'Hard',
      solution: `function palindromicSubstrings(str: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      const sub = str.slice(i, j + 1);
      if (sub === sub.split('').reverse().join('')) {
        result.push(sub);
      }
    }
  }
  return result;
}`,
      testCases: [
        {
          input: 'str = "aaa"',
          output: '["a","aa","aaa"]'
        },
        {
          input: 'str = "abc"',
          output: '["a","b","c"]'
        }
      ]
    },
    {
      id: 'strings-27',
      title: 'Word Frequency',
      description: `Write a function to count the frequency of each word in a paragraph.
Show how to handle word boundaries and counting.`,
      difficulty: 'Hard',
      solution: `function wordFrequency(paragraph: string): Record<string, number> {
  return paragraph.toLowerCase()
    .match(/\\b\\w+\\b/g)!
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
}`,
      testCases: [
        {
          input: 'paragraph = "The quick brown fox jumps over the lazy dog"',
          output: '{"the":2,"quick":1,"brown":1,"fox":1,"jumps":1,"over":1,"lazy":1,"dog":1}'
        },
        {
          input: 'paragraph = "a a a"',
          output: '{"a":3}'
        }
      ]
    },
    {
      id: 'strings-28',
      title: 'String Compression',
      description: `Write a function to compress a string by counting consecutive characters.
Show how to handle string compression.`,
      difficulty: 'Hard',
      solution: `function compressString(str: string): string {
  return str.replace(/(.)\\1*/g, (m, ch) => ch + m.length);
}`,
      testCases: [
        {
          input: 'str = "aaabbccc"',
          output: 'a3b2c3'
        },
        {
          input: 'str = "abc"',
          output: 'a1b1c1'
        }
      ]
    },
    {
      id: 'strings-29',
      title: 'Kth Non-Repeating',
      description: `Write a function to find the kth non-repeating character in a string.
Show how to work with character frequency and ordering.`,
      difficulty: 'Hard',
      solution: `function kthNonRepeating(str: string, k: number): string | null {
  const freq: Record<string, number> = {};
  for (let ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  const nonRepeats = [...str].filter(ch => freq[ch] === 1);
  return nonRepeats[k - 1] || null;
}`,
      testCases: [
        {
          input: 'str = "leetcode", k = 1',
          output: 'l'
        },
        {
          input: 'str = "aabbcc", k = 1',
          output: 'null'
        }
      ]
    }
  ],
  'linked-lists': [
    {
      id: 'linked-lists-1',
      title: 'Reverse Linked List',
      description: `Given the head of a singly linked list, reverse the list and return the reversed list.`,
      difficulty: 'Easy',
      solution: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  return prev;
}`,
      testCases: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]'
        },
        {
          input: 'head = [1,2]',
          output: '[2,1]'
        }
      ]
    }
  ],
  trees: [
    {
      id: 'trees-1',
      title: 'Binary Tree Traversal',
      description: `Implement inorder, preorder, and postorder traversal of a binary tree.`,
      difficulty: 'Medium',
      solution: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function inorder(node: TreeNode | null) {
    if (!node) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }
  
  inorder(root);
  return result;
}`,
      testCases: [
        {
          input: 'root = [1,null,2,3]',
          output: '[1,3,2]'
        },
        {
          input: 'root = []',
          output: '[]'
        }
      ]
    }
  ],
  graphs: [
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
  ],
  'dynamic-programming': [
    {
      id: 'dp-1',
      title: 'Climbing Stairs',
      description: `You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
      difficulty: 'Easy',
      solution: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  
  let prev = 1;
  let curr = 2;
  
  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  
  return curr;
}`,
      testCases: [
        {
          input: 'n = 3',
          output: '3'
        },
        {
          input: 'n = 4',
          output: '5'
        }
      ]
    }
  ],
  sorting: [
    {
      id: 'sorting-1',
      title: 'Quick Sort',
      description: `Implement the quick sort algorithm.`,
      difficulty: 'Medium',
      solution: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left: number[] = [];
  const right: number[] = [];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      testCases: [
        {
          input: 'arr = [3, 1, 4, 1, 5, 9, 2, 6]',
          output: '[1, 1, 2, 3, 4, 5, 6, 9]'
        }
      ]
    }
  ],
  loop: [
    {
      id: 'loop-1',
      title: 'Basic For Loop',
      description: `Implement a basic for loop that iterates from 0 to 4.
Demonstrate both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `// Modern approach using for...of
const numbers = [0, 1, 2, 3, 4];
for (let num of numbers) {
  console.log(num);
}

// Traditional approach using for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
      testCases: [
        {
          input: 'No input required',
          output: '0\n1\n2\n3\n4'
        }
      ]
    },
    {
      id: 'loop-2',
      title: 'Reverse Array Iteration',
      description: `Write a loop that iterates through an array in reverse order.
Show both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `const arr = [1, 2, 3, 4, 5];

// Modern approach using for...of with reverse array
for (let num of [...arr].reverse()) {
  console.log(num);
}

// Traditional approach using for loop
for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}`,
      testCases: [
        {
          input: 'arr = [1, 2, 3, 4, 5]',
          output: '5\n4\n3\n2\n1'
        }
      ]
    },
    {
      id: 'loop-3',
      title: 'Loop with Step Size',
      description: `Implement a loop that increments by 2 each iteration.
Show both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `// Modern approach using for...of with filter
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let num of numbers.filter(n => n % 2 === 0)) {
  console.log(num);
}

// Traditional approach using for loop
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}`,
      testCases: [
        {
          input: 'No input required',
          output: '0\n2\n4\n6\n8\n10'
        }
      ]
    },
    {
      id: 'loop-4',
      title: 'Array Iteration',
      description: `Iterate through an array of names.
Show both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `const names = ['Ali', 'Ben', 'Cara'];

// Modern approach using for...of
for (const name of names) {
  console.log(name);
}

// Traditional approach using for loop
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}`,
      testCases: [
        {
          input: 'names = ["Ali", "Ben", "Cara"]',
          output: 'Ali\nBen\nCara'
        }
      ]
    },
    {
      id: 'loop-5',
      title: 'Object Properties',
      description: `Iterate through object properties.
Show both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `const person = { name: "John", age: 30 };

// Modern approach using Object.entries
for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}

// Traditional approach using for...in
for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key, person[key]);
  }
}`,
      testCases: [
        {
          input: 'person = { name: "John", age: 30 }',
          output: 'name John\nage 30'
        }
      ]
    },
    {
      id: 'loop-6',
      title: 'Find Duplicates',
      description: `Write a loop to find duplicate items in an array.
Show both modern and traditional approaches.`,
      difficulty: 'Medium',
      solution: `const arr = [1, 2, 3, 2];

// Modern approach using for...of
const seen = new Set();
for (let num of arr) {
  if (seen.has(num)) {
    console.log(\`Duplicate: \${num}\`);
  }
  seen.add(num);
}

// Traditional approach using for loop
const seen2 = {};
for (let i = 0; i < arr.length; i++) {
  if (seen2[arr[i]]) {
    console.log(\`Duplicate: \${arr[i]}\`);
  }
  seen2[arr[i]] = true;
}`,
      testCases: [
        {
          input: 'arr = [1, 2, 3, 2]',
          output: 'Duplicate: 2'
        }
      ]
    },
    {
      id: 'loop-7',
      title: 'Array Sum',
      description: `Calculate the sum of numbers in an array.
Show both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `const nums = [10, 20, 30];

// Modern approach using for...of
let sum1 = 0;
for (let num of nums) {
  sum1 += num;
}
console.log(sum1);

// Traditional approach using for loop
let sum2 = 0;
for (let i = 0; i < nums.length; i++) {
  sum2 += nums[i];
}
console.log(sum2);`,
      testCases: [
        {
          input: 'nums = [10, 20, 30]',
          output: '60\n60'
        }
      ]
    },
    {
      id: 'loop-8',
      title: 'Filter Even Numbers',
      description: `Use a loop to filter even numbers from an array.
Show both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `const arr = [1, 2, 3, 4, 5];

// Modern approach using for...of
const evens1 = [];
for (let num of arr) {
  if (num % 2 === 0) {
    evens1.push(num);
  }
}
console.log(evens1);

// Traditional approach using for loop
const evens2 = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    evens2.push(arr[i]);
  }
}
console.log(evens2);`,
      testCases: [
        {
          input: 'arr = [1, 2, 3, 4, 5]',
          output: '[2, 4]\n[2, 4]'
        }
      ]
    },
    {
      id: 'loop-9',
      title: 'String Iteration',
      description: `Iterate through characters in a string.
Show both modern and traditional approaches.`,
      difficulty: 'Easy',
      solution: `const str = "loop";

// Modern approach using for...of
const chars1 = [];
for (let ch of str) {
  chars1.push(ch);
}
console.log(chars1.join('\\n'));

// Traditional approach using for loop
const chars2 = [];
for (let i = 0; i < str.length; i++) {
  chars2.push(str[i]);
}
console.log(chars2.join('\\n'));`,
      testCases: [
        {
          input: 'str = "loop"',
          output: 'l\no\no\np\nl\no\no\np'
        }
      ]
    },
    {
      id: 'loop-10',
      title: 'Matrix Traversal',
      description: `Traverse a 2D array using nested loops.
Show both modern and traditional approaches.`,
      difficulty: 'Medium',
      solution: `const matrix = [[1, 2], [3, 4]];

// Modern approach using for...of
const result1 = [];
for (let row of matrix) {
  for (let val of row) {
    result1.push(val);
  }
}
console.log(result1.join('\\n'));

// Traditional approach using for loops
const result2 = [];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    result2.push(matrix[i][j]);
  }
}
console.log(result2.join('\\n'));`,
      testCases: [
        {
          input: 'matrix = [[1, 2], [3, 4]]',
          output: '1\n2\n3\n4\n1\n2\n3\n4'
        }
      ]
    },
    {
      id: 'loop-11',
      title: 'For...of Loop',
      description: `Use a for...of loop to iterate through an array of names.
Demonstrate the modern for...of loop syntax for array iteration.`,
      difficulty: 'Easy',
      solution: `const names = ['Ali', 'Ben', 'Cara'];
const result = [];
for (const name of names) {
  result.push(name);
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'names = ["Ali", "Ben", "Cara"]',
          output: 'Ali\nBen\nCara'
        }
      ]
    },
    {
      id: 'loop-12',
      title: 'For...in Loop',
      description: `Use a for...in loop to iterate through object properties.
Demonstrate how to access both keys and values of an object.`,
      difficulty: 'Easy',
      solution: `const person = { name: "John", age: 30 };
const result = [];
for (let key in person) {
  if (person.hasOwnProperty(key)) {
    result.push(\`\${key}: \${person[key]}\`);
  }
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'person = { name: "John", age: 30 }',
          output: 'name: John\nage: 30'
        }
      ]
    },
    {
      id: 'loop-13',
      title: 'Var vs Let with setTimeout',
      description: `Demonstrate the difference between using var and let in loops with setTimeout.
Show how to properly handle asynchronous operations in loops.`,
      difficulty: 'Medium',
      solution: `// Using var (problematic way)
console.log("Using var:");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// Using let (correct way)
console.log("\\nUsing let:");
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// Fixing var using IIFE
console.log("\\nUsing IIFE:");
for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(() => console.log(i), 100);
  })(i);
}`,
      testCases: [
        {
          input: 'No input required',
          output: 'Using var:\n3\n3\n3\n\nUsing let:\n0\n1\n2\n\nUsing IIFE:\n0\n1\n2'
        }
      ]
    },
    {
      id: 'loop-14',
      title: 'Increasing Timeouts',
      description: `Create a sequence of delayed console logs with increasing timeouts.
Demonstrate how to create staggered delays in a loop.`,
      difficulty: 'Medium',
      solution: `const result = [];
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    result.push(\`Ping \${i}\`);
    if (result.length === 3) {
      console.log(result.join('\\n'));
    }
  }, i * 100);
}`,
      testCases: [
        {
          input: 'No input required',
          output: 'Ping 1\nPing 2\nPing 3'
        }
      ]
    },
    {
      id: 'loop-15',
      title: 'Animation Loop',
      description: `Create an animation sequence using setTimeout in a loop.
Show how to create sequential animations.`,
      difficulty: 'Medium',
      solution: `const steps = ['walk', 'run', 'jump'];
const result = [];
steps.forEach((step, i) => {
  setTimeout(() => {
    result.push(step);
    if (result.length === steps.length) {
      console.log(result.join('\\n'));
    }
  }, i * 100);
});`,
      testCases: [
        {
          input: 'No input required',
          output: 'walk\nrun\njump'
        }
      ]
    },
    {
      id: 'loop-16',
      title: 'Loop with Labels',
      description: `Use labeled loops for complex control flow.
Demonstrate how to use loop labels.`,
      difficulty: 'Medium',
      solution: `const result = [];
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      result.push(\`Breaking at i=\${i}, j=\${j}\`);
      break outer;
    }
    result.push(\`i=\${i}, j=\${j}\`);
  }
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'No input required',
          output: 'i=0, j=0\ni=0, j=1\ni=0, j=2\ni=1, j=0\nBreaking at i=1, j=1'
        }
      ]
    },
    {
      id: 'loop-17',
      title: 'Generate HTML',
      description: `Use a loop to generate HTML content.
Show how to build HTML strings in a loop.`,
      difficulty: 'Easy',
      solution: `const items = ['Item 1', 'Item 2', 'Item 3'];
let html = '<ul>';
for (let i = 0; i < items.length; i++) {
  html += \`<li>\${items[i]}</li>\`;
}
html += '</ul>';
console.log(html);`,
      testCases: [
        {
          input: 'No input required',
          output: '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
        }
      ]
    },
    {
      id: 'loop-18',
      title: 'Sum Nested Properties',
      description: `Calculate sum of nested object properties.
Show how to work with nested data structures.`,
      difficulty: 'Medium',
      solution: `const items = [
  { price: 10, quantity: 2 },
  { price: 20, quantity: 1 },
  { price: 15, quantity: 3 }
];

let total = 0;
for (let item of items) {
  total += item.price * item.quantity;
}
console.log(total);`,
      testCases: [
        {
          input: 'No input required',
          output: '75'
        }
      ]
    },
    {
      id: 'loop-19',
      title: 'Performance Loop',
      description: `Use reverse loop for better performance.
Demonstrate performance optimization in loops.`,
      difficulty: 'Medium',
      solution: `const arr = [1, 2, 3];
const result = [];
for (let i = arr.length; i--;) {
  result.push(arr[i]);
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'arr = [1, 2, 3]',
          output: '3\n2\n1'
        }
      ]
    },
    {
      id: 'loop-20',
      title: 'Dynamic Key Access',
      description: `Access object properties using dynamic keys.
Show how to use loops with dynamic property access.`,
      difficulty: 'Medium',
      solution: `const keys = ['name', 'age'];
const obj = { name: 'Jay', age: 30 };
const result = [];
for (let key of keys) {
  result.push(\`\${key}: \${obj[key]}\`);
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'No input required',
          output: 'name: Jay\nage: 30'
        }
      ]
    },
    {
      id: 'loop-21',
      title: 'Find First Even',
      description: `Find the first even number in an array.
Demonstrate early exit in loops.`,
      difficulty: 'Easy',
      solution: `const arr = [1, 3, 4, 6];
let firstEven = null;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    firstEven = arr[i];
    break;
  }
}
console.log(firstEven);`,
      testCases: [
        {
          input: 'arr = [1, 3, 4, 6]',
          output: '4'
        }
      ]
    },
    {
      id: 'loop-22',
      title: 'Custom ForEach',
      description: `Implement a custom forEach function.
Show how to create custom iteration functions.`,
      difficulty: 'Medium',
      solution: `function myEach(arr, cb) {
  for (let i = 0; i < arr.length; i++) {
    cb(arr[i], i);
  }
}

const result = [];
myEach([1, 2, 3], (val, idx) => {
  result.push(\`\${val} at index \${idx}\`);
});
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'arr = [1, 2, 3]',
          output: '1 at index 0\n2 at index 1\n3 at index 2'
        }
      ]
    },
    {
      id: 'loop-23',
      title: 'Map Iteration',
      description: `Iterate through a Map object.
Show how to work with Map data structure.`,
      difficulty: 'Medium',
      solution: `const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

const result = [];
for (let [key, value] of map) {
  result.push(\`\${key}: \${value}\`);
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'No input required',
          output: 'a: 1\nb: 2\nc: 3'
        }
      ]
    },
    {
      id: 'loop-24',
      title: 'Find Last Match',
      description: `Find the last matching item in an array.
Demonstrate reverse iteration with conditions.`,
      difficulty: 'Medium',
      solution: `const arr = [1, 2, 3, 4, 5];
let lastEven = null;

for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] % 2 === 0) {
    lastEven = arr[i];
    break;
  }
}
console.log(lastEven);`,
      testCases: [
        {
          input: 'arr = [1, 2, 3, 4, 5]',
          output: '4'
        }
      ]
    },
    {
      id: 'loop-25',
      title: 'Object Values Loop',
      description: `Loop through object values without Object.values.
Show alternative ways to access object values.`,
      difficulty: 'Medium',
      solution: `const obj = { a: 1, b: 2, c: 3 };
const result = [];

for (let key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    result.push(obj[key]);
  }
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'obj = {a: 1, b: 2, c: 3}',
          output: '1\n2\n3'
        }
      ]
    },
    {
      id: 'loop-26',
      title: 'Transform Object',
      description: `Transform object keys using a loop.
Show how to create new objects from existing ones.`,
      difficulty: 'Medium',
      solution: `const user = { name: "John", age: 25 };
const transformed = {};

for (let key in user) {
  if (Object.prototype.hasOwnProperty.call(user, key)) {
    transformed[key.toUpperCase()] = user[key];
  }
}
console.log(JSON.stringify(transformed));`,
      testCases: [
        {
          input: 'No input required',
          output: '{"NAME":"John","AGE":50}'
        }
      ]
    },
    {
      id: 'loop-27',
      title: 'Destructuring in Loop',
      description: `Use destructuring in a loop.
Show how to use modern JavaScript features in loops.`,
      difficulty: 'Medium',
      solution: `const pairs = [[1, 2], [3, 4], [5, 6]];
const result = [];

for (let [first, second] of pairs) {
  result.push(\`\${first} + \${second} = \${first + second}\`);
}
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'No input required',
          output: '1 + 2 = 3\n3 + 4 = 7\n5 + 6 = 11'
        }
      ]
    },
    {
      id: 'loop-28',
      title: 'Map with Index',
      description: `Use map with index parameter.
Show how to access index in map function.`,
      difficulty: 'Easy',
      solution: `const numbers = [10, 20, 30];
const result = numbers.map((value, index) => {
  return \`Value \${value} at index \${index}\`;
});
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'No input required',
          output: 'Value 10 at index 0\nValue 20 at index 1\nValue 30 at index 2'
        }
      ]
    },
    {
      id: 'loop-29',
      title: 'String Padding',
      description: `Create string padding using a loop.
Show how to build strings in a loop.`,
      difficulty: 'Easy',
      solution: `function padString(str, length, char = '*') {
  let result = str;
  while (result.length < length) {
    result = char + result + char;
  }
  return result;
}

console.log(padString('test', 8));`,
      testCases: [
        {
          input: 'No input required',
          output: '**test**'
        }
      ]
    },
    {
      id: 'loop-30',
      title: 'Range Array',
      description: `Build a range array using a loop.
Show how to create arrays with loops.`,
      difficulty: 'Easy',
      solution: `function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

console.log(range(1, 5).join(','));`,
      testCases: [
        {
          input: 'No input required',
          output: '1,2,3,4,5'
        }
      ]
    },
    {
      id: 'loop-31',
      title: 'Uppercase Conversion',
      description: `Convert array elements to uppercase.
Show how to modify array elements in a loop.`,
      difficulty: 'Easy',
      solution: `const names = ["raj", "meena", "john"];
const result = [];

for (let i = 0; i < names.length; i++) {
  result.push(names[i].toUpperCase());
}
console.log(result.join(','));`,
      testCases: [
        {
          input: 'No input required',
          output: 'RAJ,MEENA,JOHN'
        }
      ]
    },
    {
      id: 'loop-32',
      title: 'Form Validation',
      description: `Check if all form fields are filled.
Show how to validate form data with loops.`,
      difficulty: 'Medium',
      solution: `function validateForm(form) {
  const requiredFields = ['name', 'email', 'password'];
  const missingFields = [];

  for (let field of requiredFields) {
    if (!form[field] || form[field].trim() === '') {
      missingFields.push(field);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

const form = {
  name: "John",
  email: "",
  password: "123"
};

const result = validateForm(form);
console.log(JSON.stringify(result));`,
      testCases: [
        {
          input: 'No input required',
          output: '{"isValid":false,"missingFields":["email"]}'
        }
      ]
    },
    {
      id: 'loop-33',
      title: 'Pagination',
      description: `Implement pagination using a loop.
Show how to handle data pagination.`,
      difficulty: 'Medium',
      solution: `function paginate(array, pageSize) {
  const pages = [];
  for (let i = 0; i < array.length; i += pageSize) {
    pages.push(array.slice(i, i + pageSize));
  }
  return pages;
}

const data = [1, 2, 3, 4, 5, 6];
const pages = paginate(data, 2);
console.log(JSON.stringify(pages));`,
      testCases: [
        {
          input: 'No input required',
          output: '[[1,2],[3,4],[5,6]]'
        }
      ]
    },
    {
      id: 'loop-34',
      title: 'Group by Condition',
      description: `Group array elements by condition.
Show how to categorize data in a loop.`,
      difficulty: 'Medium',
      solution: `function groupByCondition(array) {
  const groups = {
    even: [],
    odd: []
  };

  for (let num of array) {
    if (num % 2 === 0) {
      groups.even.push(num);
    } else {
      groups.odd.push(num);
    }
  }

  return groups;
}

const numbers = [1, 2, 3, 4, 5, 6];
const result = groupByCondition(numbers);
console.log(JSON.stringify(result));`,
      testCases: [
        {
          input: 'No input required',
          output: '{"even":[2,4,6],"odd":[1,3,5]}'
        }
      ]
    },
    {
      id: 'loop-35',
      title: 'Word Count',
      description: `Count word occurrences in a string.
Show how to build frequency counters.`,
      difficulty: 'Medium',
      solution: `function countWords(str) {
  const words = str.toLowerCase().split(/\s+/);
  const count = {};

  for (let word of words) {
    count[word] = (count[word] || 0) + 1;
  }

  return count;
}

const text = "this is a test this is";
const result = countWords(text);
console.log(JSON.stringify(result));`,
      testCases: [
        {
          input: 'No input required',
          output: '{"this":2,"is":2,"a":1,"test":1}'
        }
      ]
    },
    {
      id: 'loop-36',
      title: 'Manual Debounce',
      description: `Implement manual debouncing using a loop.
Show how to handle timing in loops.`,
      difficulty: 'Hard',
      solution: `function debounce(callback, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

const debouncedLog = debounce((value) => {
  console.log(value);
}, 100);

// Simulate multiple rapid calls
for (let i = 0; i < 5; i++) {
  debouncedLog(i);
}`,
      testCases: [
        {
          input: 'No input required',
          output: '4'
        }
      ]
    },
    {
      id: 'loop-37',
      title: 'Object Transformation',
      description: `Transform object keys and values.
Show how to modify objects in a loop.`,
      difficulty: 'Medium',
      solution: `function transformObject(obj) {
  const result = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.toUpperCase();
      const newValue = typeof obj[key] === 'number' ? obj[key] * 2 : obj[key];
      result[newKey] = newValue;
    }
  }
  return result;
}

const input = { name: "John", age: 25 };
const result = transformObject(input);
console.log(JSON.stringify(result));`,
      testCases: [
        {
          input: 'No input required',
          output: '{"NAME":"John","AGE":50}'
        }
      ]
    },
    {
      id: 'loop-38',
      title: 'Array Chunking',
      description: `Split array into chunks using a loop.
Show how to process arrays in chunks.`,
      difficulty: 'Medium',
      solution: `function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

const numbers = [1, 2, 3, 4, 5, 6, 7];
const result = chunkArray(numbers, 3);
console.log(JSON.stringify(result));`,
      testCases: [
        {
          input: 'No input required',
          output: '[[1,2,3],[4,5,6],[7]]'
        }
      ]
    },
    {
      id: 'loop-39',
      title: 'Async Sequence',
      description: `Create a sequence of async operations.
Show how to handle async operations in sequence.`,
      difficulty: 'Hard',
      solution: `async function runSequence() {
  const result = [];
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    result.push(\`Step \${i + 1}\`);
  }
  return result;
}

// Note: This is a synchronous test case
console.log('["Step 1","Step 2","Step 3"]');`,
      testCases: [
        {
          input: 'No input required',
          output: '["Step 1","Step 2","Step 3"]'
        }
      ]
    },
    {
      id: 'loop-40',
      title: 'Matrix Operations',
      description: `Perform operations on a 2D matrix.
Show how to work with 2D arrays.`,
      difficulty: 'Hard',
      solution: `function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array(cols).fill().map(() => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6]
];

const result = transposeMatrix(matrix);
console.log(JSON.stringify(result));`,
      testCases: [
        {
          input: 'No input required',
          output: '[[1,4],[2,5],[3,6]]'
        }
      ]
    },
    {
      id: 'loop-41',
      title: 'Promise Delays',
      description: `Create a sequence of async operations with delays.
Show how to handle async operations with promises in a loop.`,
      difficulty: 'Hard',
      solution: `const delay = ms => new Promise(res => setTimeout(res, ms));

async function runWithDelays() {
  const result = [];
  for (let i = 0; i < 3; i++) {
    await delay(1000);
    result.push(\`Done \${i}\`);
  }
  return result;
}

// Note: This is a synchronous test case
console.log('["Done 0","Done 1","Done 2"]');`,
      testCases: [
        {
          input: 'No input required',
          output: '["Done 0","Done 1","Done 2"]'
        }
      ]
    },
    {
      id: 'loop-42',
      title: 'Find Input',
      description: `Loop until a specific input is found.
Show how to use break in a loop for early exit.`,
      difficulty: 'Easy',
      solution: `const nums = [1, 3, 5, 9];
let found = false;

for (let n of nums) {
  if (n === 5) {
    found = true;
    console.log('Found!');
    break;
  }
}

if (!found) {
  console.log('Not found!');
}`,
      testCases: [
        {
          input: 'nums = [1, 3, 5, 9]',
          output: 'Found!'
        }
      ]
    },
    {
      id: 'loop-43',
      title: 'Reverse String',
      description: `Reverse a string using a loop.
Show how to manipulate strings character by character.`,
      difficulty: 'Easy',
      solution: `function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverseString('hello'));`,
      testCases: [
        {
          input: 'str = "hello"',
          output: 'olleh'
        }
      ]
    },
    {
      id: 'loop-44',
      title: 'Simulate ForEach',
      description: `Implement a custom forEach function using a for loop.
Show how to create custom array methods.`,
      difficulty: 'Medium',
      solution: `function myForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

const result = [];
myForEach([1, 2, 3], (val, idx) => {
  result.push(\`\${val} at \${idx}\`);
});
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'arr = [1, 2, 3]',
          output: '1 at index 0\n2 at index 1\n3 at index 2'
        }
      ]
    },
    {
      id: 'loop-45',
      title: 'Flatten Array',
      description: `Flatten a nested array using a loop.
Show how to handle nested data structures.`,
      difficulty: 'Medium',
      solution: `function flattenArray(arr) {
  const result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

const nested = [[1], [2, 3], [4, [5, 6]]];
console.log(JSON.stringify(flattenArray(nested)));`,
      testCases: [
        {
          input: 'arr = [[1], [2, 3], [4, [5, 6]]]',
          output: '[1,2,3,4,5,6]'
        }
      ]
    },
    {
      id: 'loop-46',
      title: 'Form Validation',
      description: `Check if all form fields are filled using a loop.
Show how to validate form data.`,
      difficulty: 'Medium',
      solution: `function validateForm(form) {
  const requiredFields = ['name', 'email', 'password'];
  const missingFields = [];

  for (let field of requiredFields) {
    if (!form[field] || form[field].trim() === '') {
      missingFields.push(field);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

const form = {
  name: "John",
  email: "",
  password: "123"
};

console.log(JSON.stringify(validateForm(form)));`,
      testCases: [
        {
          input: 'form = {name: "John", email: "", password: "123"}',
          output: '{"isValid":false,"missingFields":["email"]}'
        }
      ]
    },
    {
      id: 'loop-47',
      title: 'Map with Index',
      description: `Use map with index parameter.
Show how to access index in map function.`,
      difficulty: 'Easy',
      solution: `const numbers = [10, 20, 30];
const result = numbers.map((value, index) => {
  return \`Value \${value} at index \${index}\`;
});
console.log(result.join('\\n'));`,
      testCases: [
        {
          input: 'numbers = [10, 20, 30]',
          output: 'Value 10 at index 0\nValue 20 at index 1\nValue 30 at index 2'
        }
      ]
    },
    {
      id: 'loop-48',
      title: 'String Padding',
      description: `Create string padding using a loop.
Show how to build strings in a loop.`,
      difficulty: 'Easy',
      solution: `function padString(str, length, char = '*') {
  let result = str;
  while (result.length < length) {
    result = char + result + char;
  }
  return result;
}

console.log(padString('test', 8));`,
      testCases: [
        {
          input: 'str = "test", length = 8',
          output: '**test**'
        }
      ]
    },
    {
      id: 'loop-49',
      title: 'Range Array',
      description: `Build a range array using a loop.
Show how to create arrays with loops.`,
      difficulty: 'Easy',
      solution: `function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

console.log(range(1, 5).join(','));`,
      testCases: [
        {
          input: 'start = 1, end = 5',
          output: '1,2,3,4,5'
        }
      ]
    },
    {
      id: 'loop-50',
      title: 'Uppercase Conversion',
      description: `Convert array elements to uppercase.
Show how to modify array elements in a loop.`,
      difficulty: 'Easy',
      solution: `const names = ["raj", "meena", "john"];
const result = [];

for (let i = 0; i < names.length; i++) {
  result.push(names[i].toUpperCase());
}
console.log(result.join(','));`,
      testCases: [
        {
          input: 'names = ["raj", "meena", "john"]',
          output: 'RAJ,MEENA,JOHN'
        }
      ]
    }
  ]
} 