import { OmitType } from '@nestjs/swagger';
import { Music } from '../entities/music.entity';

export class MusicDto extends OmitType(Music, ['updated_at']) {}
