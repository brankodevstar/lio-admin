import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Members from "../../pages/members";
import Announcements from "../../pages/announcements";
import Investments from "../../pages/investments";
import Events from "../../pages/events";
import Benefits from "../../pages/benefits";
import Gallerys from "../../pages/gallerys";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
    var classes = useStyles();

    // global
    var layoutState = useLayoutState();

    return (
        <div className={classes.root}>
            <>
                <Header history={props.history} />
                <Sidebar />
                <div
                    className={classnames(classes.content, {
                        [classes.contentShift]: layoutState.isSidebarOpened,
                    })}
                >
                    <div className={classes.fakeToolbar} />
                    <Switch>
                        <Route path="/app/dashboard" component={Dashboard} />
                        <Route path="/app/typography" component={Typography} />
                        <Route path="/app/tables" component={Tables} />
                        <Route
                            path="/app/notifications"
                            component={Notifications}
                        />
                        <Route
                            exact
                            path="/app/ui"
                            render={() => <Redirect to="/app/ui/icons" />}
                        />
                        <Route path="/app/ui/maps" component={Maps} />
                        <Route path="/app/ui/icons" component={Icons} />
                        <Route path="/app/ui/charts" component={Charts} />
                        <Route path="/app/members" component={Members} />
                        <Route
                            path="/app/announcements"
                            component={Announcements}
                        />
                        <Route
                            path="/app/investments"
                            component={Investments}
                        />
                        <Route path="/app/events" component={Events} />
                        <Route path="/app/benefits" component={Benefits} />
                        <Route path="/app/gallerys" component={Gallerys} />
                    </Switch>
                </div>
            </>
        </div>
    );
}

export default withRouter(Layout);
