import { Injectable } from '@nestjs/common';
import { MessageDTO } from './message.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class AppService {

  constructor(  
    private readonly httpService: HttpService
  ){}

  async handlerOrderPlaced(order: MessageDTO) {
    const url = `http://localhost:3000/weather/${order.message}`;
    // console.log(url); 

    try {
      const response = await firstValueFrom(
        this.httpService.get(url)
      );
      // console.log(response.data);
      const data = response.data;
      const dt = `Temperatura em ${order.message} é de ${data.temperature}\n
O vento está a ${data.wind} \n
O Clima está: ${data.description}`;

      if(data.temperature) {
        await this.EnviarMensagem(order.remoteJid, dt);
      }      
    } catch (error) {
      // console.log('aq');
      
      console.log(error.message);
    }
  }

  async EnviarMensagem(numero: string, mensagem: string) {
    const url = 'https://evolution-api.lemarq.inf.br/message/sendText/teste_whatsapp';

      const headers = {
        'Content-Type': 'application/json',
        'apikey': process.env.API_KEY, 
      };

      const data = {
        number: numero,
        text: mensagem,
      };

      try {
        const response = await firstValueFrom(
          this.httpService.post(url, data, { headers })
        );
      } catch (error) {
        // throw new Error(`Erro na requisição: ${error.message}`);
        console.log(error.message);
      }
      return;
  }
}
