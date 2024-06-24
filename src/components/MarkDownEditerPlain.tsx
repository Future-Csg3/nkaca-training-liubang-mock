import "easymde/dist/easymde.min.css";
import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";

import Stack from "@mui/material/Stack";

import PreviewIcon from '@mui/icons-material/Preview';
import VerticalSplitSharpIcon from '@mui/icons-material/VerticalSplitSharp';
import Divider from '@mui/material/Divider';
import TextField from "@mui/material/TextField";
import MarkDownViewer from "./MarkDownViewer";

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
  const [isSplit, setIsSplit] = useState(false);

  return (
    <>
      <Container>
        <Stack spacing={1} divider={<Divider flexItem />}>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <IconButton onClick={() => {
              if (isSplit) {
                return
              }
              setIsView(!isView)
            }}>
              <PreviewIcon color={isView ? "action" : "disabled"} fontSize="small"></PreviewIcon>
            </IconButton>
            <IconButton onClick={() => {
              setIsView(false)
              setIsSplit(!isSplit)
            }}>
              <VerticalSplitSharpIcon color={isSplit ? "action" : "disabled"} fontSize="small"></VerticalSplitSharpIcon>
            </IconButton>
          </Stack>
          {isSplit ? (
            <>
              <Stack direction="row" spacing={0.2} divider={<Divider orientation="vertical" color="black" flexItem />}>
                <Content>
                  <TextField
                    id="filled-multiline-static"
                    multiline
                    rows={10}
                    defaultValue={raw}
                    fullWidth
                    onChange={(e) => onChange(e.target.value)}
                    sx={{
                      'fieldset': {
                        border: 'none'
                      }
                    }}
                  />
                </Content>
                <Content>
                  <MarkDownViewer props={{ raw: raw }} />
                </Content>
              </Stack>
            </>
          ) : isView ? (
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
              sx={{
                'fieldset': {
                  border: 'none'
                }
              }}
            />
          )
          }

        </Stack>
      </Container>
    </>
  );
};

const Container = styled("div")({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1.5px grey",
  padding: "10px",
  borderRadius: "5px"
});

const Content = styled("div")({
  width: "50%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
});

export default MarkDownEditorPlain;
