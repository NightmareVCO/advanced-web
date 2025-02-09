import { json } from '@codemirror/lang-json';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import CodeMirror from '@uiw/react-codemirror';
import React, { useCallback, useState } from 'react';

export default function CodeEditor() {
	const [value, setValue] = useState<string>();

	const onChange = useCallback((value: string) => {
		setValue(value);
	}, []);
	return (
		<CodeMirror
			value={value}
			theme={tokyoNightStorm}
			minHeight="20rem"
			minWidth="40rem"
			width="77rem"
			maxWidth="77rem"
			placeholder={`{
	"key": "value"
}
`}
			extensions={[json()]}
			onChange={onChange}
		/>
	);
}
