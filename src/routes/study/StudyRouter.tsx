import { useState } from "react";
import StudyFrame, { StudyFrameProps } from "./components/StudyFrame";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { callThemeGetApi } from '../../apis/theme/ThemeApi';

import Landing from "./components/Landing";

const StudyRouter: React.FC<StudyFrameProps> = ({ props }) => {

    const sessionKey = sessionStorage.getItem('x-session-key');

    if (sessionKey == null) {
        document.location = "/study/login";
        return <></>
    }

    return (
        <StudyFrame props={props} />
    );
}

export default StudyRouter;