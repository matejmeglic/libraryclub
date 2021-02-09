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
import Title from "./Title";
import Katja from "../assets/Katja_200.png";
import Tjasa from "../assets/Tjasa_200.png";
import Matej from "../assets/Matej_200.png";

// concatenate URL
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
  badgeColor: {
    fill: "#82ffa1",
  },
  authorPic: {
    borderRadius: "50%",
    width: "50%",
    height: "auto",
  },
  footerText: {
    color: "#ffffff",
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
  const authorPic = clsx(classes.paper, classes.authorPic);
  const footerText = clsx(classes.paper, classes.footerText);

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
                  title="Mesečni cilj skupaj"
                  monthy={true}
                  monthly_gray={["Mesečni cilj sezone", "#d4d4d4", 1]}
                  button={false}
                  show_season_lines={true}
                  season_lines={[["Skupaj", "#3f51b5", 5]]}
                />
              </Paper>
            </Grid>

            {/* List_books */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ListBooks books={props.json.books} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* Footer */}
        <div
          style={{
            background: "linear-gradient(to right bottom, #430089, #82ffa1)",
          }}
        >
          <br />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container justify="center" spacing={3}>
              <br />
              <Grid item xs={11} md={6}>
                <Typography component="h2" variant="h6" className={footerText}>
                  Kaj je Bookiranje?
                </Typography>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  Božič 2020 smo ob poplavi slaščic preživeli v družinskem
                  mehurčku. Ob poplavi slabih idej za preživljanje prostega časa
                  se je rodila zasebna Facebook skupina Bookiranje z izzivom, da
                  vsak družinski član prebere eno knjigo na mesec. Našli smo
                  zagon in čez novo leto komaj govorili drug z drugim. Pritisk
                  skupnosti "Peer pressure" je naredil svoje in kaj kmalu se je
                  začelo primerjanje knjig, izmenjava mnenj in priporočil. Kmalu
                  za tem se je rodila aplikacija Bookiranje, ki skupinam omogoča
                  enostaven vnos in vpogled v skupne bralne cilje, osnovne
                  bralne karakteristike, ter jih pri branju vzpodbuja na
                  netekmovalen način. Pri nas se netekmovalnost seveda ni izšla,
                  saj smo že prvi mesec namesto osmih prebrali 24 knjig. :)
                </Typography>
                <Typography component="h2" variant="h6" className={footerText}>
                  Kaj Bookiranje omogoča?
                </Typography>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  Aplikacija Bookiranje omogoča enostavno administracijo
                  skupine, določanje bralnih sezon, ciljev sezone (skupno
                  število prebranih knjig na skupino), ter mesečnih ciljev
                  (število prebranih knjig na mesec na člana skupine). Ob
                  vestnem zbiranju in enostavnem vnosu podatkov so podatki
                  ažurni, ter omogočajo vpogled v bralne navadi članov. Namen
                  aplikacije ni krepljenje tekmovalnosti temveč neinvazivno
                  spodbujanje rednega branja ter sodelovanja proti skupnemu
                  cilju.
                </Typography>
              </Grid>
              <Grid item xs={9} md={6}>
                <Typography component="h2" variant="h6" className={footerText}>
                  GDPR? Piškotki?
                </Typography>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  Bookiranje uporabniki uporabljajo prostovoljno in samostojno
                  vnašajo podatke o prebranih knjigah. Avtorji predlagamo, da
                  člani skupine ne uporabljajo polnih imen, v kolikor jim je
                  anonimnost pomembna (Primer MatejM namesto Matej Megilč).
                  Avtorji strani za vsebino znotraj posamezna skupine ne
                  odgovarjajo, lahko pa za potrebe nadalnjega razvoja in
                  raziskav uporabljajo vnesene bralne statistike. Do podatkov o
                  skupini lahko uporabnik dostopa le, če pozna ime skupine.
                  Stran ne uporablja piškotkov, avtorji pa jih imamo še posebej
                  radi. :)
                </Typography>
                <Typography component="h2" variant="h6" className={footerText}>
                  Kako lahko začnem Bookirati
                </Typography>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  V beta fazi nove skupine sprejemamo preko e-mail naslova
                  matej@matejmeglic.com. Po spoznavnem emailu vam pripravimo
                  prijavne podatke na nivoju skupine, nastavimo prvo sezono, ter
                  pošljemo osnovno dokumentacijo, ki vam bo v pomoč pri prvem
                  vnosu prebranih knjig. Beta dostop pomeni, da bodo vaša mnenja
                  slišana ter, da imate možnost aktivno sodelovati pri
                  dopolnjevanju aplikacije (levi meni je trenutno brez funkcije,
                  vemo :D ).
                </Typography>
                <Typography component="h2" variant="h6" className={footerText}>
                  Cena Bookiranja
                </Typography>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  Cena na skupino na sezono znaša 20 eur. V zameno za platformo
                  nam častite eno knjigo. Vnaprej najlepša hvala.
                </Typography>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container justify="center" spacing={3}>
              <Grid item xs={11} md={3} lg={3}>
                <div align="center">
                  <img
                    src={Matej}
                    alt="Matej Meglič"
                    className={classes.authorPic}
                  />
                  <Title align="center">
                    <Link
                      className={footerText}
                      underline="none"
                      href="https://matejmeglic.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Matej Meglič
                    </Link>
                  </Title>
                </div>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  Ljubitelj analize podatkov, razvoja produkta in hobby-art
                  programer, ki v težavah vidi izzive, v branju pa izgubljeno
                  umetnost.
                </Typography>
              </Grid>
              <Grid item xs={11} md={3} lg={3}>
                <div align="center">
                  <img
                    src={Katja}
                    alt="Katja Kern"
                    className={classes.authorPic}
                  />
                  <Title className={footerText} align="center">
                    <Link underline="none" className={footerText} href="#">
                      Katja Kern
                    </Link>
                  </Title>
                </div>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  Idejna vodja projekta, zagrizena zagovornica uporabniške
                  izkušnje, zanesenjaška ustvarjalka in ljubiteljica vsega
                  lepega. Pogosto poseže tudi po poeziji.
                </Typography>
              </Grid>
              <Grid item xs={11} md={3} lg={3}>
                <div align="center">
                  <img
                    src={Tjasa}
                    alt="Tjaša Kern"
                    className={classes.authorPic}
                  />
                  <Title align="center">
                    <Link
                      underline="none"
                      className={footerText}
                      href="https://anomalo.si"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tjaša Kern
                    </Link>
                  </Title>
                </div>
                <Typography
                  className={footerText}
                  align="justify"
                  variant="body1"
                  component="p"
                >
                  Ko-vodja projekta, kreatorka vektorskih risb in bloga
                  Anomalo.si, izpopolnjevalka funkcionalnosti, ter glavna
                  zagovornica slogana Knjige namesto telefona.
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Box pt={4}>
            <Typography className={footerText} align="center">
              <Link color="inherit" href="https://matejmeglic.com">
                Veselo bookiranje!
              </Link>{" "}
              {new Date().getFullYear()}
            </Typography>
            <br />
          </Box>
        </div>
      </main>
    </div>
  );
}
