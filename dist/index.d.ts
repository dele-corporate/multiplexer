declare class Multiplexer {
    private username;
    private domain;
    private limit;
    private starting;
    private ending;
    results: string[];
    constructor(email: string, config: {
        starting: number;
        ending?: number;
        limit?: number;
    });
    private process;
    private get;
}
export default Multiplexer;
