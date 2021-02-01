import React, { useState } from "react";
import { useForm, Controller, useFieldArray, trigger } from "react-hook-form";
import { Grid, Typography, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import {
  TextFieldMontant,
  AutocompleteCategorie,
  GridContainerProp
} from "./ComposantsOperation";
import DateDepense from "./DateDepense";
import { download } from "../utils/QFXgen";
import { selectDate } from "../redux/selectors";
import { useSelector } from "react-redux";
import { EuroToNumber } from "../utils/utils";

export default function Formulaire() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    errors,
    setValue
  } = useForm();

  const dateOperation = useSelector(selectDate);
  const [erreur, setErreur] = useState(false);
  const [txtErreur, setTxtErreur] =useState("")

  function onSubmit(data) {
    let test1;
    test1 =
      EuroToNumber(data.Montant) -
      data.donnees.reduce((prev, act) => prev + EuroToNumber(act.Montant), 0);
    setTxtErreur(test1 === 0 ? "" : "La somme des montants découpés n'est pas égale au montant à découper")
    setErreur(test1 === 0 ? false : true);

    let test2 = true;
    test2 = data.donnees.reduce((prev, act, index) => {
      if (index === 0) {
        return data.Categorie === act.Categorie;
      } else if (prev) {
        return data.donnees[index - 1].Categorie === act.Categorie;
      } else return prev;
    }, true);
    setTxtErreur(!test2 ? "" : "Toutes les catégories sont identiques")
    setErreur(test2);

    test1 === 0 &&
      !test2 &&
      download(
        dateOperation.content,
        data.Montant,
        data.Categorie,
        data.donnees
      );
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "donnees"
  });

  const isInitalRender = React.useRef(true);

  React.useEffect(() => {
    if (!fields.length && !isInitalRender.current) {
      trigger("donnees");
    }

    if (isInitalRender.current) {
      append({ Montant: 0, Categorie: "" });
      append({ Montant: 0, Categorie: "" });
      isInitalRender.current = false;
    }
  }, [fields, register, setValue, trigger]);

  const props = () => {
    return GridContainerProp;
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">Dépense à découper</Typography>

        <DateDepense />

        <br style={{ fontSize: "0.8em" }} />

        <Grid {...props()} container>
          <Grid item xs>
            <TextFieldMontant name="Montant" register={register} />
          </Grid>
          <Grid item xs>
            <AutocompleteCategorie name="Categorie" register={register} />
          </Grid>
          <Grid item xs={1} />
        </Grid>

        <Typography variant="h6">Découpage</Typography>

        {fields.map((donnees, index) => (
          <Grid {...props()} key={donnees.id} container>
            <Grid item xs>
              <Controller
                control={control}
                name={`donnees[${index}].Montant`}
                defaultValue={0}
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => <TextFieldMontant name={name} register={register} />}
              />
            </Grid>

            <Grid item xs>
              <Controller
                name={`donnees[${index}].Categorie`}
                control={control}
                defaultValue=""
                render={(
                  { onChange, onBlur, value, name, ref },
                  { invalid, isTouched, isDirty }
                ) => <AutocompleteCategorie name={name} register={register} />}
              />
            </Grid>
            <Grid item xs={1}>
              <AddCircleOutlineIcon
                color="primary"
                onClick={() => {
                  append({ Montant: 0, Categorie: "" });
                }}
                style={{ fontSize: 20 }}
              />
              {fields.length > 1 && (
                <RemoveCircleOutlineIcon
                  color="secondary"
                  onClick={() => {
                    fields.length > 1 && remove(index);
                  }}
                  style={{ fontSize: 20 }}
                />
              )}
            </Grid>
          </Grid>
        ))}
        <Typography variant="body2" color="error">
          {erreur &&
            txtErreur}
        </Typography>
        <br />
        {fields.length > 1 && (
          <Button variant="contained" color="primary" type="submit">
            Télécharger
          </Button>
        )}
      </form>
    </div>
  );
}
