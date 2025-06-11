import { Problem } from '@/types'

export const treesProblems: Problem[] = [
  {
    id: '1',
    title: 'Binary Tree Basics',
    description: 'Learn basic binary tree operations',
    difficulty: 'Easy',
    category: 'trees',
    explanation: 'A binary tree is a tree data structure where each node has at most two children.',
    example: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Create a simple binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);`
  },
  {
    id: '2',
    title: 'Tree Traversal',
    description: 'Learn different ways to traverse a binary tree',
    difficulty: 'Easy',
    category: 'trees',
    explanation: 'Tree traversal involves visiting all nodes in a specific order.',
    example: `// Inorder traversal (Left -> Root -> Right)
function inorderTraversal(root) {
  if (!root) return [];
  return [
    ...inorderTraversal(root.left),
    root.value,
    ...inorderTraversal(root.right)
  ];
}

// Preorder traversal (Root -> Left -> Right)
function preorderTraversal(root) {
  if (!root) return [];
  return [
    root.value,
    ...preorderTraversal(root.left),
    ...preorderTraversal(root.right)
  ];
}

// Postorder traversal (Left -> Right -> Root)
function postorderTraversal(root) {
  if (!root) return [];
  return [
    ...postorderTraversal(root.left),
    ...postorderTraversal(root.right),
    root.value
  ];
}`
  },
  {
    id: '3',
    title: 'Level Order Traversal',
    description: 'Learn how to traverse a tree level by level',
    difficulty: 'Medium',
    category: 'trees',
    explanation: 'Level order traversal visits nodes level by level, from left to right.',
    example: `function levelOrderTraversal(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const level = [];
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}`
  },
  {
    id: '4',
    title: 'Tree Height',
    description: 'Learn how to calculate the height of a tree',
    difficulty: 'Easy',
    category: 'trees',
    explanation: 'The height of a tree is the length of the path from root to the deepest leaf node.',
    example: `function getTreeHeight(root) {
  if (!root) return 0;
  return 1 + Math.max(
    getTreeHeight(root.left),
    getTreeHeight(root.right)
  );
}`
  },
  {
    id: '5',
    title: 'Binary Search Tree',
    description: 'Learn about binary search trees and their operations',
    difficulty: 'Medium',
    category: 'trees',
    explanation: 'A binary search tree is a binary tree where each node\'s value is greater than all values in its left subtree and less than all values in its right subtree.',
    example: `class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
}`
  },
  {
    id: '6',
    title: 'Tree Validation',
    description: 'Learn how to validate a binary search tree',
    difficulty: 'Medium',
    category: 'trees',
    explanation: 'Validating a BST requires checking if each node\'s value is within the correct range.',
    example: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  
  if (root.value <= min || root.value >= max) {
    return false;
  }
  
  return isValidBST(root.left, min, root.value) &&
         isValidBST(root.right, root.value, max);
}`
  }
] 