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
    id: '15',
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
    id: '16',
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
    id: '17',
    title: 'String Compression',
    description: 'Compress a string by counting consecutive characters',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function compress(str: string): string {
  let result = '';
  let count = 1;
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      result += str[i] + (count > 1 ? count : '');
      count = 1;
    }
  }
  
  return result;
}`,
    testCases: [
      {
        input: 'str = "aabcccccaaa"',
        output: 'a2b1c5a3'
      },
      {
        input: 'str = "abcd"',
        output: 'abcd'
      }
    ]
  },
  {
    id: '18',
    title: 'Valid Parentheses',
    description: 'Check if a string of parentheses is valid',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char in map) {
      const top = stack.pop();
      if (top !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}`,
    testCases: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "([)]"',
        output: 'false'
      }
    ]
  },
  {
    id: '19',
    title: 'String to Integer',
    description: 'Convert a string to an integer',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function myAtoi(s: string): number {
  const num = parseInt(s.trim());
  if (isNaN(num)) return 0;
  return Math.max(Math.min(num, 2**31 - 1), -(2**31));
}`,
    testCases: [
      {
        input: 's = "42"',
        output: '42'
      },
      {
        input: 's = "   -42"',
        output: '-42'
      }
    ]
  },
  {
    id: '20',
    title: 'Longest Substring Without Repeating',
    description: 'Find the length of the longest substring without repeating characters',
    difficulty: 'Hard',
    category: 'strings',
    solution: `function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let max = 0;
  let start = 0;
  
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      start = Math.max(start, map.get(s[i])! + 1);
    }
    map.set(s[i], i);
    max = Math.max(max, i - start + 1);
  }
  
  return max;
}`,
    testCases: [
      {
        input: 's = "abcabcbb"',
        output: '3'
      },
      {
        input: 's = "bbbbb"',
        output: '1'
      }
    ]
  },
  {
    id: '21',
    title: 'String Rotation',
    description: 'Check if one string is a rotation of another',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function isRotation(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false;
  return (s1 + s1).includes(s2);
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
    id: '22',
    title: 'String Permutation',
    description: 'Check if one string is a permutation of another',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function isPermutation(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false;
  const chars = new Map<string, number>();
  
  for (let char of s1) {
    chars.set(char, (chars.get(char) || 0) + 1);
  }
  
  for (let char of s2) {
    const count = chars.get(char);
    if (!count) return false;
    chars.set(char, count - 1);
  }
  
  return true;
}`,
    testCases: [
      {
        input: 's1 = "abc", s2 = "cba"',
        output: 'true'
      },
      {
        input: 's1 = "abc", s2 = "def"',
        output: 'false'
      }
    ]
  },
  {
    id: '23',
    title: 'URLify',
    description: 'Replace spaces in a string with %20',
    difficulty: 'Easy',
    category: 'strings',
    solution: `function urlify(str: string): string {
  return str.trim().replace(/\s+/g, '%20');
}`,
    testCases: [
      {
        input: 'str = "Mr John Smith"',
        output: 'Mr%20John%20Smith'
      },
      {
        input: 'str = "Hello World  "',
        output: 'Hello%20World'
      }
    ]
  },
  {
    id: '24',
    title: 'String Compression II',
    description: 'Compress a string by removing duplicates',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function compressString(str: string): string {
  let result = '';
  let current = str[0];
  let count = 1;
  
  for (let i = 1; i < str.length; i++) {
    if (str[i] === current) {
      count++;
    } else {
      result += current + count;
      current = str[i];
      count = 1;
    }
  }
  
  result += current + count;
  return result.length < str.length ? result : str;
}`,
    testCases: [
      {
        input: 'str = "aabcccccaaa"',
        output: 'a2b1c5a3'
      },
      {
        input: 'str = "abcd"',
        output: 'abcd'
      }
    ]
  },
  {
    id: '25',
    title: 'String to Words',
    description: 'Split a string into words and reverse them',
    difficulty: 'Medium',
    category: 'strings',
    solution: `function reverseWords(str: string): string {
  return str.split(' ')
    .map(word => word.split('').reverse().join(''))
    .join(' ');
}`,
    testCases: [
      {
        input: 'str = "Let\'s take LeetCode contest"',
        output: 's\'teL ekat edoCteeL tsetnoc'
      },
      {
        input: 'str = "Hello World"',
        output: 'olleH dlroW'
      }
    ]
  }
] 