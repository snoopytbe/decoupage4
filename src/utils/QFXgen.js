import {EuroToNumber} from "./utils"

export function qfxGen(dateDec, montant, categorie, decoupage) {
  let output = "!Type:Bank\n";
  output += `D${dateDec}\n`;
  output += `T${EuroToNumber(montant)}\n`;
  output += `${categorie}\n`;
  output += "^\n";
  decoupage.forEach((item) => {
    output += `D${dateDec}\n`;
    output += `T${EuroToNumber(montant)}\n`;
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
