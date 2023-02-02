import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  AB_SUMS,
  defaultEfficiencyFields,
  EFFICIENCY_INITIAL_HEADERS,
  EFFICIENCY_TERM_HEADERS,
} from "../../../../utils/contants";
import {
  mfFunc,
  mFunc,
  muFunc,
  normalize,
  wFunc,
} from "./EfficiencyTab.helpers";

const EfficiencyTab = () => {
  const [efficiency, setEfficiency] = useState("");

  const { control, setValue } = useForm({
    defaultValues: {
      fieldsG: defaultEfficiencyFields,
      fieldsT: defaultEfficiencyFields,
      fieldsU: defaultEfficiencyFields,
      fieldsP: defaultEfficiencyFields,
      firstTableFields: [
        {
          group: "G1",
          mark: "",
          independency: "",
          desiredValue: "",
          desiredFunction: "",
        },
        {
          group: "G2",
          mark: "",
          independency: "",
          desiredValue: "",
          desiredFunction: "",
        },
        {
          group: "G3",
          mark: "",
          independency: "",
          desiredValue: "",
          desiredFunction: "",
        },
        {
          group: "G4",
          mark: "",
          independency: "",
          desiredValue: "",
          desiredFunction: "",
        },
        {
          group: "G5",
          mark: "",
          independency: "",
          desiredValue: "",
          desiredFunction: "",
        },
      ],
      secondTableFields: [
        {
          group: "G1",
          term: "",
          termAuth: "",
          desiredTerm: "",
        },
        {
          group: "G2",
          term: "",
          termAuth: "",
          desiredTerm: "",
        },
        {
          group: "G3",
          term: "",
          termAuth: "",
          desiredTerm: "",
        },
        {
          group: "G4",
          term: "",
          termAuth: "",
          desiredTerm: "",
        },
        {
          group: "G5",
          term: "",
          termAuth: "",
          desiredTerm: "",
        },
      ],
    },
  });

  const formField = useWatch({ control });

  const { fields: fieldsG } = useFieldArray({
    control,
    name: "fieldsG",
  });

  const { fields: fieldsT } = useFieldArray({
    control,
    name: "fieldsT",
  });
  const { fields: fieldsU } = useFieldArray({
    control,
    name: "fieldsU",
  });
  const { fields: fieldsP } = useFieldArray({
    control,
    name: "fieldsP",
  });

  const handleCalculate = () => {
    const newFirstTableFields = [];
    const newSecondTableFields = [];
    const muValues = [];

    formField.firstTableFields.forEach((tableField, index) => {
      const g = parseInt(formField.fieldsG[index].value);
      const t = parseInt(formField.fieldsT[index].value);
      const a = AB_SUMS[index][0];
      const b = AB_SUMS[index][1];
      const mark = g;
      const independency = mFunc(a, b, g);
      const desiredValue = t;
      const desiredFunction = mFunc(a, b, t);
      const { group } = tableField;

      const mu = muFunc(desiredFunction, independency);
      const minTerm = Math.min.apply(null, Object.values(mu));
      const maxTerm = Math.max.apply(null, Object.values(mu));
      const maxTermKey = Object.keys(mu).find((key) => mu[key] === maxTerm);
      const desiredTermVal = formField.fieldsU[index].value;
      if (
        Math.abs(
          Object.keys(mu).find((key) => mu[key] === maxTerm) - desiredTermVal
        ) > 1
      )
        muValues.push(normalize(maxTermKey, minTerm, desiredTermVal));
      else muValues.push(normalize(maxTermKey, maxTerm, desiredTermVal));

      const term = Object.keys(mu)
        .map((ind) => `U${ind}`)
        .join(" or ");

      const termAuth = Object.keys(mu)
        .map((ind) => `Mu${ind} = ${mu[ind].toFixed(2)}`)
        .join(" or ");

      const desiredTerm = `U${formField.fieldsU[index].value}`;

      newFirstTableFields.push({
        group,
        mark,
        independency: independency.toFixed(2),
        desiredValue,
        desiredFunction: desiredFunction.toFixed(2),
      });

      newSecondTableFields.push({
        group,
        term,
        termAuth,
        desiredTerm,
      });
    });

    const p = formField.fieldsP.map((it) => parseInt(it.value));
    const pNormed = wFunc(p);
    const efficiency = mfFunc(pNormed, muValues);
    setEfficiency(efficiency.toFixed(2));
    setValue("firstTableFields", [...newFirstTableFields]);
    setValue("secondTableFields", [...newSecondTableFields]);
  };

  return (
    <Box display="flex" gap="40px">
      <Button
        sx={{ position: "absolute", right: 20, top: 20 }}
        variant="contained"
        type="submit"
        onClick={handleCalculate}
      >
        Calculate
      </Button>
      <Box display="flex" flexDirection="column" gap="30px">
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography> Оцінки груп критеріїв: </Typography>
          <Box display="flex" gap="15px">
            {fieldsG.map((item, index) => (
              <Controller
                key={item.id}
                render={({ field }) => (
                  <TextField
                    sx={{ maxWidth: "70px" }}
                    size="small"
                    label={`G${index + 1}`}
                    {...field}
                  />
                )}
                name={`fieldsG.${index}.value`}
                control={control}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <Box display="flex" flexDirection="column" gap="10px">
            <Typography> Бажані значення: </Typography>
            <Box display="flex" gap="15px">
              {fieldsT.map((item, index) => (
                <Controller
                  key={item.id}
                  render={({ field }) => (
                    <TextField
                      sx={{ maxWidth: "70px" }}
                      size="small"
                      label={`T${index + 1}`}
                      {...field}
                    />
                  )}
                  name={`fieldsT.${index}.value`}
                  control={control}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box display="flex" flexDirection="column" gap="10px">
            <Typography> Побажання ОПР: </Typography>
            <Box display="flex" gap="15px">
              {fieldsU.map((item, index) => (
                <Controller
                  key={item.id}
                  render={({ field }) => (
                    <TextField
                      sx={{ maxWidth: "70px" }}
                      size="small"
                      label={`U${index + 1}`}
                      {...field}
                    />
                  )}
                  name={`fieldsU.${index}.value`}
                  control={control}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box display="flex" flexDirection="column" gap="10px">
            <Typography> Вагові коефіцієнти: </Typography>
            <Box display="flex" gap="15px">
              {fieldsP.map((item, index) => (
                <Controller
                  key={item.id}
                  render={({ field }) => (
                    <TextField
                      sx={{ maxWidth: "70px" }}
                      size="small"
                      label={`P${index + 1}`}
                      {...field}
                    />
                  )}
                  name={`fieldsP.${index}.value`}
                  control={control}
                />
              ))}
            </Box>
            <Typography
              color="#1976d2"
              fontSize="24px"
              mt="20px"
              fontWeight={500}
            >
              Ефективність стартапу: {efficiency}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="40px">
        <Stack
          width="100%"
          border="1px solid #658DAF"
          borderRadius="8px"
          pt="12px"
          sx={{ background: "rgba(207, 226, 241, 0.5)" }}
        >
          <Grid
            container
            columns={15}
            sx={{
              borderBottom: "1px solid #C6C6C7",
            }}
          >
            {EFFICIENCY_INITIAL_HEADERS.map((item) => (
              <Grid
                item
                xs={3}
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                display="flex"
              >
                <Typography>{item}</Typography>
              </Grid>
            ))}
          </Grid>
          {formField.firstTableFields.map((item) => (
            <Grid
              container
              columns={15}
              key={item.group}
              sx={{
                "&:not(:last-of-type)": {
                  borderBottom: "1px solid #C6C6C7",
                },
              }}
            >
              {Object.keys(item).map((key) => (
                <Grid
                  key={key}
                  item
                  textAlign="center"
                  xs={3}
                  sx={{
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item[key]}
                </Grid>
              ))}
            </Grid>
          ))}
        </Stack>
        <Stack
          width="100%"
          border="1px solid #658DAF"
          borderRadius="8px"
          pt="12px"
          sx={{ background: "rgba(207, 226, 241, 0.5)" }}
        >
          <Grid
            container
            columns={16}
            sx={{
              borderBottom: "1px solid #C6C6C7",
            }}
          >
            {EFFICIENCY_TERM_HEADERS.map((item) => (
              <Grid
                item
                xs={4}
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                display="flex"
              >
                <Typography>{item}</Typography>
              </Grid>
            ))}
          </Grid>
          {formField.secondTableFields.map((item) => (
            <Grid
              container
              columns={16}
              key={item.group}
              sx={{
                "&:not(:last-of-type)": {
                  borderBottom: "1px solid #C6C6C7",
                },
              }}
            >
              {Object.keys(item).map((key) => (
                <Grid
                  key={key}
                  item
                  textAlign="center"
                  xs={4}
                  sx={{
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item[key]}
                </Grid>
              ))}
            </Grid>
          ))}
        </Stack>{" "}
      </Box>
    </Box>
  );
};

export default EfficiencyTab;
