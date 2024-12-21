import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/infra/database.service';
import {
  IFindAllPaginated,
  IPagination,
  IRepository,
} from '@/infra/interfaces/repository.interface';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Music } from './entities/music.entity';

@Injectable()
export class MusicRepository implements IRepository<Music> {
  constructor(private readonly db: DatabaseService) {}

  async create(
    entity: Omit<Music, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Music> {
    const sql = `
      INSERT INTO
        music (artist_id, title, genre, album_name)
      VALUES
        ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [
      entity.artist_id,
      entity.title,
      entity.genre,
      entity.album_name,
    ];

    const result = await this.db.query(sql, values);

    return plainToClass(Music, result[0]);
  }

  async findOne(id: number): Promise<Music> {
    const sql = `
      SELECT * FROM music WHERE id = $1
    `;
    const values = [id];

    const result = await this.db.query(sql, values);

    return plainToClass(Music, result[0]);
  }

  async findAll(pagination: IPagination): Promise<IFindAllPaginated<Music>> {
    const sql = `
      SELECT
        *
      FROM
        music
      LIMIT $1 OFFSET $2
    `;

    const values = [pagination.take, pagination.skip];

    const result = await this.db.query(sql, values);

    return {
      data: result.map((item) => plainToInstance(Music, item)),
      count: await this.count(),
      total: result.length,
    };
  }

  async findAllByArtistId(
    artistId: number,
    pagination: IPagination,
  ): Promise<IFindAllPaginated<Music>> {
    const sql = `
      SELECT
        *
      FROM
        music
      WHERE
        artist_id = $1
      LIMIT $2 OFFSET $3
    `;

    const values = [artistId, pagination.take, pagination.skip];

    const result = await this.db.query(sql, values);

    return {
      data: result.map((item) => plainToInstance(Music, item)),
      count: await this.countByArtistId(artistId),
      total: result.length,
    };
  }

  async update(id: number, entity: Music): Promise<Music> {
    const sql = `
      UPDATE music
       SET artist_id = $1, title = $2, genre = $3, album_name = $4, updated_at = NOW()
      WHERE
        id = $4
      RETURNING *
    `;

    const values = [
      entity.artist_id,
      entity.title,
      entity.genre,
      entity.album_name,
      id,
    ];

    const result = await this.db.query(sql, values);

    return plainToClass(Music, result[0]);
  }

  async delete(id: number): Promise<void> {
    const sql = `
      DELETE FROM music WHERE id = $1
    `;

    const values = [id];

    await this.db.query(sql, values);
  }

  async count(): Promise<number> {
    const sql = `
      SELECT COUNT(*) FROM music
    `;

    const result = await this.db.query<{ count: string }>(sql);

    return parseInt(result[0].count, 10);
  }

  async countByArtistId(artistId: number): Promise<number> {
    const sql = `
      SELECT COUNT(*) FROM music WHERE artist_id = $1
    `;

    const values = [artistId];

    const result = await this.db.query<{ count: string }>(sql, values);

    return parseInt(result[0].count, 10);
  }
}
