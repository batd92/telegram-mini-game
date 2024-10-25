import { Controller, Query, Req, UseGuards } from "@nestjs/common";
import { HasRoles } from "auth/guard/has-roles.decorator";
import { JwtAuthGuard } from "auth/guard/jwt-auth.guard";
import { RolesGuard } from "auth/guard/roles.guard";
import { Observable } from "rxjs";
import { RoleType } from "shared/enum/role-type.enum";
import { ReferralService } from "./referral.service";
import { ReferredUser } from "./dto/response.referral.dto";
@Controller('referral')
@UseGuards(JwtAuthGuard, RolesGuard)
@HasRoles(RoleType.USER)
export class ReferralController {

    constructor(private referralService: ReferralService) { }

    getReferralStats(@Req() req: any): Observable<{ data: ReferredUser[] }> {
        const user = req.user as { id: string };
        return this.referralService.getReferralStats(user.id);
    }
}