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
import { filtersProblems } from './filtersProblems'
import { polyfillsProblems } from './polyfillsProblems'
import { objectArrayMixProblems } from './objectArrayMixProblems'
import { nestedArrayMutationProblems } from './nestedArrayMutationProblems'
import { bigONotationProblems } from './bigONotationProblems'
import { weiredJSProblems } from './weiredJSProblems'
import { oopsConceptsProblems } from './oopsConceptsProblems'
import { thisKeywordProblems } from './thisKeywordProblems'
import { miscProblems } from './miscProblems'
import { promiseProblems } from './promiseProblems'
import { typescriptProblems } from './typescriptProblems'
import { awsServicesProblems } from './awsServicesProblems'
import { architectureIntermediateProblems } from './architectureIntermediateProblems'
import { architectureAdvancedProblems } from './architectureAdvancedProblems'
import { architectureDeploymentProblems } from './architectureDeploymentProblems'
import { reactNextProblems } from './reactNextProblems'

export const problems: Record<string, Problem[]> = {
  loop: loopsProblems,
  strings: stringsProblems,
  arrays: arraysProblems,
  linkedList: linkedListProblems,
  trees: treesProblems,
  graphs: graphsProblems,
  dynamicProgramming: dynamicProgrammingProblems,
  sorting: sortingProblems,
  recursion: recursionProblems,
  filters: filtersProblems,
  polyfills: polyfillsProblems,
  'object-array-mix': objectArrayMixProblems,
  'nested-array-mutation-spread': nestedArrayMutationProblems,
  'big-o-notation': bigONotationProblems,
  'weired-js': weiredJSProblems,
  'oops-concepts': oopsConceptsProblems,
  'this-keyword': thisKeywordProblems,
  'misc': miscProblems,
  promises: promiseProblems,
  'typescript': typescriptProblems,
  'aws-services': awsServicesProblems,
  'architecture-intermediate': architectureIntermediateProblems,
  'architecture-advanced': architectureAdvancedProblems,
  'architecture-deployment': architectureDeploymentProblems,
  'react-next': reactNextProblems
} 