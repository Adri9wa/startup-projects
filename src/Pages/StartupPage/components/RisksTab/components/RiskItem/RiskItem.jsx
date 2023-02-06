import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { RISK_TERMS } from "../../../../../../utils/contants";

const RiskItem = ({ item, index, name, control }) => {
  return (
    <Grid container sx={{ height: "32px", borderBottom: "1px solid #C6C6C7" }}>
      <Grid
        item
        xs={3}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        display="flex"
      >
        <Typography>{index + 1}</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        display="flex"
      >
        <Typography>
          {name}-{index + 1}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        display="flex"
      >
        <Controller
          render={({ field }) => (
            <Select
              sx={{ width: "50%" }}
              size="small"
              // fullWidth
              displayEmpty
              variant="standard"
              {...field}
            >
              <MenuItem value="" disabled>
                Term
              </MenuItem>
              {RISK_TERMS.map((term) => (
                <MenuItem key={term} value={term}>
                  {term}
                </MenuItem>
              ))}
            </Select>
          )}
          name={`${name}.${index}.linguistic`}
          control={control}
        />
      </Grid>
      <Grid
        item
        xs={3}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        display="flex"
      >
        <Controller
          render={({ field }) => (
            <TextField
              sx={{ maxWidth: "70px" }}
              size="small"
              variant="standard"
              {...field}
            />
          )}
          name={`${name}.${index}.value`}
          control={control}
        />
      </Grid>
    </Grid>
  );
};

export default RiskItem;
