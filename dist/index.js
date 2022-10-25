"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Multiplexer {
    constructor(email, config) {
        this.results = [];
        [this.username, this.domain] = email.split("@");
        Object.assign(this, config);
        this.get();
    }
    *process(username) {
        if (username.length <= 1) {
            yield username;
        }
        else {
            const buffer = username[0];
            let e;
            for (e of this.process(username.slice(1)))
                yield buffer + e, yield buffer + "." + e;
        }
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            for (const iterator of this.process(this.username)) {
                if (count > (this.limit + this.starting || this.ending))
                    break;
                if ((!this.limit && count >= this.starting) ||
                    (count >= this.starting &&
                        count < (this.limit + this.starting || this.ending))) {
                    if (this.results.indexOf(iterator) === -1)
                        this.results[this.results.length] = [
                            iterator,
                            this.domain,
                        ].join("@");
                }
                ++count;
            }
            return this;
        });
    }
}
exports.default = Multiplexer;
