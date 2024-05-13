import React, { useEffect } from "react";


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import { callThemeAllGetApi } from "../../../apis/theme/ThemeApi";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Unstable_Grid2';

import { callThemePutApi } from "../../../apis/theme/ThemeApi";


import { callChapterAllGetApi, callChapterListGetApi } from "../../../apis/chapter/ChapterApi";

const ThemeSetting: React.FC = () => {

    const [themeIds, setThemeIds] = React.useState<readonly string[]>([]);
    const [themeId, setThemeId] = React.useState("")

    const handleThemeIdChange = (event: SelectChangeEvent) => {
        setThemeId(event.target.value as string);
    };

    const handleSave = () => {
        callThemePutApi(themeId, right)
            .then(function (response) {
                showSuccessToast(`Save Successfully!`);
            }).catch((err) => {
                // get error status
                console.error(err)
                showErrorToast(`Save Failed!`, 3000);
            });
    }

    const [checked, setChecked] = React.useState<readonly string[]>([]);
    const [left, setLeft] = React.useState<readonly string[]>([]);
    const [right, setRight] = React.useState<readonly string[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const themeIdOfChecked = (items: readonly string[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: readonly string[]) => () => {
        if (themeIdOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    useEffect(() => {
        callThemeAllGetApi()
            .then(function (response) {
                const themeIds = response.data.themes.map((e: any) => e.theme_id)
                setThemeIds(themeIds)
            }).catch((err) => {
                console.error(err);
            });
    }, [])

    useEffect(() => {
        if (themeId) {
            Promise.all([
                callChapterAllGetApi(),
                callChapterListGetApi(themeId),
            ]).then(([allRes, listRes]) => {
                const all = allRes.data.chapters.map((e: any) => e.chapter_id)
                const themeList = listRes.data.chapters.map((e: any) => e.chapter_id)
                setLeft(not(all, themeList))
                setRight(themeList)
            }).catch(([allError, listError]) => {

            });
        }
    }, [themeId])


    const customList = (title: React.ReactNode, items: readonly string[]) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={themeIdOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            themeIdOfChecked(items) !== items.length && themeIdOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${themeIdOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    height: 500,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: string) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );


    const showSuccessToast = (msg: any) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const showErrorToast = (msg: any, timer: any) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: timer ? timer : 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Box sx={{ maxWidth: '70%' }}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="select-theme-id-label">ThemeId</InputLabel>
                                <Select
                                    labelId="select-theme-id-label"
                                    id="select-theme-id"
                                    value={themeId}
                                    label="ThemeId"
                                    onChange={handleThemeIdChange}
                                >
                                    {themeIds.map((e, i) => {
                                        return (<MenuItem key={i} value={e}>{e}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={8}></Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid xs={5}>{customList('Unsettings', left)}</Grid>
                        <Grid xs={2}>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="large"
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="large"
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid xs={5}>{customList('Settings', right)}</Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid xs={4}></Grid>
                        <Grid xs={4}>
                            <Button fullWidth variant="contained" onClick={handleSave} >
                                Save
                            </Button>
                        </Grid>
                        <Grid xs={4}></Grid>
                    </Grid>
                </Stack>
            </Box >
        </>
    )
};

function not(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly string[], b: readonly string[]) {
    return [...a, ...not(b, a)];
}

export default ThemeSetting
