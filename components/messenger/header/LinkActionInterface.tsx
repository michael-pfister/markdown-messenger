import { css } from "@emotion/react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";

const styles = {
    root: css`
        padding: 0 1em;
        display: flex;
        gap: 1em;
        justify-content: right;
    `,

    icon: css`
        cursor: pointer;
    `
}

const LinkActionInterface = () =>{
    return <div css={styles.root}>
        <Link href="/invite">
            <a target="_blank"><PersonAddIcon /></a>
        </Link>
        <Link href="/settings">
            <a target="_blank"><SettingsIcon /></a>
        </Link>
    </div>
}

export default LinkActionInterface;
