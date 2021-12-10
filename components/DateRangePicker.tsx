import { formatDate } from "@/utils/index";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import type { StandardTextFieldProps } from "@mui/material";

type DateRangePickerProps = {
  defaultStartDate: Date;
  defaultEndDate: Date;
  disabled: boolean;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
};

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = ({
  defaultStartDate,
  defaultEndDate,
  onStartDateChange,
  onEndDateChange,
  disabled,
}) => {
  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);

  const handleStartDateChange: StandardTextFieldProps["onChange"] = (e) => {
    const date = new Date(e.target.value + "T00:00:00");
    setStartDate(date);
    onStartDateChange && onStartDateChange(date);
  };

  const handleEndDateChange: StandardTextFieldProps["onChange"] = (e) => {
    const date = new Date(e.target.value + "T23:59:59");
    setEndDate(date);
    onEndDateChange && onEndDateChange(date);
  };

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={6}>
        <TextField
          type="date"
          size="small"
          fullWidth
          variant="standard"
          disabled={disabled}
          label="Start Date"
          value={formatDate(startDate, "yyyy-MM-dd")}
          onChange={handleStartDateChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          size="small"
          fullWidth
          variant="standard"
          disabled={disabled}
          label="End Date"
          value={formatDate(endDate, "yyyy-MM-dd")}
          onChange={handleEndDateChange}
        />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
