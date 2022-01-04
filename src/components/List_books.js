import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ListBooks(props) {
  let books = props.books;
  const readers = books
    .map((book) => book.reader)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  const months = books
    .map((book) => book.month_read)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  const classes = useStyles();
  const [reader, setReader] = React.useState("");
  const [month, setMonth] = React.useState("");

  const handleChangeReader = (event) => {
    setReader(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  return (
    <React.Fragment>
      <Title>
        Prebrane knjige{" "}
        <FormControl className={classes.formControl}>
          <InputLabel id="select-name_label">Filtriraj po bralcih</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={reader}
            onChange={handleChangeReader}
          >
            <MenuItem value="">
              <em>Vsi bralci</em>
            </MenuItem>
            {readers.map((reader) => (
              <MenuItem value={reader}>{reader}</MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
        <FormControl className={classes.formControl}>
          <InputLabel id="select-name_label">Filtriraj po mesecih</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={month}
            onChange={handleChangeMonth}
          >
            <MenuItem value="">
              <em>Vsi meseci</em>
            </MenuItem>
            {months.map((month) => (
              <MenuItem value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Datum</TableCell>
            <TableCell>Bralec</TableCell>
            <TableCell>Naslov knjige</TableCell>
            <TableCell>Žanr</TableCell>
            <TableCell>Avtor</TableCell>
            <TableCell>Št. Strani</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reader === "" && month === ""
            ? books
                .map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.date_read}</TableCell>
                    <TableCell>{book.reader}</TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                  </TableRow>
                ))
                .reverse()
            : month === ""
            ? books

                .filter((book) => book.reader === reader)
                .map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.date_read}</TableCell>
                    <TableCell>{book.reader}</TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                  </TableRow>
                ))
                .reverse()
            : reader === ""
            ? books

                .filter((book) => book.month_read === month)
                .map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.date_read}</TableCell>
                    <TableCell>{book.reader}</TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                  </TableRow>
                ))
                .reverse()
            : books

                .filter((book) => book.month_read === month)
                .filter((book) => book.reader === reader)
                .map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.date_read}</TableCell>
                    <TableCell>{book.reader}</TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                  </TableRow>
                ))
                .reverse()}
        </TableBody>
      </Table>
      <br />
    </React.Fragment>
  );
}
