type StatusCode = {
	code: number;
	message: string;
};

export const statusCodes: StatusCode[] = [
	{
		code: 100,
		message: '100 - Continue',
	},
	{
		code: 101,
		message: '101 - Switching Protocols',
	},
	{
		code: 102,
		message: '102 - Processing',
	},
	{
		code: 103,
		message: '103 - Early Hints',
	},
	{
		code: 200,
		message: '200 - OK',
	},
	{
		code: 201,
		message: '201 - Created',
	},
	{
		code: 202,
		message: '202 - Accepted',
	},
	{
		code: 203,
		message: '203 - Non-Authoritative Information',
	},
	{
		code: 204,
		message: '204 - No Content',
	},
	{
		code: 205,
		message: '205 - Reset Content',
	},
	{
		code: 206,
		message: '206 - Partial Content',
	},
	{
		code: 207,
		message: '207 - Multi-Status',
	},
	{
		code: 208,
		message: '208 - Already Reported',
	},
	{
		code: 226,
		message: '226 - IM Used',
	},
	{
		code: 300,
		message: '300 - Multiple Choices',
	},
	{
		code: 301,
		message: '301 - Moved Permanently',
	},
	{
		code: 302,
		message: '302 - Found',
	},
	{
		code: 303,
		message: '303 - See Other',
	},
	{
		code: 304,
		message: '304 - Not Modified',
	},
	{
		code: 305,
		message: '305 - Use Proxy',
	},
	{
		code: 306,
		message: '306 - Switch Proxy',
	},
	{
		code: 307,
		message: '307 - Temporary Redirect',
	},
	{
		code: 308,
		message: '308 - Permanent Redirect',
	},
	{
		code: 400,
		message: '400 - Bad Request',
	},
	{
		code: 401,
		message: '401 - Unauthorized',
	},
	{
		code: 402,
		message: '402 - Payment Required',
	},
	{
		code: 403,
		message: '403 - Forbidden',
	},
	{
		code: 404,
		message: '404 - Not Found',
	},
	{
		code: 405,
		message: '405 - Method Not Allowed',
	},
	{
		code: 406,
		message: '406 - Not Acceptable',
	},
	{
		code: 407,
		message: '407 - Proxy Authentication Required',
	},
	{
		code: 408,
		message: '408 - Request Timeout',
	},
	{
		code: 409,
		message: '409 - Conflict',
	},
	{
		code: 410,
		message: '410 - Gone',
	},
	{
		code: 411,
		message: '411 - Length Required',
	},
	{
		code: 412,
		message: '412 - Precondition Failed',
	},
	{
		code: 413,
		message: '413 - Payload Too Large',
	},
	{
		code: 414,
		message: '414 - URI Too Long',
	},
	{
		code: 415,
		message: '415 - Unsupported Media Type',
	},
	{
		code: 416,
		message: '416 - Range Not Satisfiable',
	},
	{
		code: 417,
		message: '417 - Expectation Failed',
	},
	{
		code: 418,
		message: "418 - I'm a teapot",
	},
	{
		code: 421,
		message: '421 - Misdirected Request',
	},
	{
		code: 422,
		message: '422 - Unprocessable Entity',
	},
	{
		code: 423,
		message: '423 - Locked',
	},
	{
		code: 424,
		message: '424 - Failed Dependency',
	},
	{
		code: 425,
		message: '425 - Too Early',
	},
	{
		code: 426,
		message: '426 - Upgrade Required',
	},
	{
		code: 428,
		message: '428 - Precondition Required',
	},
	{
		code: 429,
		message: '429 - Too Many Requests',
	},
	{
		code: 431,
		message: '431 - Request Header Fields Too Large',
	},
	{
		code: 451,
		message: '451 - Unavailable For Legal Reasons',
	},
	{
		code: 500,
		message: '500 - Internal Server Error',
	},
	{
		code: 501,
		message: '501 - Not Implemented',
	},
	{
		code: 502,
		message: '502 - Bad Gateway',
	},
	{
		code: 503,
		message: '503 - Service Unavailable',
	},
	{
		code: 504,
		message: '504 - Gateway Timeout',
	},
	{
		code: 505,
		message: '505 - HTTP Version Not Supported',
	},
	{
		code: 506,
		message: '506 - Variant Also Negotiates',
	},
	{
		code: 507,
		message: '507 - Insufficient Storage',
	},
	{
		code: 508,
		message: '508 - Loop Detected',
	},
	{
		code: 510,
		message: '510 - Not Extended',
	},
	{
		code: 511,
		message: '511 - Network Authentication Required',
	},
];

export const statusCodesRecord: Record<string, string> = statusCodes.reduce(
	(acc, { code, message }) => {
		acc[code] = message;
		return acc;
	},
	{} as Record<string, string>,
);

export default statusCodes;
