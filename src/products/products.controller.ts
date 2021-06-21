import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  Res,
  HttpStatus
} from '@nestjs/common';

import { Product } from './interfaces/product.interface';

import { ProductDto } from './dto/product.dto';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Delete('delete/:productId')
  async deleteProduct(
    @Param('productId') productId: string,
    @Res() res
  ): Promise<Product> {
    return await this.productsService
      .deleteProduct(productId)
      .then(product => res.status(HttpStatus.OK).json(product))
      .catch(error => {
        console.error(error);
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: `Product with ID ${productId} was not found!`
        });
      });
  }

  @Get()
  async getProducts(@Res() res): Promise<Product[]> {
    const products = await this.productsService.getProducts();
    return res.status(HttpStatus.OK).json({ products });
  }

  @Get(':productId')
  async getProduct(
    @Param('productId') productId: string,
    @Res() res
  ): Promise<Product> {
    return await this.productsService
      .getProduct(productId)
      .then(product => res.status(HttpStatus.OK).json(product))
      .catch(error => {
        console.error(error);
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: `Product with ID ${productId} was not found!`
        });
      });
  }

  @Post('create')
  async createProduct(
    @Body() productDto: ProductDto,
    @Res() res
  ): Promise<Product> {
    const newProduct = await this.productsService.createProduct(productDto);
    return res.status(HttpStatus.OK).json({
      message: `Product ${newProduct.name} was saved successfully!`,
      newProduct
    });
  }

  @Put('update/:productId')
  async updateProduct(
    @Body() productDto: ProductDto,
    @Param('productId') productId: string
  ): Promise<Product> {
    return await this.productsService.updateProduct(productId, productDto);
  }
}
