import React from "react";
import { useForm, Controller, useFieldArray, trigger } from "react-hook-form";
import { Grid, Icon, Typography, Button } from "@material-ui/core";
import {
  TextFieldMontant,
  AutocompleteCategorie,
  GridContainerProp,
  LargeurChamps
} from "./ComposantsOperation";
import DateDepense from "./DateDepense";
import { download } from "../utils/QFXgen";

export default function Formulaire() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    errors,
    setValue
  } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    download(data.Date.toString("dd/MM/yyyy"), data.Montant, data.Categorie, data.donnees);
  };

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

        <Controller
          name={"Date"}
          control={control}
          defaultValue={Date.now()}
          render={({ value }) => <DateDepense value={value} name={"Date"} />}
        />

        <br style={{ fontSize: "0.8em" }} />

        <Grid {...props()} container>
          <Grid item xs={LargeurChamps}>
            <TextFieldMontant name="Montant" register={register()} />
          </Grid>
          <Grid item xs={LargeurChamps}>
            <AutocompleteCategorie name="Categorie" register={register()} />
          </Grid>
        </Grid>

        <Typography variant="h6">Découpage</Typography>

        {fields.map((donnees, index) => (
          <Grid {...props()} key={donnees.id} container>
            <Grid item xs={LargeurChamps}>
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

            <Grid item xs={LargeurChamps}>
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
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={3}
              xs={2}>
              <Grid item xs={3}>
                <Icon
                  color="primary"
                  onClick={() => {
                    append({ Montant: 0, Categorie: "" });
                  }}>
                  add_circle
                </Icon>
              </Grid>
              <Grid item xs={3}>
                <Icon
                  color="secondary"
                  onClick={() => {
                    remove(index);
                  }}>
                  remove_circle
                </Icon>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Button type="submit">toto</Button>
      </form>
    </div>
  );
}
