import { Module } from '@nestjs/common';
import { UserActivityLogService } from './user-activity-log.service';
import { UserActivityLogController } from './user-activity-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityLog } from './entities/user-activity-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivityLog])],
  controllers: [UserActivityLogController],
  providers: [UserActivityLogService],
  exports: [UserActivityLogService],
})
export class UserActivityLogModule {}
