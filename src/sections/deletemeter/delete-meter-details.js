import { useSearchParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const meter_types = [
  {
    value: "sum",
    label: "Sum",
  },
  {
    value: "max",
    label: "Max",
  },
  {
    value: "unique_count",
    label: "Unique Count",
  },
];

const options = [
  {
    value: true,
    label: "Yes",
  },
  {
    value: false,
    label: "No",
  },
];

const api_key = "7621e9457f783f3d6fda2f6e022c398f79c86994b5da04df3e9b467b454a695d";



export const DeleteMeterDetails = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      display_name: "",
      api_name: "",
      active: true,
      used_for_billing: true,
      type: "sum",
    },
    validationSchema: Yup.object({
    }),
    onSubmit: async (values, helpers) => {
      if (values.active === "true") {
        values.active = true;
      } else {
        values.active = false;
      }
      if (values.used_for_billing === "true") {
        values.used_for_billing = true;
      } else {
        values.used_for_billing = false;
      }
      try {
        const apiUrl = "https://take-home-exercise-api.herokuapp.com/meters/"+localStorage.getItem("id");
        const res = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "API-KEY": api_key,
            "Content-Type": "application/json",
          },
        });
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Check your Meter's Details" title="Meter's Details" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={!!(formik.touched.display_name && formik.errors.display_name)}
                  fullWidth
                  helperText={formik.touched.display_name && formik.errors.display_name}
                  label="Display Name"
                  name="display_name"
                  value={localStorage.getItem("display_name")}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  error={!!(formik.touched.api_name && formik.errors.api_name)}
                  fullWidth
                  helperText={formik.touched.api_name && formik.errors.api_name}
                  label="API Name"
                  name="api_name"
                  value={localStorage.getItem("api_name")}
                />
              </Grid>
              <Grid xs={4} md={4}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  label="Active?"
                  name="active"
                  required
                  select
                  SelectProps={{ native: true }}
                  value={localStorage.getItem("active")}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={4} md={4}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  label="Used for Billing?"
                  name="used_for_billing"
                  required
                  select
                  SelectProps={{ native: true }}
                  value={localStorage.getItem("used_for_billing")}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={4} md={4}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  label=" Type"
                  name="type"
                  required
                  select
                  SelectProps={{ native: true }}
                  value={localStorage.getItem("type")}
                >
                  {meter_types.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "center" }}>
          {formik.errors.submit && (
            <Typography color="error" sx={{ mt: 3 }} variant="body2">
              {formik.errors.submit}
            </Typography>
          )}
          <Button color="error" variant="contained" type="submit">
            Delete Meter
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
