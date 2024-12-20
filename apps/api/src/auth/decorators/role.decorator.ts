import { SetMetadata } from '@nestjs/common';

import { Role } from '@/core/enums/db.enums';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
