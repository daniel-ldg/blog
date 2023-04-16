import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorCountOutputTypeSelect> = z
  .object({
    posts: z.boolean().optional(),
  })
  .strict();

export const AuthorCountOutputTypeSelectObjectSchema = Schema;
