import {
  createStyles,
  makeStyles,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
} from "@material-ui/core";
import React from "react";
import { StyledTableCell } from "./TableCell";
import { Order } from "./tableUtils";

const useSortableTableHeadStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }),
);

export type HeaderInfo<T> = {
  id: keyof T;
  label: string;
  numeric: boolean;
};

type SortableTableHeadProps<T> = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string | null;
  headerInfo: HeaderInfo<T>[];
};

const SortableTableHead = <T,>(props: SortableTableHeadProps<T>) => {
  const { order, orderBy, onRequestSort, headerInfo } = props;
  const classes = useSortableTableHeadStyles();
  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headerInfo.map((headerInfo) => (
          <StyledTableCell
            key={headerInfo.label}
            align={headerInfo.numeric ? "right" : "left"}
            sortDirection={orderBy === headerInfo.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headerInfo.id}
              direction={orderBy === headerInfo.id ? order : "asc"}
              onClick={createSortHandler(headerInfo.id)}
            >
              {headerInfo.label}
              {orderBy === headerInfo.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SortableTableHead;
