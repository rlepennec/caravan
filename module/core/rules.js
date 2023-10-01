export class Rules {

    /**
     * @param result The roll result between 1 and 6.
     * @returns the result sentence.
     */
    static traitSentenceOf(result) {
        switch (result) {
            case "1":
                return "C'est raté et vous devez payer le prix fort";
            case "2":
                return "C'est raté avec un petit revers";
            case "3":
                return "C'est raté de justesse ou réussi avec revers";
            case "4":
                return "C'est réussi de justesse";
            case "5":
                return "C'est réussi avec un peit effet bénéfique";
            case "6":
                return "C'est réussi brillamment";
                
        }
    }

    /**
     * @param result The roll result between 1 and 6.
     * @returns the result sentence.
     */
    static mystiqueSentenceOf(result) {
        switch (result) {
            case "0":
                return "Vous perdez votre masque";
            case "1":
                return "Vous perdez un point de mystique";
            case "2":
                return "Vous conservez vos points de mystique";
        }
    }

}