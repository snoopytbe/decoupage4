import "date-fns";
import frLocale from "date-fns/locale/fr";
import format from "date-fns/format";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { updateDate } from "../redux/actions";
import { selectDate } from "../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useController } from "react-hook-form";

export default function DateDepense({ name, value, onChangeHandler }) {
  const dispatch = useDispatch();
  const [dateChoisie, setDateChoisie] = useState(value);

  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, "d MMM yyyy", { locale: this.locale });
    }
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
        <KeyboardDatePicker
          name={name}
          id="date-picker-dialog"
          label="Date de l'opération"
          format="dd/MM/yyyy"
          autoOk
          value={dateChoisie}
          onChange={(date) => {
            setDateChoisie(date);
            value = date;
          }}
          KeyboardButtonProps={{
            "aria-label": "Changer la date"
          }}
          okLabel="Valider"
          cancelLabel="Annuler"
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
