import { type } from "os"

export type applicationNames = string[]

export type applicationName = any[]

export type resourcesName = any[]

export type resourcesNames = string[]

export type resources = resourceDetail[]

export interface resourceDetail {
    "ConsumedQuantity": number,
    "Cost": number,
    "Date": string,
    "InstanceId": string,
    "MeterCategory": string,
    "ResourceGroup": string,
    "ResourceLocation": string,
    "Tags": {
        "app-name": string,
        "environment": string,
        "business-unit": string
    },
    "UnitOfMeasure": string,
    "Location": string,
    "ServiceName": string
}

export type resourceColumns = { 
    serviceName: string,
    consumedQuantity: string,
    cost: string,
    category: string,
    group: string,
    location: string,
    appName: string,
    unitOfMeasure: string
}