import { json } from '@codemirror/lang-json';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import CodeMirror from '@uiw/react-codemirror';
import React, { useCallback, useState } from 'react';

type CodeEditorProps = {
	minHeight: string;
	minWidth: string;
	width: string;
	maxWidth: string;
	code: string;
	onChange: (value: string) => void;
};

export default function CodeEditor({
	minHeight,
	minWidth,
	width,
	maxWidth,
	code,
	onChange,
}: CodeEditorProps) {
	return (
		<CodeMirror
			value={code}
			theme={tokyoNightStorm}
			minHeight={minHeight}
			minWidth={minWidth}
			width={width}
			maxWidth={maxWidth}
			placeholder={`{
	"key": "value"
}
`}
			extensions={[json()]}
			onChange={onChange}
		/>
	);
}
