import { Component, OnInit, Renderer2, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { EditorView, keymap } from "@codemirror/view";
import { ChangeSet, EditorState, Transaction } from "@codemirror/state";
import { lineNumberMarkers, lineNumbers } from "@codemirror/gutter";
import { history, redo, redoSelection, undo, undoSelection } from "@codemirror/history";
import { foldCode, unfoldCode, foldGutter } from "@codemirror/fold";
import { html } from "@codemirror/lang-html";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { defaultKeymap, indentMore, indentLess, standardKeymap, indentSelection, indentWithTab } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/matchbrackets";
import { closeBrackets } from "@codemirror/closebrackets";
import { autocompletion } from "@codemirror/autocomplete";
import { linter } from "@codemirror/lint";
import { basicSetup } from "@codemirror/basic-setup";
import { oneDark } from "@codemirror/theme-one-dark";
import { state } from '@angular/animations';


@Component({
  selector: 'blog-codemirror-editor',
  templateUrl: './codemirror-editor.component.html',
  styleUrls: ['./codemirror-editor.component.scss']
})
export class CodemirrorEditorComponent implements OnInit, OnChanges {

  @Input() code: string = '';
  @Output() codeChange = new EventEmitter<string>();

  //div: ElementRef;
  codemirror: EditorView;

  constructor(private renderer: Renderer2) {
    this.codemirror = new EditorView({
      state: EditorState.create({
        doc: this.code,
        extensions: [
          basicSetup,
          lineNumbers(), history(), foldGutter(), EditorView.lineWrapping,
          html(), /*linter(),*/
          defaultHighlightStyle,
          bracketMatching(), closeBrackets(),
          keymap.of([...standardKeymap, indentWithTab]),
          oneDark
        ]
      }),
      dispatch: (tr: Transaction) => {
        this.codemirror.update([tr]);
        this.codeChange.emit(this.codemirror.state.doc.toString());
      }
    });
  }

  ReplaceCode(newcode: string) {
    // create transaction for deleting all texts in doc
    const deleteTrans = this.codemirror.state.update(
      { changes: { from: 0, to: this.codemirror.state.doc.length } }
    );
    // execute transaction
    this.codemirror.update([deleteTrans]);

    // create transaction for inserting new text
    const insertTrans = this.codemirror.state.update(
      { changes: { from: 0, insert: newcode } }
    );
    // execute transcation
    this.codemirror.update([insertTrans]);
  }

  ngOnInit(): void {
    this.renderer.appendChild(
      this.renderer.selectRootElement('#main'), this.codemirror.dom);
  }

  ngOnChanges(): void {

  }
}
