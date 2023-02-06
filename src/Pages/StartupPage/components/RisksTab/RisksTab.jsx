import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { getRisksFields, RISKS_HEADERS } from "../../../../utils/contants";
import RiskItem from "./components/RiskItem";
import {
  getAggregated,
  getGeneral,
  getResultTerms,
  getStartupRisk,
} from "./RisksTab.helpers";

const RisksTab = () => {
  const { control, setValue } = useForm({
    defaultValues: {
      resultTerms: [],
      aggregated: [],
      general: [],
      Ko: getRisksFields(9),
      Ki: getRisksFields(5),
      Kf: getRisksFields(5),
      Ks: getRisksFields(5),
    },
  });

  const [projectRisk, setProjectRisk] = useState("");

  const formField = useWatch({ control });

  const { fields: fields_Ko } = useFieldArray({
    control,
    name: "Ko",
  });

  const { fields: fields_Ki } = useFieldArray({
    control,
    name: "Ki",
  });
  const { fields: fields_Kf } = useFieldArray({
    control,
    name: "Kf",
  });
  const { fields: fields_Ks } = useFieldArray({
    control,
    name: "Ks",
  });

  const handleCalculate = () => {
    const { Ko, Kf, Ki, Ks } = formField;
    const resultTerms = getResultTerms({ Ko, Ki, Kf, Ks });
    const aggregated = getAggregated({ Ko, Ki, Kf, Ks });
    const general = getGeneral({ Ko, Ki, Kf, Ks });
    const startupRisk = getStartupRisk({ Ko, Ki, Kf, Ks });
    setValue("aggregated", aggregated);
    setValue("resultTerms", resultTerms);
    setValue("general", general);
    setProjectRisk(startupRisk);
  };

  return (
    <Box width="100%" display="flex" gap="40px">
      <Button
        sx={{ position: "absolute", right: 20, top: 20 }}
        variant="contained"
        type="submit"
        onClick={handleCalculate}
      >
        Calculate
      </Button>
      <Box width="50%">
        <Grid
          container
          sx={{
            borderBottom: "1px solid #C6C6C7",
          }}
        >
          {RISKS_HEADERS.map((item) => (
            <Grid
              key={item}
              item
              xs={3}
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              display="flex"
              height="40px"
            >
              <Typography>{item}</Typography>
            </Grid>
          ))}
        </Grid>
        <Typography backgroundColor="#ccc" textAlign="center">
          Ko
        </Typography>
        {fields_Ko.map((f, index) => (
          <RiskItem
            key={f.id}
            item={f}
            name="Ko"
            control={control}
            index={index}
          />
        ))}
        <Typography backgroundColor="#ccc" textAlign="center">
          Ki
        </Typography>
        {fields_Ki.map((f, index) => (
          <RiskItem
            key={f.id}
            item={f}
            name="Ki"
            control={control}
            index={index}
          />
        ))}
        <Typography backgroundColor="#ccc" textAlign="center">
          Kf
        </Typography>
        {fields_Kf.map((f, index) => (
          <RiskItem
            key={f.id}
            item={f}
            name="Kf"
            control={control}
            index={index}
          />
        ))}
        <Typography backgroundColor="#ccc" textAlign="center">
          Ks
        </Typography>
        {fields_Ks.map((f, index) => (
          <RiskItem
            key={f.id}
            item={f}
            name="Ks"
            control={control}
            index={index}
          />
        ))}
      </Box>
      <Box pt="50px">
        <Typography color="#1976d2" fontSize="24px" mt="20px" fontWeight={500}>
          Результуючі терм оцінки: {formField.resultTerms.join(", ")}
        </Typography>
        <Typography color="#1976d2" fontSize="24px" mt="20px" fontWeight={500}>
          Агреговані оцінки достовірності: {formField.aggregated.join(", ")}
        </Typography>
        <Typography color="#1976d2" fontSize="24px" mt="20px" fontWeight={500}>
          Узагальнені оцінки ризику: {formField.general.join(", ")}
        </Typography>
        <Typography color="#1976d2" fontSize="24px" mt="20px" fontWeight={500}>
          Ступінь ризику проекту: {projectRisk}
        </Typography>
      </Box>
    </Box>
  );
};

export default RisksTab;
