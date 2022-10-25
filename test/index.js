const Multiplexer = require("../dist").default;

const test = new Multiplexer("allahuakbar@gmail.com", {
    starting: 1,
    limit: 1,
});

console.log(test);
