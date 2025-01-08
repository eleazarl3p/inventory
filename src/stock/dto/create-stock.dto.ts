import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validate } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  item_id: number;

  @IsString()
  action: string;
}

@Injectable()
export class ValidateListStockDto implements PipeTransform {
  async transform(value: any) {
    if (!Array.isArray(value)) {
      throw new BadRequestException('Expected an array');
    }

    const stocks = value.map((stock) => plainToInstance(CreateStockDto, stock));

    const errors = await Promise.all(
      stocks.map(async (task) => await validate(task)),
    );

    if (this.errorsValidation(errors)) {
      throw new BadRequestException('Invalid data');
    }

    return stocks;
  }

  private errorsValidation(errors: any[]) {
    const errorL = errors
      .map((error, index) => (error.length ? { index, errors: error } : null))
      .filter(Boolean);

    return errorL.length;
  }
}
