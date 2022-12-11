import React, { useState } from "react";
import "./EditPost.css";
import { createRoot } from "react-dom/client";
import { Box, Grid, Button } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import TagInput from "../../Job/TagInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function EditPost() {
  const [skills, setSkills] = useState(["MongoDb", "NodeJS"]);
  const rootElement = document.getElementById("root");
  const root = createRoot(rootElement);
  const getLocation = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorElSetting, setAnchorElSetting] = useState(null);
  // const {id,title,type,location,skills,jobDescription,companyUrl} = getLocation.state.edit;
  const handleOpenSetting = (event) => {
    setAnchorElSetting(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorElSetting(null);
  };
  return (
    <>
      <div class="left-content grid-66">
        <article class="main-article boxed ">
          <div className="Create2">
            <input type="text" class="input2" placeholder="Post Title" />
          </div>
          <TagInput skills={skills} />
          <section class="post-content">
            <div class="post-format-image post-format-wrapper ">
              <div className="img-post" class="editimg">
                <input className="input-img" type="file" />
              </div>
            </div>
            <div class="text">
              <Grid item xs={12}>
                <div className="editor">
                  <CKEditor
                    id="editor2"
                    editor={ClassicEditor}
                    // data={props.jobDescription}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                    }}
                    onReady={(editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "400px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                  />
                </div>
              </Grid>
            </div>
          </section>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ fontWeight: "bold", marginRight: "25px" }}
            >
              Update
            </Button>
            <Button variant="outlined" sx={{ fontWeight: "bold" }}>
              Cancel
            </Button>
          </Box>
        </article>
      </div>
    </>
  );
}
