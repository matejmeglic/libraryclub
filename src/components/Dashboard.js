import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TextField from "@material-ui/core/TextField";
import { mainListItems } from "./listItems";
import { Button } from "@material-ui/core";
import Chart from "./Chart";
import TotalTeam from "./Total_team";
import ListBooks from "./List_books";
import ReaderCard from "./ReaderCard";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Vse pravice pridržane © "}
      <Link color="inherit" href="https://matejmeglic.com">
        Bookiranje
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function RenderNewTeam() {
  let team = document.getElementById("team").value;
  let season = document.getElementById("season").value;

  if ((team === "" && season === "") || (team === "" && season !== "")) {
    return window.open(`/`, "_self");
  } else if (team !== "" && season === "") {
    season = "ActiveSeason";
    return window.open(`/${team}/${season}`, "_self");
  } else if (team !== "" && season !== "") {
    return window.open(`/${team}/${season}`, "_self");
  }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("xs")]: {
      width: theme.spacing(0),
    },
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  readerHeight: {
    height: 500,
  },
  chartHeight: {
    height: 380,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const readerHeightPaper = clsx(classes.paper, classes.readerHeight);
  const chartHeightPaper = clsx(classes.paper, classes.chartHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{
          background: "linear-gradient(to right bottom, #430089, #82ffa1)",
        }}
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Bookiranje
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="team"
              size="small"
              label="Ekipa"
              style={{ marginLeft: "10px" }}
            />{" "}
            <TextField
              id="season"
              size="small"
              label="Sezona"
              style={{ marginLeft: "10px" }}
            />
            <Button
              variant="outlined"
              size="small"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              onClick={RenderNewTeam}
            >
              :)
            </Button>
          </form>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={chartHeightPaper}>
                <Chart
                  data={props.json.books_daily}
                  readers={props.json.readers_cumulative}
                  goals={props.json.goals}
                  dataKey="date"
                  title="Prebrane knjige"
                  monthy={true}
                  monthly_gray={["Mesečni cilj sezone", "#d4d4d4", 1]}
                  button={true}
                  button_text="Vse prebrane knjige"
                  show_season_lines={false}
                  season_lines={[
                    ["Cilj sezone", "#82ffa1", 4],
                    ["Skupaj", "#3f51b5", 5],
                  ]}
                />
              </Paper>
            </Grid>
            {/* Total team */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={chartHeightPaper}>
                <TotalTeam
                  readers_cumulative={props.json.readers_cumulative}
                  goals={props.json.goals}
                  today={
                    props.json.books_per_date[
                      props.json.books_per_date.length - 1
                    ].date
                  }
                />
              </Paper>
            </Grid>
            {/* ChartPages */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={chartHeightPaper}>
                <Chart
                  data={props.json.pages_daily}
                  readers={props.json.readers_cumulative}
                  goals={props.json.goals}
                  dataKey="date"
                  title="Prebrane strani"
                  monthy={false}
                  button={true}
                  button_text="Vse prebrane strani"
                  show_season_lines={false}
                  season_lines={[["Skupaj strani", "#3f51b5", 5]]}
                />
              </Paper>
            </Grid>
            {/* ChartAverage */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={chartHeightPaper}>
                <Chart
                  data={props.json.pages_daily_avg}
                  readers={props.json.readers_cumulative}
                  goals={props.json.goals}
                  dataKey="date"
                  title="Povprečje prebranih strani"
                  monthy={false}
                  button={true}
                  button_text="Skupno povprečje"
                  show_season_lines={false}
                  season_lines={[["Skupaj strani povprečje", "#3f51b5", 5]]}
                />
              </Paper>
            </Grid>
            {/* ChartMonthlyGoal optional*/}
            {props.json.goals.goal_per_month === true ? (
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={chartHeightPaper}>
                  <Chart
                    data={props.json.monthly_goal_daily}
                    readers={props.json.readers_cumulative}
                    goals={props.json.goals}
                    dataKey="date"
                    title="Mesečni cilj"
                    monthy={true}
                    monthly_gray={["Mesečni cilj vsi bralci", "#d4d4d4", 1]}
                    button={false}
                    show_season_lines={true}
                    season_lines={[["Skupaj", "#3f51b5", 5]]}
                  />
                </Paper>
              </Grid>
            ) : null}
            {/* ChartSeasonGoal optional*/}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={chartHeightPaper}>
                <Chart
                  data={props.json.books_daily}
                  readers={[]}
                  goals={props.json.goals}
                  dataKey="date"
                  title="Cilj sezone"
                  monthy={true}
                  monthly_gray={["Mesečni cilj sezone", "#d4d4d4", 1]}
                  button={false}
                  show_season_lines={true}
                  season_lines={[
                    ["Cilj sezone", "#82ffa1", 4],
                    ["Skupaj", "#3f51b5", 5],
                  ]}
                />
              </Paper>
            </Grid>
            {/* Readers Cards */}
            {props.json.readers_cumulative
              .sort((a, b) => (a.reader > b.reader ? 1 : -1))
              .map((item) => (
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={readerHeightPaper}>
                    <ReaderCard reader_info={item} goals={props.json.goals} />
                  </Paper>
                </Grid>
              ))}

            {/* List_books */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ListBooks books={props.json.books} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
