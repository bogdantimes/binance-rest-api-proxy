import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const resource = (event as any).rawPath ?? `ping`;
    const query = (event as any).rawQueryString ?? ``;
    const method = (event.requestContext as any).http.method;
    const url = `https://api.binance.com/api/v3${resource}${query ? `?${query}` : ''}`;

    console.log(method, url);

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'x-mbx-apikey': (event.headers?.[`x-mbx-apikey`] as string) ?? ``,
            },
        });

        let respText = '';
        if (resource.includes('exchangeInfo')) {
            const exInfo = await response.json();
            exInfo.symbols = exInfo.symbols.map((s: any) => {
                return {
                    symbol: s.symbol,
                    status: s.status,
                    filters: s.filters,
                };
            });
            respText = JSON.stringify(exInfo);
        } else {
            respText = await response.text();
        }
        console.log(response.status, respText.slice(0, 1000));

        return {
            statusCode: response.status,
            body: respText,
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: e as string,
        };
    }
};
