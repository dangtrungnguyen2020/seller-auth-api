import fs from 'fs'
import { Service } from 'typedi';

@Service()
export default class ProductServices {
    getAllProducts(): Array<any> {
        return JSON.parse(fs.readFileSync('../data/products.json', 'utf-8'));
    }
}