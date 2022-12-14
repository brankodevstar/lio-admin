import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
    LocalActivity as LocalActivityIcon,
    Home as HomeIcon,
    NotificationsNone as NotificationsIcon,
    FormatSize as TypographyIcon,
    FilterNone as UIElementsIcon,
    BorderAll as TableIcon,
    ArrowBack as ArrowBackIcon,
    People as PeopleIcon,
    Event as EventIcon,
    Assessment as AssessmentIcon,
    Image as ImageIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
    // { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
    // {
    //   id: 1,
    //   label: "Typography",
    //   link: "/app/typography",
    //   icon: <TypographyIcon />,
    // },
    // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
    // {
    //   id: 3,
    //   label: "Notifications",
    //   link: "/app/notifications",
    //   icon: <NotificationsIcon />,
    // },
    // {
    //   id: 4,
    //   label: "UI Elements",
    //   link: "/app/ui",
    //   icon: <UIElementsIcon />,
    //   children: [
    //     { label: "Icons", link: "/app/ui/icons" },
    //     { label: "Charts", link: "/app/ui/charts" },
    //     { label: "Maps", link: "/app/ui/maps" },
    //   ],
    // },
    {
        id: 5,
        label: "Members",
        link: "/app/members",
        icon: <PeopleIcon />,
    },
    {
        id: 6,
        label: "Announcements",
        link: "/app/announcements",
        icon: <NotificationsIcon />,
    },
    {
        id: 7,
        label: "Investments",
        link: "/app/investments",
        icon: <AssessmentIcon />,
    },
    {
        id: 8,
        label: "Events",
        link: "/app/events",
        icon: <EventIcon />,
    },
    {
        id: 9,
        label: "Benefits",
        link: "/app/benefits",
        icon: <LocalActivityIcon />,
    },
    {
        id: 10,
        label: "Gallerys",
        link: "/app/gallerys",
        icon: <ImageIcon />,
    },
];

function Sidebar({ location }) {
    var classes = useStyles();
    var theme = useTheme();

    // global
    var { isSidebarOpened } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    // local
    var [isPermanent, setPermanent] = useState(true);

    useEffect(function () {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened,
                }),
            }}
            open={isSidebarOpened}
        >
            <div className={classes.toolbar} />
            <div className={classes.mobileBackButton}>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(
                                classes.headerIcon,
                                classes.headerIconCollapse,
                            ),
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {structure.map((link) => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        isSidebarOpened={isSidebarOpened}
                        {...link}
                    />
                ))}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        var windowWidth = window.innerWidth;
        var breakpointWidth = theme.breakpoints.values.md;
        var isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

export default withRouter(Sidebar);
