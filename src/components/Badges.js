import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import parse from "html-react-parser";

// badges
import { ReactComponent as SVGthreeBooks } from "../assets/3knjigenamesec.svg";
import { ReactComponent as SVGsixmonths } from "../assets/6meseczapored.svg";
import { ReactComponent as SVG10kpages } from "../assets/10kprebranihstrani.svg";
import { ReactComponent as SVG1000pages } from "../assets/1kprebranihstrani.svg";
import { ReactComponent as SVGseasongoal } from "../assets/ciljsezone.svg";
import { ReactComponent as SVGfirstbook } from "../assets/mojaprvaknjiga.svg";

export default function Badges(props) {
  const badges = props.badges;

  const badgesComponents = [
    "SVGthreeBooks",
    "SVGsixmonths",
    "SVG10kpages",
    "SVG1000pages",
    "SVGseasongoal",
    "SVGfirstbook",
  ];

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
          <SVGfirstbook
            className={badges[0] === 0 ? badgeColor : activeBadgeColor}
          />
        </Grid>
        <Grid item xs={6}>
          <SVGthreeBooks
            className={badges[1] === 0 ? badgeColor : activeBadgeColor}
          />
        </Grid>
        <Grid item xs={6}>
          <SVG1000pages
            className={badges[2] === 0 ? badgeColor : activeBadgeColor}
          />
        </Grid>
        <Grid item xs={6}>
          <SVG10kpages
            className={badges[3] === 0 ? badgeColor : activeBadgeColor}
          />
        </Grid>
        <Grid item xs={6}>
          <SVGsixmonths
            className={badges[4] === 0 ? badgeColor : activeBadgeColor}
          />
        </Grid>
        <Grid item xs={6}>
          <SVGseasongoal
            className={badges[5] === 0 ? badgeColor : activeBadgeColor}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
