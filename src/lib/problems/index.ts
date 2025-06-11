import { Problem } from '@/types'
import { loopsProblems } from './loopsProblems'
import { stringsProblems } from './stringsProblems'
import { arraysProblems } from './arraysProblems'
import { linkedListProblems } from './linkedListProblems'
import { treesProblems } from './treesProblems'
import { graphsProblems } from './graphsProblems'
import { dynamicProgrammingProblems } from './dynamicProgrammingProblems'
import { sortingProblems } from './sortingProblems'
import { recursionProblems } from './recursionProblems'

export const problems: Record<string, Problem[]> = {
  'loop': loopsProblems,
  'strings': stringsProblems,
  'arrays': arraysProblems,
  'linked-lists': linkedListProblems,
  'trees': treesProblems,
  'graphs': graphsProblems,
  'dynamic-programming': dynamicProgrammingProblems,
  'sorting': sortingProblems,
  'recursion': recursionProblems
} 