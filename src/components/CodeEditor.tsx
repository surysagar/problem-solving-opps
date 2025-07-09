'use client'

import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  value?: string
  onChange?: (value: string | undefined) => void
}

export default function CodeEditor({ value = '', onChange }: CodeEditorProps) {
  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme('whiteEditor', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff', // White background
        'editor.foreground': '#000000', // Black text
      }
    });
  };

  return (
    <div className="h-full border rounded-md overflow-hidden">
      <Editor
        height="600px"
        defaultLanguage="javascript"
        value={value}
        onChange={onChange}
        theme="whiteEditor"
        beforeMount={handleEditorWillMount}
        options={{
          minimap: { enabled: false },
          fontSize: 18,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          padding: { top: 14 },
          wordWrapColumn: 80,
          wrappingIndent: 'indent',
        }}
      />
    </div>
  )
} 