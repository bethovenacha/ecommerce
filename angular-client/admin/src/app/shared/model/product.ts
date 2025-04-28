import { ProductProperties } from "./productProperties";

export type Product = {
    id: String,
    name: String,
    description: String,
    properties: ProductProperties[]
}

