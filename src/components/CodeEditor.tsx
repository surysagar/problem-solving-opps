'use client'

import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  value?: string
  onChange?: (value: string | undefined) => void
}

export default function CodeEditor({ value = '', onChange }: CodeEditorProps) {
  return (
    <div className="h-full border rounded-md overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  )
} 