import React, { useState, useEffect } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import NavigationIcon from "@mui/icons-material/Navigation";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";

import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";

import Typography from "@mui/material/Typography";

import MarkDownEditorPlain from "../components/MarkDownEditerPlain";
import MarkDownViewer from "../components/MarkDownViewer";

const ExampleForm2Edit: React.FC = () => {
  const [lastName, setLastName] = useState("");
  const [fisrtName, setFirstName] = useState("");
  const [markdown, setMarkdown] = useState("");

  const onLastNameChange = (e: any) => {
    console.log("onLastNameChange");
    setLastName(e.target.value);
  };

  const onFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };

  useEffect(() => {
    const init = async () => {
      const objectJSON = sessionStorage.getItem("form2");
      if (objectJSON == null) {
        setLastName("John");
        setFirstName("Smith");
        setMarkdown("# 自己紹介\r\n## 趣味\r\n- 釣り");
      } else {
        const form = JSON.parse(objectJSON);
        setLastName(form.lastName);
        setFirstName(form.fisrtName);
        setMarkdown(form.markdown);
      }
    };
    init();
  }, []);

  const urlParams = useParams<{ operation: string }>();
  let isEdit = true;

  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`${pathname}/edit`);
  };

  const handleSave = () => {
    const form = {
      lastName: lastName,
      fisrtName: fisrtName,
      markdown: markdown,
    };
    const objectJSON = JSON.stringify(form);
    sessionStorage.setItem("form2", objectJSON);
    navigate(pathname.replace("/edit", ""));
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <Stack spacing={5}>
          <Stack direction="row" spacing={5}>
            {isEdit ? (
              <>
                {" "}
                <FormControl>
                  <TextField
                    type="text"
                    label="last name"
                    required
                    value={lastName}
                    onChange={onLastNameChange}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    type="text"
                    label="fisrt name"
                    required
                    value={fisrtName}
                    onChange={onFirstNameChange}
                  />
                </FormControl>
              </>
            ) : (
              <>
                <Typography variant="body1" gutterBottom>
                  {lastName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {fisrtName}
                </Typography>
              </>
            )}
          </Stack>
          {isEdit ? (
            <MarkDownEditorPlain
              props={{ markdown: markdown, handleMarkDownChange: setMarkdown }}
            />
          ) : (
            <MarkDownViewer props={{ raw: markdown }} />
          )}
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {isEdit ? (
              <Fab
                variant="extended"
                color="primary"
                onClick={() => {
                  handleSave();
                }}
              >
                <NavigationIcon sx={{ mr: 1 }} />
                Save
              </Fab>
            ) : (
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={() => {
                  handleEdit();
                }}
              >
                <EditIcon />
              </Fab>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
});

export default ExampleForm2Edit;
