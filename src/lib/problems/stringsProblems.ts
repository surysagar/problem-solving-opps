import { Problem } from '@/types'

export const stringsProblems: Problem[] = [
  {
    id: '1',
    title: 'String Length',
    description: 'Find the length of a string',
    difficulty: 'Easy',
    category: 'strings',
    solution: `const str = "Hello";
console.log(str.length);`,
    testCases: [
      {
        input: 'str = "Hello"',
        output: '5'
      }
    ]
  },
  {
    id: '2',
    title: 'String Concatenation',
    description: 'Combine multiple strings',
    difficulty: 'Easy',
    category: 'strings',
    solution: `const str1 = "Hello";
const str2 = "World";
console.log(str1 + " " + str2);
console.log(\`\${str1} \${str2}\`);`,
    testCases: [
      {
        input: 'str1 = "Hello", str2 = "World"',
        output: 'Hello World\nHello World'
      }
    ]
  },
  {
    id: '3',
    title: 'String Methods',
    description: 'Learn common string methods',
    difficulty: 'Easy',
    category: 'strings',
    solution: `const str = "Hello World";
console.log(str.toUpperCase());
console.log(str.toLowerCase());
console.log(str.indexOf("World"));
console.log(str.slice(0, 5));`,
    testCases: [
      {
        input: 'str = "Hello World"',
        output: 'HELLO WORLD\nhello world\n6\nHello'
      }
    ]
  },
  {
    id: '4',
    title: 'String Search',
    description: 'Search for substrings in a string',
    difficulty: 'Medium',
    category: 'strings',
    solution: `const str = "Hello World";
console.log(str.includes("World"));
console.log(str.startsWith("Hello"));
console.log(str.endsWith("World"));`,
    testCases: [
      {
        input: 'str = "Hello World"',
        output: 'true\ntrue\ntrue'
      }
    ]
  },
  {
    id: '5',
    title: 'String Split and Join',
    description: 'Split strings into arrays and join arrays into strings',
    difficulty: 'Medium',
    category: 'strings',
    solution: `const str = "Hello World";
const words = str.split(" ");
console.log(words.join("-"));`,
    testCases: [
      {
        input: 'str = "Hello World"',
        output: 'Hello-World'
      }
    ]
  },
  {
    id: '6',
    title: 'String Replace',
    description: 'Replace parts of a string',
    difficulty: 'Medium',
    category: 'strings',
    solution: `const str = "Hello World";
console.log(str.replace("World", "JavaScript"));
console.log(str.replaceAll("l", "L"));`,
    testCases: [
      {
        input: 'str = "Hello World"',
        output: 'Hello JavaScript\nHeLLo WorLd'
      }
    ]
  },
  {
    id: '7',
    title: 'Palindrome Check',
    description: 'Check if a string is a palindrome',
    difficulty: 'Easy',
    category: 'strings',
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
    id: '8',
    title: 'Reverse String',
    description: 'Reverse a string',
    difficulty: 'Easy',
    category: 'strings',
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
    id: '9',
    title: 'Count Vowels',
    description: 'Count the number of vowels in a string',
    difficulty: 'Easy',
    category: 'strings',
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
    id: '10',
    title: 'Word Count',
    description: 'Count occurrences of a specific word in a string',
    difficulty: 'Medium',
    category: 'strings',
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
    id: '11',
    title: 'First Unique Character',
    description: 'Find the first non-repeating character in a string',
    difficulty: 'Medium',
    category: 'strings',
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
    id: '12',
    title: 'Anagram Check',
    description: 'Check if two strings are anagrams',
    difficulty: 'Medium',
    category: 'strings',
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
    id: '13',
    title: 'Character Frequency',
    description: 'Count the frequency of each character in a string',
    difficulty: 'Medium',
    category: 'strings',
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
    id: '14',
    title: 'Title Case',
    description: 'Capitalize the first letter of each word in a string',
    difficulty: 'Easy',
    category: 'strings',
    solution: `function titleCase(str: string): string {
  return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}`,
    testCases: [
      {
        input: 'str = "hello world"',
        output: 'Hello World'
      },
      {
        input: 'str = "JAVASCRIPT IS AWESOME"',
        output: 'Javascript Is Awesome'
      }
    ]
  },
  {
    id: '15',
    title: 'Longest Word',
    description: 'Find the longest word in a string',
    difficulty: 'Easy',
    category: 'strings',
    solution: `function longestWord(str: string): string {
  return str.split(' ').reduce((a, b) => a.length > b.length ? a : b);
}`,
    testCases: [
      {
        input: 'str = "The quick brown fox jumps over the lazy dog"',
        output: 'quick'
      },
      {
        input: 'str = "JavaScript is awesome"',
        output: 'JavaScript'
      }
    ]
  },
  {
    id: '16',
    title: 'String Repeat',
    description: 'Repeat a string N times',
    difficulty: 'Easy',
    category: 'strings',
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
    id: '17',
    title: 'String Truncate',
    description: 'Truncate a string if it is longer than the given maximum length',
    difficulty: 'Easy',
    category: 'strings',
    solution: `function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n) + '...' : str;
}`,
    testCases: [
      {
        input: 'str = "Hello World", n = 5',
        output: 'Hello...'
      },
      {
        input: 'str = "Short", n = 10',
        output: 'Short'
      }
    ]
  },
  {
    id: '18',
    title: 'Remove Spaces',
    description: 'Remove all spaces from a string',
    difficulty: 'Easy',
    category: 'strings',
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
    id: '19',
    title: 'To Camel Case',
    description: 'Convert a string to camel case',
    difficulty: 'Medium',
    category: 'strings',
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
    id: '20',
    title: 'Maskify',
    description: 'Mask all characters except the last 4 in a string',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function maskify(str: string): string {
  return str.slice(-4).padStart(str.length, '#');
}`,
    testCases: [
      {
        input: 'str = "4556364607935616"',
        output: '############5616'
      },
      {
        input: 'str = "1234"',
        output: '1234'
      }
    ]
  },
  {
    id: '21',
    title: 'Alpha Check',
    description: 'Check if a string contains only letters',
    difficulty: 'Medium',
    category: 'strings',
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
    id: '22',
    title: 'Swap Case',
    description: 'Swap the case of each character in a string',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function swapCase(str: string): string {
  return [...str].map(ch => ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()).join('');
}`,
    testCases: [
      {
        input: 'str = "Hello World"',
        output: 'hELLO wORLD'
      },
      {
        input: 'str = "JavaScript"',
        output: 'jAVAsCRIPT'
      }
    ]
  },
  {
    id: '23',
    title: 'Remove Duplicates',
    description: 'Remove duplicate characters from a string',
    difficulty: 'Medium',
    category: 'strings',
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
    id: '24',
    title: 'Extract Numbers',
    description: 'Extract all numbers from a string',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function extractNumbers(str: string): number[] {
  return (str.match(/\\d+/g) || []).map(Number);
}`,
    testCases: [
      {
        input: 'str = "abc123def456"',
        output: '[123, 456]'
      },
      {
        input: 'str = "no numbers here"',
        output: '[]'
      }
    ]
  },
  {
    id: '25',
    title: 'Group Anagrams',
    description: 'Group anagrams from an array of strings',
    difficulty: 'Hard',
    category: 'strings',
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
        input: 'words = ["eat", "tea", "tan", "ate", "nat", "bat"]',
        output: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]'
      },
      {
        input: 'words = [""]',
        output: '[[""]]'
      }
    ]
  },
  {
    id: '14',
    title: 'All Substrings',
    description: 'Find all possible substrings of a string',
    difficulty: 'Hard',
    category: 'strings',
    solution: `function allSubstrings(str: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
}

// Example usage:
const str = "abc";
const substrings = allSubstrings(str);
console.log(substrings); // ["a", "ab", "abc", "b", "bc", "c"]`,
    testCases: [
      {
        input: 'str = "abc"',
        output: '["a", "ab", "abc", "b", "bc", "c"]'
      },
      {
        input: 'str = "a"',
        output: '["a"]'
      }
    ]
  },
  {
    id: '15',
    title: 'Longest Common Prefix',
    description: 'Find the longest common prefix among an array of strings',
    difficulty: 'Hard',
    category: 'strings',
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
}

// Example usage:
const words = ["flower", "flow", "flight"];
const prefix = longestCommonPrefix(words);
console.log(prefix); // "fl"`,
    testCases: [
      {
        input: 'arr = ["flower", "flow", "flight"]',
        output: '"fl"'
      },
      {
        input: 'arr = ["dog", "racecar", "car"]',
        output: '""'
      }
    ]
  },
  {
    id: '16',
    title: 'Decode Run-Length Encoding',
    description: 'Decode a run-length encoded string (e.g., "a4b2" → "aaaabb")',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function decodeRLE(str: string): string {
  return str.replace(/([a-zA-Z])(\\d+)/g, (_, ch, n) => ch.repeat(Number(n)));
}

// Example usage:
const encoded = "a4b2c3";
const decoded = decodeRLE(encoded);
console.log(decoded); // "aaaabbccc"`,
    testCases: [
      {
        input: 'str = "a4b2c3"',
        output: '"aaaabbccc"'
      },
      {
        input: 'str = "x1y2"',
        output: '"xyy"'
      }
    ]
  },
  {
    id: '17',
    title: 'String Rotation',
    description: 'Check if one string is a rotation of another',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function isRotation(s1: string, s2: string): boolean {
  return s1.length === s2.length && (s1 + s1).includes(s2);
}

// Example usage:
const s1 = "waterbottle";
const s2 = "erbottlewat";
console.log(isRotation(s1, s2)); // true`,
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
    id: '18',
    title: 'String Permutations',
    description: 'Generate all possible permutations of a string',
    difficulty: 'Hard',
    category: 'strings',
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
}

// Example usage:
const str = "abc";
const perms = permutations(str);
console.log(perms); // ["abc", "acb", "bac", "bca", "cab", "cba"]`,
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
    id: '19',
    title: 'Palindromic Substrings',
    description: 'Find all palindromic substrings in a string',
    difficulty: 'Hard',
    category: 'strings',
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
}

// Example usage:
const str = "aaa";
const palindromes = palindromicSubstrings(str);
console.log(palindromes); // ["a", "aa", "aaa"]`,
    testCases: [
      {
        input: 'str = "aaa"',
        output: '["a", "aa", "aaa"]'
      },
      {
        input: 'str = "abc"',
        output: '["a", "b", "c"]'
      }
    ]
  }
] 