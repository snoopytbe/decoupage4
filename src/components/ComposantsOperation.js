import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";
import * as constantes from "../data/constantes";
import { NumberToEuro } from "../utils/utils";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator={" "}
      defaultValue="0"
      decimalScale="2"
      fixedDecimalScale
      isNumericString={false}
      suffix="€"
    />
  );
}

export const TextFieldMontant = ({ name, register, disabled, onChange }) => {
  const props = (disabled) => {
    let conditionnalProperty;
    if (!disabled) {
      conditionnalProperty = {
        ...conditionnalProperty,
        InputProps: { inputComponent: NumberFormatCustom }
      };
    }
    return conditionnalProperty;
  };

  return (
    <TextField
      {...props(disabled)}
      name={name}
      inputRef={register}
      label="Montant"
      disabled={disabled}
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
      margin="dense"
      onChange={onChange}
      defaultValue={NumberToEuro("0")}
    />
  );
};

export const AutocompleteCategorie = ({ name, register }) => {
  return (
    <Autocomplete
      name={name}
      id="autocomplete"
      options={constantes.data}
      getOptionLabel={(option) => option.label}
      defaultValue={constantes.data[0]}
      fullWidth
      required
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          inputRef={register()}
          required
          name={name}
          label="Catégorie"
          margin="dense"
        />
      )}
    />
  );
};

export const GridContainerProp = {
  direction: "row",
  justify: "flex-start",
  alignItems: "center",
  spacing: 2
};

export const LargeurChamps = 5;
