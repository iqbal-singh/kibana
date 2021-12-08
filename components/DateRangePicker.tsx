import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker";

import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const ERROR_MESSAGES = {
  shouldDisableDate: "Date should be disabled",
  disablePast: "Date should be in the future",
  disableFuture: "Date should be in the past",
  minDate: "Date should be after start date",
  maxDate: "Date should be before end date",
  invalidDate: "Date is invalid",
};

type DateRangePickerProps = {
  defaultStartDate: Date | null;
  defaultEndDate: Date | null;

  onStartDateChange: DatePickerProps<Date>["onChange"];
  onEndDateChange: DatePickerProps<Date>["onChange"];
};

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = ({
  defaultStartDate,
  defaultEndDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const handleStartDateChange = (
    date: Date | null,
    _keyboardInputEventValue?: string | undefined
  ) => {
    setStartDateError("");
    setEndDateError("");
    const start = date;
    start?.setHours(0, 0, 0, 0);
    setStartDate(start);
    onStartDateChange && onStartDateChange(date, _keyboardInputEventValue);
  };

  const handleEndDateChange = (
    date: Date | null,
    _keyboardInputEventValue?: string | undefined
  ) => {
    setStartDateError("");
    setEndDateError("");
    setEndDate(date);
    onEndDateChange && onEndDateChange(date, _keyboardInputEventValue);
  };

  const handleStartDateError: DatePickerProps<Date>["onError"] = (
    reason,
    _value
  ) => {
    if (!reason) return;
    setStartDateError(ERROR_MESSAGES[reason] ?? "Invalid date");
  };

  const handleEndDateError: DatePickerProps<Date>["onError"] = (
    reason,
    _value
  ) => {
    if (!reason) return;
    setEndDateError(ERROR_MESSAGES[reason] ?? "Invalid Date");
  };
  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={6}>
        <DatePicker
          renderInput={(props) => (
            <TextField
              {...props}
              size="small"
              fullWidth
              variant="standard"
              helperText={startDateError || " "}
            />
          )}
          label="Start Date"
          value={startDate}
          clearable={false}
          onChange={handleStartDateChange}
          onError={handleStartDateError}
          reduceAnimations
        />
      </Grid>
      <Grid item xs={6}>
        <DatePicker
          renderInput={(props) => (
            <TextField
              {...props}
              size="small"
              fullWidth
              variant="standard"
              helperText={endDateError || " "}
            />
          )}
          label="End Date"
          value={endDate}
          clearable={false}
          onChange={handleEndDateChange}
          onError={handleEndDateError}
          reduceAnimations
          minDate={startDate ? new Date(startDate) : undefined}
        />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
