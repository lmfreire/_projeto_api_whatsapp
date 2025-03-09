import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MessageDTO } from './message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("order-placed")
  handlerOrderPlaced(@Payload() data: MessageDTO) {
    return this.appService.handlerOrderPlaced(data);
  }
}
