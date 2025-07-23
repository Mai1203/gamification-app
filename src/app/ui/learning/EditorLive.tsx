'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

type Props = {
  defaultCode: string;
};

export default function EditorLive({ defaultCode }: Props) {
  const [code, setCode] = useState(defaultCode);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md dark:bg-zinc-900">
      <Editor
        height="300px"
        defaultLanguage="html"
        defaultValue={defaultCode}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
      />
      <div className="mt-4 bg-white p-4 dark:bg-zinc-800">
        <iframe
          className="w-full h-64 border rounded"
          srcDoc={code}
          title="Resultado"
        />
      </div>
    </div>
  );
}