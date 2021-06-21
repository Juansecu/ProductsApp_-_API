import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './interfaces/product.interface';

import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    return await new this.productModel(productDto).save();
  }

  async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<Product> {
    return await this.productModel
      .findByIdAndUpdate(id, productDto, {
        new: true,
        useFindAndModify: false
      })
      .then(product => product)
      .catch(error => error);
  }
}
