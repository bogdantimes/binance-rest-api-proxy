import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../fetchBinance';

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: Partial<APIGatewayProxyEvent> = {
            requestContext: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                http: { method: 'GET' },
            },
            headers: {},
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rawPath: `/ticker/price`,
            rawQueryString: `symbol=BTCBUSD`,
        };
        const result: APIGatewayProxyResult = await handler(event as APIGatewayProxyEvent);

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)?.symbol).toEqual('BTCBUSD');
    });
});
