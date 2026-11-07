#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/8a47d849d639356775ab67bfae0b8abf74b023e8ec1de71b0cc4d5f57882a338/contract';
import endContract from '../../snapshots/8a47d849d639356775ab67bfae0b8abf74b023e8ec1de71b0cc4d5f57882a338/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'job_skills',
        columns: [
          col('jobId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('relevance', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('skillId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['jobId', 'skillId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'jobs',
        columns: [
          col('annotations', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('application_date', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('company_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('job_link', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('kanban_status_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('metadata', 'jsonb', { notNull: true, codecRef: { codecId: 'pg/jsonb@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('rating', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'jobs_history',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('field', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('job_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('new_value', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('old_value', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'kanban_status',
        columns: [
          col('column_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('position', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'skills',
        columns: [
          col('annotations', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('group_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('rating', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'skills_group',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'skills_history',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('field', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('new_value', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('old_value', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('skill_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job_skills',
        index: 'job_skills_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job_skills',
        index: 'job_skills_skillId_idx_6e19993d',
        columns: ['skillId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobs',
        index: 'jobs_kanban_status_id_idx_1a7ae45c',
        columns: ['kanban_status_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobs_history',
        index: 'jobs_history_job_id_idx_58a5bbdd',
        columns: ['job_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'skills',
        index: 'skills_group_id_idx_704354b6',
        columns: ['group_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'skills_history',
        index: 'skills_history_skill_id_idx_676c8389',
        columns: ['skill_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'job_skills',
        foreignKey: {
          name: 'job_skills_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'jobs', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'job_skills',
        foreignKey: {
          name: 'job_skills_skillId_fkey',
          columns: ['skillId'],
          references: { schema: 'public', table: 'skills', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobs',
        foreignKey: {
          name: 'jobs_kanban_status_id_fkey',
          columns: ['kanban_status_id'],
          references: { schema: 'public', table: 'kanban_status', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobs_history',
        foreignKey: {
          name: 'jobs_history_job_id_fkey',
          columns: ['job_id'],
          references: { schema: 'public', table: 'jobs', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skills',
        foreignKey: {
          name: 'skills_group_id_fkey',
          columns: ['group_id'],
          references: { schema: 'public', table: 'skills_group', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skills_history',
        foreignKey: {
          name: 'skills_history_skill_id_fkey',
          columns: ['skill_id'],
          references: { schema: 'public', table: 'skills', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
