import { Authorized, Body, Controller, Get, Param, Put } from "routing-controllers";
import ProductServices from "../services/product.services";
import { Inject, Service } from "typedi";

@Service()
@Controller("/product")
export default class ProductController {
    constructor(@Inject() private readonly productService: ProductServices) {}

    @Get("/")
    getAllProducts(): Array<any> {
        return this.productService.getAllProducts();
    }

    @Put("/:id")
    @Authorized(["ADMIN"])
    editProduct(@Param("id") id: number, @Body() newData: any) {
        // let item = this.productService.getAllProducts();
        // data.find(item => item.id == id);
        console.log("editProduct", id, {newData});
        return true;
    }
}
