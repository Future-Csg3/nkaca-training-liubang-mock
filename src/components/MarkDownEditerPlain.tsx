import "easymde/dist/easymde.min.css";
import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";

import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import MarkDownViewer from "./MarkDownViewer";
import SearchIcon from "@mui/icons-material/Search";

import "easymde/dist/easymde.min.css";

interface ChapterCreateFormProp {
  props: {
    markdown: string;
    handleMarkDownChange: any;
  };
}

const MarkDownEditorPlain: React.FC<ChapterCreateFormProp> = ({ props }) => {
  const onChange = (e: string) => {
    setRaw(e);
    props.handleMarkDownChange(e);
  };

  const [raw, setRaw] = useState(props.markdown);
  const [isView, setIsView] = useState(false);

  return (
    <>
      <Container>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => setIsView(!isView)}>
              <SearchIcon></SearchIcon>
            </IconButton>
          </Stack>
          {isView ? (
            <>
              <MarkDownViewer props={{ raw: raw }} />
            </>
          ) : (
            <TextField
              id="filled-multiline-static"
              multiline
              rows={10}
              defaultValue={raw}
              fullWidth
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        </Stack>
      </Container>
    </>
  );
};

const Container = styled("div")({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px black",
  padding: "10px",
});

export default MarkDownEditorPlain;
