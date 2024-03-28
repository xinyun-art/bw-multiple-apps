'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');

class HttpRequest {
    config;
    instance;
    constructor(config) {
        this.config = config;
        this.instance = axios.create(config);
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }
    httpInterceptorsRequest() {
        // 创建实例时手动传入的自定义拦截器
        this.instance.interceptors.request.use(this.config.interceptorHooks?.requestInterceptor, this.config.interceptorHooks?.requestInterceptorCatch);
        // 所有实例共有的公共请求拦截器
        this.instance.interceptors.request.use((config) => {
            return config;
        }, async (error) => {
            return Promise.reject(error);
        });
    }
    httpInterceptorsResponse() {
        // 创建实例时手动传入的自定义拦截器
        this.instance.interceptors.response.use(this.config.interceptorHooks?.responseInterceptor, this.config.interceptorHooks?.responseInterceptorCatch);
        // 所有实例共有的公共响应拦截器
        this.instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            return Promise.reject(error);
        });
    }
}

var index = {
    HttpRequest
};

exports.HttpRequest = HttpRequest;
exports.default = index;
