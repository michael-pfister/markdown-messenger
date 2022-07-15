import { css } from "@emotion/react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";

const styles = {
    root: css`
        margin: 0 2em;
        display: flex;
        align-items: center;
        justify-content: space-between; 
    `,

    heading: css`
        display: flex;
        gap: 0.5em;
        font-weight: lighter;
        align-items: center;

        .icon{
            width: 20px;
            height: 20px;
            background-image: url('/images/logo.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 20px;
        }
    `,

    navigation: css`
        display: flex;
        gap: 4em;

        a{
        text-decoration: none;
        font-weight: lighter;
        color: black;
        }

        h3{
        font-weight: lighter;
        cursor: pointer;
        }
    `,

    mobile: {

        button: css`
        background: none;
            border: none;
            padding: 0;
            cursor: pointer;

        .rotation{
            animation: rotate 0.5s ease;
        }

        @keyframes rotate{
            to{
            transform: rotate(180deg);
            }
        }

        .rotationBack{
            animation: rotateBack 0.5s ease;
        }

        @keyframes rotateBack{
            from{
            transform: rotate(180deg);
            }
            to{
            transform: rotate(0);
            }
        }
        `,

        list: css`
            position: absolute;
            right: 0;
            background-color: white;

            animation: scaleIn 0.5s ease;

            @keyframes scaleIn{
                from{
                transform: scale(0);
                }
                to{
                transform: scale(1);
                }
            }
        `
    }
}

type MenuItem = {
    title: string;
    link: string;
}

const checkWindowSize = (setMobile: Dispatch<SetStateAction<boolean>>) => {
    setMobile(window.innerWidth - window.innerHeight > 0 ? true : false);
}

const ResponsiveAppBar = ({menuItems}: {menuItems: Array<MenuItem>}) => {
    const MobileList = () => {
        return <List css={styles.mobile.list}>
          {menuItems.map((menuItem, index)=>{
            return <ListItem key={`mobile_menu_item_${index}`} disablePadding>
              <Link href={menuItem.link}>
                <ListItemButton>
                  <ListItemText primary={menuItem.title}/>
                </ListItemButton>
              </Link>
            </ListItem>;
          })}
        </List>;
    }

    const [mobile, setMobile] = useState(false);
    const [menuIconRotation, setMenuIconRotation] = useState(false);

    useEffect(()=>{
        window.addEventListener("resize", ()=>{checkWindowSize(setMobile)});
        checkWindowSize(setMobile);
    }, []);


    return <div css={styles.root}>
        <h3 css={styles.heading}>
            <span className="icon" />
            Markdown Messenger
        </h3>
        {mobile ? <nav css={styles.navigation}>
        {menuItems.map((menuItem, index)=>{
            return <Link href={menuItem.link} key={`menu_item_${index}`}>
            <h3>{menuItem.title}</h3>
            </Link>
        })}
        </nav> : <div>
            <button aria-label='open menu' css={styles.mobile.button} onClick={()=>{
            setMenuIconRotation(!menuIconRotation);
            }}>
            <MenuIcon className={menuIconRotation ? 'rotation' : 'rotationBack'}/>
            </button>
            {menuIconRotation ? <MobileList /> : null}  
        </div>
        }
    </div>;
}

export default ResponsiveAppBar;