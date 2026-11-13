#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/35133accd10a6669271139c0f7b0855947136b2bb4f0fc9460e45927eea2e6d0/contract';
import endContract from '../../snapshots/35133accd10a6669271139c0f7b0855947136b2bb4f0fc9460e45927eea2e6d0/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/8a47d849d639356775ab67bfae0b8abf74b023e8ec1de71b0cc4d5f57882a338/contract';
import startContract from '../../snapshots/8a47d849d639356775ab67bfae0b8abf74b023e8ec1de71b0cc4d5f57882a338/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'job_skills',
        constraint: 'job_skills_jobId_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'job_skills',
        constraint: 'job_skills_skillId_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'jobs_history',
        constraint: 'jobs_history_job_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'skills_history',
        constraint: 'skills_history_skill_id_fkey',
        kind: 'foreignKey',
      }),
      this.dropNotNull({ schema: 'public', table: 'jobs', column: 'company_name' }),
      this.dropNotNull({ schema: 'public', table: 'jobs', column: 'email' }),
      this.dropNotNull({ schema: 'public', table: 'jobs', column: 'metadata' }),
      this.dropNotNull({ schema: 'public', table: 'jobs', column: 'phone' }),
      this.addForeignKey({
        schema: 'public',
        table: 'job_skills',
        foreignKey: {
          name: 'job_skills_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'jobs', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'job_skills',
        foreignKey: {
          name: 'job_skills_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'skills', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobs_history',
        foreignKey: {
          name: 'jobs_history_job_id_fkey',
          columns: ['job_id'],
          references: { schema: 'public', table: 'jobs', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skills_history',
        foreignKey: {
          name: 'skills_history_skill_id_fkey',
          columns: ['skill_id'],
          references: { schema: 'public', table: 'skills', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
