import { type AxiosInstance, type AxiosResponse, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
interface InterceptorHooks {
    requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
    responseInterceptorCatch?: (error: any) => any;
}
interface IRequestConfig extends AxiosRequestConfig {
    interceptorHooks: InterceptorHooks;
}
export declare class HttpRequest {
    config: IRequestConfig;
    instance: AxiosInstance;
    constructor(config: IRequestConfig);
    httpInterceptorsRequest(): void;
    httpInterceptorsResponse(): void;
}
export default HttpRequest;
//# sourceMappingURL=require.d.ts.map