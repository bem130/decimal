class Decimal {
    constructor (ma,ex) { // ma*(10^ex)
        this.ma = ma;
        this.ex = ex;
        console.log(ma*(10**ex),this)
    }
}

class Deccalc {
    add (dec1,dec2) {
        if (dec1.ex>dec2.ex) {
            let tmp = dec2;
            dec2 = dec1; dec1 = tmp;
        }
        return new Decimal(dec2.ma*(10**(dec2.ex-dec1.ex))+dec1.ma,dec1.ex);
    }
    sub (dec1,dec2) {
        if (dec1.ex>dec2.ex) {
            return new Decimal(dec1.ma*(10**(dec1.ex-dec2.ex))-dec2.ma,dec2.ex);
        }
        return new Decimal(dec1.ma-dec2.ma*(10**(dec2.ex-dec1.ex)),dec1.ex);
    }
}