const PROTO_PATH = __dirname + '/../src/hero/hero.proto';

import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    defaults: true,
    enums: String,
    longs: String,
    oneofs: true,
});
const hero = grpc.loadPackageDefinition(packageDefinition).hero;

(async () => {
    // @ts-ignore - cause no such service
    const client = new hero.HeroService('localhost:3001', grpc.credentials.createInsecure());
    client.FindOne(
        {
            id: 1,
        },
        (error: any, reply: any) => {
            if (error) {
                console.log(error);
            }
            console.log('reply from server');
            console.log(reply);
        },
    );
})();
