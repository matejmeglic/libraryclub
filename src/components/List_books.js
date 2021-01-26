import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

export default function ListBooks(props) {
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
            <TableCell>Št. Strani</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.reverse().map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.date_read}</TableCell>
              <TableCell>{book.reader}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.pages}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
