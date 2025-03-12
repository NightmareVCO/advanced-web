import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';

import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

type CodeEditorProps = {
	minHeight: string;
	minWidth: string;
	width: string;
	maxWidth: string;
	code: string;
	extension: string;
	onChange: (value: string) => void;
};

export default function CodeEditor({
	minHeight,
	minWidth,
	width,
	maxWidth,
	code,
	extension,
	onChange,
}: CodeEditorProps) {
	switch (extension) {
		case 'json':
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
		case 'xml':
			return (
				<CodeMirror
					value={code}
					theme={tokyoNightStorm}
					minHeight={minHeight}
					minWidth={minWidth}
					width={width}
					maxWidth={maxWidth}
					placeholder={`<root>
	<child>value</child>
</root>
`}
					extensions={[xml()]}
					onChange={onChange}
				/>
			);
		case 'html':
			return (
				<CodeMirror
					value={code}
					theme={tokyoNightStorm}
					minHeight={minHeight}
					minWidth={minWidth}
					width={width}
					maxWidth={maxWidth}
					placeholder={`<!DOCTYPE html>
<html>
	<head>
		<title>Title</title>
	</head>
	<body>
		<p>Content</p>
	</body>
</html>
`}
					extensions={[html()]}
					onChange={onChange}
				/>
			);
		default:
			break;
	}
}
