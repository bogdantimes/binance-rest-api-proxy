# binance-rest-api-proxy

A service which proxies any Binance REST API calls to make them originate from a region you like.
Default configuration creates AWS Lambda function and URL in eu-west-3 (Paris) region. This can be changed in the package.json.

## Usage

* You need AWS CLI installed and configured (search AWS Docs to do it).
* You need AWS `sam` CLI tool (search AWS Docs to do it).
* You will probably need Docker Desktop installed.

1. `npm install`
2. `npm run deploy`

If everything is deployed you will get the service URL in the terminal.
Now, using this URL you can make any requests to Binance REST API, by replacing `https://api.binance.com/api/v3/` with this URL in requests:
* `https://api.binance.com/api/v3/ticker/price` -> `<ServiceURL>/ticker/price`

It supports all Binance REST API requests that do not include HTML body.
It supports the `x-mbx-apikey` HTTP header.

If you fill like this project helped you, you can support me on Patreon:
* [patreon.com/bogdantimes](https://patreon.com/bogdantimes)

🫡
