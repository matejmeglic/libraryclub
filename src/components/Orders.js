import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();

  let books = props.books;

  return (
    <React.Fragment>
      <Title>Prebrane knjige</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Datum</TableCell>
            <TableCell>Bralec</TableCell>
            <TableCell>Naslov knjige</TableCell>

            <TableCell>Avtor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.reverse().map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.date_read}</TableCell>
              <TableCell>{book.reader}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Več knjig
        </Link>
      </div>
    </React.Fragment>
  );
}
