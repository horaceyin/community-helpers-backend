import { Injectable } from '@nestjs/common';
import Expo from 'expo-server-sdk';
import { InjectExpo } from 'nestjs-expo-sdk';

@Injectable()
export class AppService {

  constructor(@InjectExpo() private expo: any) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendPush(somePushTokens: string[], title: string, body: string,): Promise<Boolean> {
    //console.log(somePushTokens)
    let messages = [];
    for (let pushToken of somePushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message
      messages.push({
        to: pushToken,
        sound: 'default',
        title: title,
        body: body,
        data: { withSome: 'data' },
      });
    }

    let chunks = this.expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
      try {
        let ticketChunk = await this.expo.sendPushNotificationsAsync(messages);
        console.log(ticketChunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation
      } catch (error) {
        console.error(error);

        return false
      }
    }
    return true;
  }
}
