import {EuroToNumber} from "./utils"
import moment from "moment"

export function qfxGen(dateDec, montant, categorie, decoupage) {
  let myDate
  myDate=moment(dateDec)
  let output = "!Type:Bank\n";
  output += `D${myDate.format("DD/MM/YYYY")}\n`;
  output += `T${EuroToNumber(montant)}\n`;
  output += `${categorie}\n`;
  output += "^\n";
  decoupage.forEach((item) => {
    output += `D${myDate.format("DD/MM/YYYY")}\n`;
    output += `T${EuroToNumber(item.Montant)}\n`;
    output += `${item.Categorie}\n`;
    output += "^\n";
  });
  return output;
}

export const download = (date, Montant, Categorie, donnees) => {
  let output = "";
  output = qfxGen(date, Montant, Categorie, donnees);

  const blob = new Blob([output]);
  const url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "test.txt");
  a.click();

  URL.revokeObjectURL(url);
};
