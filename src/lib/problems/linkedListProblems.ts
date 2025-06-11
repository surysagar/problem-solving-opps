import { Problem } from '@/types'

export const linkedListProblems: Problem[] = [
  {
    id: '1',
    title: 'Linked List Basics',
    description: 'Learn basic linked list operations',
    difficulty: 'Easy',
    category: 'linked-lists',
    explanation: 'A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node.',
    example: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);`
  },
  {
    id: '2',
    title: 'Linked List Traversal',
    description: 'Learn how to traverse a linked list',
    difficulty: 'Easy',
    category: 'linked-lists',
    explanation: 'Traversing a linked list involves visiting each node in sequence.',
    example: `function traverseList(head) {
  let current = head;
  while (current) {
    console.log(current.value);
    current = current.next;
  }
}

// Example usage:
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
traverseList(list.head); // ➤ 1, 2, 3`
  },
  {
    id: '3',
    title: 'Insert Node',
    description: 'Learn how to insert a node in a linked list',
    difficulty: 'Medium',
    category: 'linked-lists',
    explanation: 'Inserting a node requires updating the next pointers of surrounding nodes.',
    example: `function insertNode(head, value, position) {
  const newNode = new Node(value);
  if (position === 0) {
    newNode.next = head;
    return newNode;
  }
  let current = head;
  let count = 0;
  while (count < position - 1 && current) {
    current = current.next;
    count++;
  }
  if (current) {
    newNode.next = current.next;
    current.next = newNode;
  }
  return head;
}`
  },
  {
    id: '4',
    title: 'Delete Node',
    description: 'Learn how to delete a node from a linked list',
    difficulty: 'Medium',
    category: 'linked-lists',
    explanation: 'Deleting a node requires updating the next pointer of the previous node.',
    example: `function deleteNode(head, value) {
  if (!head) return null;
  if (head.value === value) {
    return head.next;
  }
  let current = head;
  while (current.next) {
    if (current.next.value === value) {
      current.next = current.next.next;
      break;
    }
    current = current.next;
  }
  return head;
}`
  },
  {
    id: '5',
    title: 'Reverse Linked List',
    description: 'Learn how to reverse a linked list',
    difficulty: 'Medium',
    category: 'linked-lists',
    explanation: 'Reversing a linked list involves changing the direction of all next pointers.',
    example: `function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`
  },
  {
    id: '6',
    title: 'Detect Cycle',
    description: 'Learn how to detect a cycle in a linked list',
    difficulty: 'Hard',
    category: 'linked-lists',
    explanation: 'A cycle in a linked list occurs when a node points to a previous node in the list.',
    example: `function hasCycle(head) {
  if (!head || !head.next) return false;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`
  }
] 