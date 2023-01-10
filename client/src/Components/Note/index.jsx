import { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useParams } from "react-router-dom";
function Note() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const note = {
    id: 999,
    content: "<p>This is new Text</p>",
  };
  const [rawHTML, setRawHTML] = useState(note.content);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const blocksFormHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFormHTML.contentBlocks,
      blocksFormHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    console.log(["Re-render"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder='Write something!'
    />
  );
}

export default Note;
