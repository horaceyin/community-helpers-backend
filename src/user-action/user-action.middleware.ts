import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserHelpRequestActionUncheckedCreateInput } from 'src/@generated/user-help-request-action/user-help-request-action-unchecked-create.input';
import { UserHelpRequestActionService } from 'src/user-help-request-action/user-help-request-action.service';

@Injectable()
export class UserActionMiddleware implements NestMiddleware {
  constructor(
    private readonly userHelpRequestActionService: UserHelpRequestActionService
  ) {}
  use(req: any, res: any, next: () => void) { 

    if(req.cookies.user_action){

      console.log(req.cookies.user_action);

      let actions = JSON.parse(req.cookies.user_action)


      actions.forEach((action: { userid: number; helpRequestId: number; actionType: string; }) => {
        const data = new UserHelpRequestActionUncheckedCreateInput();
        data.userId = action.userid;
        data.helpRequestId = action.helpRequestId;
        data.actionType = action.actionType;

        this.userHelpRequestActionService.create(data)
  
        console.log("Created User Action")
      });

      next();
    }else{
      console.log("No user_action found")
      next();
    }
  }
}
