class Multiplexer {
    private username: string;
    private domain: string;
    private limit!: number;
    private starting!: number;
    private ending!: number;
    public results: string[];
    // public results: string;

    constructor(
        email: string,
        config: { starting: number; ending?: number; limit?: number }
    ) {
        this.results = [];
        [this.username, this.domain] = email.split("@");
        Object.assign(this, config);

        this.get();
    }

    private *process(username: string) {
        if (username.length <= 1) {
            yield username;
        } else {
            const buffer = username[0];
            let e: string;
            for (e of this.process(username.slice(1)))
                yield buffer + e, yield buffer + "." + e;
        }
    }

    private async get() {
        let count = 0;
        for (const iterator of this.process(this.username)) {
            if (count > (this.limit + this.starting || this.ending)) break;

            if (
                (!this.limit && count >= this.starting) ||
                (count >= this.starting &&
                    count < (this.limit + this.starting || this.ending))
            ) {
                if (this.results.indexOf(iterator) === -1)
                    this.results[this.results.length] = [
                        iterator,
                        this.domain,
                    ].join("@");
            }
            ++count;
        }
        return this;
    }
}

/*
 * total combination username google max 2**28
 * */

// console.time("asu");
// console.log(
//   new Multiplexer("semogaallahmemberirizkiberkah@gmail.com", {
//     // new Multiplexer("semoga@gmail.com", {
//     starting: 1,
//     // ending: 300000150,
//     limit: 10,
//   })
// );
// console.timeEnd("asu");

export default Multiplexer;
