import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  //   @Cron('45 * * * * *')
  //   handleCron() {
  //     this.logger.debug('Called when the current second is 45');
  //   }
  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    this.logger.debug('Called every 5 seconds');
  }
}
