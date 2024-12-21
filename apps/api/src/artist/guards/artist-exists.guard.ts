import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

import { ArtistService } from '@/artist/artist.service';
import { IJwtPayload } from '@/auth/strategies/jwt.strategy';
import { Role } from '@/core/enums/db.enums';

@Injectable()
export class ArtistExistsGuard implements CanActivate {
  constructor(private readonly artistService: ArtistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<
      Request<{
        artistId: number;
      }> & {
        user: IJwtPayload['profile'];
      }
    >();

    const { artistId } = request.params;

    const artist = await this.artistService.getArtist(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    // Check if the authenticated user is the owner of the artist
    if (
      request.user.role === Role.Artist &&
      artist.user_id !== request.user.id
    ) {
      throw new NotFoundException();
    }

    return true;
  }
}
