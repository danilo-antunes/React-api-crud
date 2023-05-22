import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { orderBy } from "@progress/kendo-data-query";

const buttons = [
  <Button
    key="detail"
    onClick={() => {
      setData(dataApi);
      router.push("/detailmeter");
    }}
  >
    Detail
  </Button>,
  <Button key="edit" color="info">
    Edit
  </Button>,
  <Button key="delete" color="error">
    Delete
  </Button>,
];

export const CustomersTable = (props) => {
  const { items = [] } = props;

  const result = orderBy(items, [{ field: "display_name", dir: "asc" }]);
  const router = useRouter();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Display Name</TableCell>
                <TableCell>Api Name</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Used for Billing</TableCell>
                <TableCell>Type</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((dataApi) => {
                const setData = (data) => {
                  let {
                    id,
                    api_name,
                    display_name,
                    active,
                    used_for_billing,
                    type,
                    updated_time,
                    created_time,
                  } = data;
                  localStorage.setItem("id", id);
                  localStorage.setItem("api_name", api_name);
                  localStorage.setItem("display_name", display_name);
                  localStorage.setItem("active", active);
                  localStorage.setItem("used_for_billing", used_for_billing);
                  localStorage.setItem("type", type);
                  localStorage.setItem("updated_time", updated_time);
                  localStorage.setItem("created_time", created_time);
                };

                const buttons = [
                  <Button
                    className="details"
                    key="detail"
                    onClick={() => {
                      setData(dataApi);
                      router.push("/detailmeter");
                    }}
                  >
                    Detail
                  </Button>,
                  <Button
                    className="edit"
                    key="edit"
                    color="info"
                    onClick={() => {
                      setData(dataApi);
                      router.push("/editmeter");
                    }}
                  >
                    Edit
                  </Button>,
                  <Button
                    className="delete"
                    key="delete"
                    color="error"
                    onClick={() => {
                      setData(dataApi);
                      router.push("/deletemeter");
                    }}
                  >
                    Delete
                  </Button>,
                ];
                return (
                  <TableRow hover key={dataApi.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{dataApi.display_name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{dataApi.api_name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {dataApi.active ? (
                            <SeverityPill color={"success"}>{"YES"}</SeverityPill>
                          ) : (
                            <SeverityPill color={"warning"}>{"NO"}</SeverityPill>
                          )}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {dataApi.used_for_billing ? (
                            <SeverityPill color={"success"}>{"YES"}</SeverityPill>
                          ) : (
                            <SeverityPill color={"warning"}>{"NO"}</SeverityPill>
                          )}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{dataApi.type}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup size="small" aria-label="small button group">
                        {buttons}
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
