import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto, ValidateListStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body(new ValidateListStockDto()) stock: CreateStockDto) {
    return this.stockService.create(stock);
  }

  @Post('ticket/:id')
  async addMultipleStodk(
    @Param('id') ticket_id: number,
    @Body(new ValidateListStockDto()) stocks: CreateStockDto[],
  ) {
    return this.stockService.addMultipleStodk(ticket_id, stocks);
  }

  @Post('review')
  reviewStock(@Body(new ValidateListStockDto()) stocks: CreateStockDto[]) {
    this.stockService.reviewStock(stocks);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
