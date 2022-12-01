import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const resource = (event as any).rawPath ?? `ping`;
    const query = (event as any).rawQueryString ?? ``;
    const method = (event.requestContext as any).http.method;
    const url = `https://api.binance.com/api/v3${resource}?${query}`;

    console.log(method, url);

    const binanceRequest = fetch(url, {
        method,
        headers: {
            'x-mbx-apikey': (event.headers?.[`x-mbx-apikey`] as string) ?? ``,
        },
    });

    return await binanceRequest
        .then(async (binanceResponse) => {
            return await binanceResponse
                .text()
                .then((text) => {
                    return {
                        statusCode: binanceResponse.status,
                        body: text,
                    };
                })
                .catch((error) => {
                    return {
                        statusCode: 500,
                        body: error,
                    };
                });
        })
        .catch((error) => {
            return {
                statusCode: 500,
                body: error,
            };
        });
};
