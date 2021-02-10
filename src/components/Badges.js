import React from "react";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";

// badges
import { ReactComponent as SVGthreeBooks } from "../assets/3knjigenamesec.svg";
import { ReactComponent as SVGsixmonths } from "../assets/6meseczapored.svg";
import { ReactComponent as SVG10kpages } from "../assets/10kprebranihstrani.svg";
import { ReactComponent as SVG1000pages } from "../assets/1kprebranihstrani.svg";
import { ReactComponent as SVGseasongoal } from "../assets/ciljsezone.svg";
import { ReactComponent as SVGfirstbook } from "../assets/mojaprvaknjiga.svg";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

export default function Badges(props) {
  const badges = props.badges;

  const useStyles = makeStyles((theme) => ({
    badgeColor: {
      fill: "#d4d4d4",
      width: "80%",
      height: "auto",
    },
    activeBadgeColor: {
      fill: props.color,
      width: "80%",
      height: "auto",
    },
    gridHeight: {
      height: "80%",
    },
  }));

  const classes = useStyles();
  const badgeColor = clsx(classes.paper, classes.badgeColor);
  const activeBadgeColor = clsx(classes.paper, classes.activeBadgeColor);
  const gridHeight = clsx(classes.paper, classes.gridHeight);

  return (
    <React.Fragment>
      <br /> <br />
      <Grid container spacing={1} align="center" className={gridHeight}>
        <Grid item xs={6}>
          <LightTooltip title="Prva prebrana knjiga v sezoni">
            <SVGfirstbook
              className={badges[0] === 0 ? badgeColor : activeBadgeColor}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={6}>
          <LightTooltip title="Tri prebrane knjige">
            <SVGthreeBooks
              className={badges[1] === 0 ? badgeColor : activeBadgeColor}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={6}>
          <LightTooltip title="Prebranih 1000 strani">
            <SVG1000pages
              className={badges[2] === 0 ? badgeColor : activeBadgeColor}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={6}>
          <LightTooltip title="Prebranih 10.000 strani">
            <SVG10kpages
              className={badges[3] === 0 ? badgeColor : activeBadgeColor}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={6}>
          <LightTooltip title="6 zaporednih mesecev s prebrano knjigo">
            <SVGsixmonths
              className={badges[4] === 0 ? badgeColor : activeBadgeColor}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={6}>
          <LightTooltip title="Sezonski mesečni cilj izpolnjen">
            <SVGseasongoal
              className={badges[5] === 0 ? badgeColor : activeBadgeColor}
            />
          </LightTooltip>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
