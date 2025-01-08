import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsArray, IsNumber, IsString, validate } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  barcode: string;

  @IsString()
  unit_of_measure: string;

  @IsNumber()
  min_quantity: number;

  @IsNumber()
  purchase_price: number;

  @IsNumber()
  sale_price: number;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsArray()
  photos: string[];
}

@Injectable()
export class ValidateListItemDto implements PipeTransform {
  async transform(value: any) {
    if (!Array.isArray(value)) {
      throw new BadRequestException('Expected an array');
    }

    const items = value.map((item) => plainToInstance(CreateItemDto, item));

    const errors = await Promise.all(
      items.map(async (itm) => await validate(itm)),
    );

    if (this.errorsValidation(errors)) {
      throw new BadRequestException('Invalid data');
    }

    return items;
  }

  private errorsValidation(errors: any[]) {
    const errorL = errors
      .map((error, index) => (error.length ? { index, errors: error } : null))
      .filter(Boolean);

    return errorL.length;
  }
}
