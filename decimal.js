class Decimal {
    constructor (ma=0,ex=0) { // ma*(10^ex)
        this.ma = ma; this.ex = ex;
        this.nor();
    }
    nor () {
        while (this.ma%10==0) {
            this.ma /= 10; this.ex++;
        }
        return this;
    }
    set (ma,ex) {
        this.ma = ma; this.ex = ex;
        this.nor();
    }
    get () {
        this.nor();
        return this.ma*(10**this.ex);
    }
    getstr () {
        this.nor();
        let ret = "";
        let chs = ["0","1","2","3","4","5","6","7","8","9"];
        let digs = this.#getdigits(this.ma);
        if (this.ex<0) {
            for (let d=0;d<digs.length+this.ex;d++) { ret += chs[digs[d]]; }
            ret += ".";
            for (let d=digs.length+this.ex;d<digs.length;d++) { ret += chs[digs[d]]; }
        }
        else {
            for (let d=0;d<digs.length;d++) { ret += chs[digs[d]]; }
            for (let zc=0;zc<this.ex;zc++) { ret += "0"; }
        }
        return ret;
    }
    #getdigits (num,n=10) {
        let dcnt = 0;
        while (true) {
            if (n**dcnt>num) { break; }
            dcnt++;
        }
        let ret = new Array(dcnt);
        for (let d=1;d<=dcnt;d++) {
            ret[dcnt-d] = num%(n**d)/(n**(d-1));
            num = num-num%(n**d);
        }
        return ret;
    }
}

class Deccalc {
    add (dec1,dec2) {
        if (dec1.ex>dec2.ex) {
            let tmp = dec2;
            dec2 = dec1; dec1 = tmp;
        }
        return new Decimal(dec2.ma*(10**(dec2.ex-dec1.ex))+dec1.ma,dec1.ex).nor();
    }
    sub (dec1,dec2) {
        if (dec1.ex>dec2.ex) {
            return new Decimal(dec1.ma*(10**(dec1.ex-dec2.ex))-dec2.ma,dec2.ex).nor();
        }
        return new Decimal(dec1.ma-dec2.ma*(10**(dec2.ex-dec1.ex)),dec1.ex).nor();
    }
}