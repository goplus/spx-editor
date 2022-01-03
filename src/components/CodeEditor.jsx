import React from 'react';
import {observer} from 'mobx-react';
import Editor from '@monaco-editor/react';

import VarList from './VarList';
import {genDeclCode} from '../lib/spxpack/decl';

class CodeEditor extends React.Component {
	handleEditorDidMount = editor => {
    this.editor = editor;
    this.onMount(editor);
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

  onMount = (editor) => {
    const {project, sprite} = this.props;
    const declCode = genDeclCode(project, sprite);
    const lineCount = declCode.split('\n').length;

    editor.onDidChangeCursorPosition((e) => {
      if (e.position.lineNumber < lineCount) {
        editor.setPosition({
          lineNumber:lineCount,
          column: 1
        });
      }
    });
  }

  onChange = (code, e) => {
    const {project, sprite} = this.props;
    const declCode = genDeclCode(project, sprite);
    code = code.substr(declCode.length);
    this.props.sprite.setCode(code);
  };

  render() {
    const {project, sprite} = this.props;

    const declCode = genDeclCode(project, sprite);
    const fullCode = declCode + sprite.code;

    return (
      <div className='code-editor flex flex-row flex-auto overflow-hidden space-x-0.5 bg-gray-300'>
        <VarList sprite={sprite} stage={project.stage} />
        <Editor className='flex-auto overflow-hidden'
          onMount={this.handleEditorDidMount}
          language='go'
          value={fullCode}
          onChange={this.onChange} />
      </div>
    );
  }
}

export default observer(CodeEditor);
