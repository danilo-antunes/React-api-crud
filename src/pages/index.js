import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { BrowserRouter } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/meters/meters-table";
import { applyPagination } from "src/utils/apply-pagination";
import dynamic from "next/dynamic";
const Tour = dynamic(() => import("../components/tour"), { ssr: false });

const now = new Date();
const api_key = "7621e9457f783f3d6fda2f6e022c398f79c86994b5da04df3e9b467b454a695d";

const Page = () => {
  const [dataApi, setDataApi] = useState([]);
  const getApi = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "API-KEY": api_key,
      },
    });
    const data = await res.json();

    setDataApi(data);
  };

  useEffect(() => {
    const apiUrl = "https://take-home-exercise-api.herokuapp.com/meters";

    getApi(apiUrl);
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const router = useRouter();

  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(dataApi, page, rowsPerPage);
    }, [page, rowsPerPage]);
  };
  const customers = useCustomers(page, rowsPerPage);

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.id);
    }, [customers]);
  };

  const apiIds = useCustomerIds(customers);
  const customersSelection = useSelection(apiIds);

  return (
    <>
      <Head>
        <title>Meters | Amberflo</title>
      </Head>
      <Tour />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl" className="landingPage" >
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h3">API's</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              <div>
                <Button
                  className="newMeter"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={useCallback(() => router.push("/newmeter"))}
                >
                  Add Meter
                </Button>
              </div>
            </Stack>
            <BrowserRouter >
              <CustomersTable items={dataApi}  />
            </BrowserRouter>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
