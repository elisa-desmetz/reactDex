import slugify from "./slugify";

function createCornerGradient(tbTypes, tbTypePkmn) {
    const len = tbTypePkmn.length;
    let slugType1
    let slugType2
    let bkgStyle = "";
    // Masquer le coin inférieur droit en lui appliquant la couleur du fond de page + ajouter l'effet de lumiere
    bkgStyle += `linear-gradient(135deg,transparent 50%, var(--color-background) 50%), linear-gradient(135deg,transparent 20%, rgba(var(--bkg-card),0.5) 50%, transparent 50%),`
    // En fonction du nombre de types du pokemon
    switch (len) {
        // Un seul type
        case 1:
            slugType1 = slugify(tbTypes.at(tbTypePkmn.at(0) - 1).name);
            bkgStyle += `var(--color-${slugType1})`;
            break;
        // Deux types
        case 2:
            slugType1 = slugify(tbTypes.at(tbTypePkmn.at(0) - 1).name);
            slugType2 = slugify(tbTypes.at(tbTypePkmn.at(1) - 1).name);
            bkgStyle += `linear-gradient(45deg,var(--color-${slugType2}) 50%, transparent 50%), var(--color-${slugType1})`;
            break;
        default:
            break;
    }
    return bkgStyle;
}

export default createCornerGradient