import { ClassNames } from "@emotion/react";
import React from "react";
import "./CreatePost.css";
import { Editor } from "@tinymce/tinymce-react";

export const CreatePost = () => {
  return (
    <div>
      <div className="img">
        <input
          className="img1"
          type="file"
          id="img"
          name="img"
          accept="image/*"
        />
      </div>
      <div className="Create">
        <input type="text" class="input" placeholder="Tiêu đề" />
      </div>
      <div className="Create">
        <input
          type="text"
          class="input"
          placeholder="Gắn thẻ bài viết của bạn . Tối đa 5 thẻ . Ít nhất 1 thẻ!"
        />
      </div>
      <div className="editor">
        <Editor
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
          // onEditorChange={this.handleEditorChange}
          // value={this.state.editorContent}
          init={{
            icons: "jam",
            skin: "fabric",
            content_css: "document",
            resize: false,
          }}
        />
      </div>
      <div class="card-bottom">
        <button type="button">Create</button>
        <button type="button">Cancel</button>
      </div>
    </div>
  );
};
