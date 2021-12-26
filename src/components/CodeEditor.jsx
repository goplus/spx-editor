import React from 'react';
import Editor from '@monaco-editor/react';

export default class CodeEditor1 extends React.Component {
	handleEditorDidMount = editor => {
    this.editor = editor;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.editor.layout({
      width: 'auto',
      height: 'auto',
    });
  }

  render() {
    return (
      <div className='code-editor flex flex-row flex-auto overflow-hidden'>
        <Editor className='flex-auto' onMount={this.handleEditorDidMount} />
      </div>
    );
  }
}
