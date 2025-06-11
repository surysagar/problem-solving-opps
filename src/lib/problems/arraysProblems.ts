import { Problem } from '@/types'

export const arraysProblems: Problem[] = [
  {
    id: '1',
    title: 'Array Sum',
    description: 'Calculate the sum of all elements in an array',
    difficulty: 'Easy',
    category: 'arrays',
    solution: `function sumArray(arr: number[]): number {
  return arr.reduce((sum, num) => sum + num, 0);
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const sum = sumArray(numbers);
console.log(sum); // ➤ 15`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5]',
        output: '15'
      },
      {
        input: 'arr = [10, 20, 30]',
        output: '60'
      }
    ]
  },
  {
    id: '2',
    title: 'Find Maximum',
    description: 'Find the maximum value in an array',
    difficulty: 'Easy',
    category: 'arrays',
    solution: `function findMax(arr: number[]): number {
  return Math.max(...arr);
}

// Example usage:
const numbers = [1, 5, 3, 9, 2];
const max = findMax(numbers);
console.log(max); // ➤ 9`,
    testCases: [
      {
        input: 'arr = [1, 5, 3, 9, 2]',
        output: '9'
      },
      {
        input: 'arr = [-1, -5, -3]',
        output: '-1'
      }
    ]
  },
  {
    id: '3',
    title: 'Array Average',
    description: 'Calculate the average of all elements in an array',
    difficulty: 'Easy',
    category: 'arrays',
    solution: `function averageArray(arr: number[]): number {
  return arr.reduce((sum, num) => sum + num, 0) / arr.length;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const avg = averageArray(numbers);
console.log(avg); // ➤ 3`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5]',
        output: '3'
      },
      {
        input: 'arr = [10, 20, 30]',
        output: '20'
      }
    ]
  },
  {
    id: '4',
    title: 'Array Reverse',
    description: 'Reverse the elements of an array',
    difficulty: 'Easy',
    category: 'arrays',
    solution: `function reverseArray(arr: any[]): any[] {
  return [...arr].reverse();
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const reversed = reverseArray(numbers);
console.log(reversed); // ➤ [5, 4, 3, 2, 1]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]'
      },
      {
        input: 'arr = ["a", "b", "c"]',
        output: '["c", "b", "a"]'
      }
    ]
  },
  {
    id: '5',
    title: 'Array Filter',
    description: 'Filter array elements based on a condition',
    difficulty: 'Easy',
    category: 'arrays',
    solution: `function filterArray(arr: number[], condition: (num: number) => boolean): number[] {
  return arr.filter(condition);
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterArray(numbers, num => num % 2 === 0);
console.log(evenNumbers); // ➤ [2, 4]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5], condition = num => num % 2 === 0',
        output: '[2, 4]'
      },
      {
        input: 'arr = [10, 20, 30], condition = num => num > 15',
        output: '[20, 30]'
      }
    ]
  },
  {
    id: '6',
    title: 'Array Map',
    description: 'Transform array elements using a mapping function',
    difficulty: 'Easy',
    category: 'arrays',
    solution: `function mapArray(arr: number[], transform: (num: number) => number): number[] {
  return arr.map(transform);
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const doubled = mapArray(numbers, num => num * 2);
console.log(doubled); // ➤ [2, 4, 6, 8, 10]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5], transform = num => num * 2',
        output: '[2, 4, 6, 8, 10]'
      },
      {
        input: 'arr = [10, 20, 30], transform = num => num + 5',
        output: '[15, 25, 35]'
      }
    ]
  },
  {
    id: '7',
    title: 'Array Flatten',
    description: 'Flatten a nested array into a single-level array',
    difficulty: 'Medium',
    category: 'arrays',
    solution: `function flattenArray(arr: any[]): any[] {
  return arr.flat(Infinity);
}

// Example usage:
const nested = [1, [2, 3], [4, [5, 6]]];
const flat = flattenArray(nested);
console.log(flat); // ➤ [1, 2, 3, 4, 5, 6]`,
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
  },
  {
    id: '8',
    title: 'Array Chunk',
    description: 'Split an array into chunks of specified size',
    difficulty: 'Medium',
    category: 'arrays',
    solution: `function chunkArray(arr: any[], size: number): any[][] {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 6, 7];
const chunks = chunkArray(numbers, 3);
console.log(chunks); // ➤ [[1, 2, 3], [4, 5, 6], [7]]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5, 6, 7], size = 3',
        output: '[[1, 2, 3], [4, 5, 6], [7]]'
      },
      {
        input: 'arr = [1, 2, 3, 4], size = 2',
        output: '[[1, 2], [3, 4]]'
      }
    ]
  },
  {
    id: '9',
    title: 'Array Intersection',
    description: 'Find common elements between two arrays',
    difficulty: 'Medium',
    category: 'arrays',
    solution: `function arrayIntersection(arr1: any[], arr2: any[]): any[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example usage:
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const intersection = arrayIntersection(arr1, arr2);
console.log(intersection); // ➤ [3, 4]`,
    testCases: [
      {
        input: 'arr1 = [1, 2, 3, 4], arr2 = [3, 4, 5, 6]',
        output: '[3, 4]'
      },
      {
        input: 'arr1 = ["a", "b", "c"], arr2 = ["b", "c", "d"]',
        output: '["b", "c"]'
      }
    ]
  },
  {
    id: '10',
    title: 'Array Union',
    description: 'Combine two arrays and remove duplicates',
    difficulty: 'Medium',
    category: 'arrays',
    solution: `function arrayUnion(arr1: any[], arr2: any[]): any[] {
  return [...new Set([...arr1, ...arr2])];
}

// Example usage:
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const union = arrayUnion(arr1, arr2);
console.log(union); // ➤ [1, 2, 3, 4, 5]`,
    testCases: [
      {
        input: 'arr1 = [1, 2, 3], arr2 = [3, 4, 5]',
        output: '[1, 2, 3, 4, 5]'
      },
      {
        input: 'arr1 = ["a", "b"], arr2 = ["b", "c"]',
        output: '["a", "b", "c"]'
      }
    ]
  },
  {
    id: '11',
    title: 'Remove Duplicates from Multi-dimensional Array',
    description: 'Remove duplicate elements from a multi-dimensional array based on a specific property using filter with an object parameter',
    difficulty: 'Medium',
    category: 'arrays',
    solution: `function removeDuplicatesByProperty(arr: any[][]): any[][] {
  return arr.filter(function(item, pos) {
    if (!this.hasOwnProperty(item[1])) {
      return this[item[1]] = true;
    }
    return false;
  }, {});
}

// Example usage:
const colors = [[1, "red"], [2, "green"], [3, "red"], [3, "blue"], [5, "green"]];
const uniqueColors = removeDuplicatesByProperty(colors);
console.log(uniqueColors); // [[1, "red"], [2, "green"], [3, "blue"]]`,
    testCases: [
      {
        input: 'arr = [[1, "red"], [2, "green"], [3, "red"], [3, "blue"], [5, "green"]]',
        output: '[[1, "red"], [2, "green"], [3, "blue"]]'
      },
      {
        input: 'arr = [[1, "apple"], [2, "banana"], [3, "apple"], [4, "orange"]]',
        output: '[[1, "apple"], [2, "banana"], [4, "orange"]]'
      }
    ]
  }
] 