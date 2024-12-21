import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { DatabaseService } from '@/infra/database.service';
import {
  IFindAllPaginated,
  IPagination,
  IRepository,
} from '@/infra/interfaces/repository.interface';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistRepository implements IRepository<Artist> {
  constructor(private readonly db: DatabaseService) {}

  async create(
    entity: Omit<Artist, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Artist> {
    const query = `
        INSERT INTO
          artists(name, gender, user_id, dob, address, first_release_year, no_of_albums_released)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;

    const values = [
      entity.name,
      entity.gender,
      entity.user_id,
      entity.dob,
      entity.address,
      entity.first_release_year,
      entity.no_of_albums_released,
    ];

    const result = await this.db.query(query, values);

    return plainToClass(Artist, result[0]);
  }

  async findOne(id: number): Promise<Artist | null> {
    const query = `
        SELECT
          *
        FROM
          artists
        WHERE
          id = $1
      `;
    const values = [id];

    const result = await this.db.query(query, values);

    return result.length ? plainToClass(Artist, result[0]) : null;
  }

  async findAll(pagination: IPagination): Promise<IFindAllPaginated<Artist>> {
    const query = `
        SELECT
          *
        FROM
          artists
        LIMIT $1 OFFSET $2
      `;

    const values = [pagination.take, pagination.skip];

    const result = await this.db.query(query, values);

    return {
      data: result.map((item) => plainToClass(Artist, item)),
      total: await this.count(),
      count: result.length,
    };
  }

  async update(id: number, entity: Artist): Promise<Artist> {
    const query = `
        UPDATE
          artists
        SET
          name = $1, gender = $2, user_id = $3, dob = $4, address = $5, first_release_year = $6, no_of_albums_released = $7, updated_at = NOW()
        WHERE
          id = $8
        RETURNING *
    `;

    const values = [
      entity.name,
      entity.gender,
      entity.user_id,
      entity.dob,
      entity.address,
      entity.first_release_year,
      entity.no_of_albums_released,
      id,
    ];

    const result = await this.db.query(query, values);
    return plainToClass(Artist, result[0]);
  }

  async delete(id: number): Promise<void> {
    const query = `
        DELETE
        FROM
          artists
        WHERE
          id = $1
      `;
    const values = [id];

    await this.db.query(query, values);
  }

  async count(): Promise<number> {
    const query = `
        SELECT
          COUNT(*)
        FROM
          artists
      `;

    const result = await this.db.query<{ count: string }>(query);

    return parseInt(result[0].count, 10);
  }
}
