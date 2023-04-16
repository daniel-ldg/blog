import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    prompt: z.literal(true).optional(),
    url: z.literal(true).optional(),
    name: z.literal(true).optional(),
    degree: z.literal(true).optional(),
    location: z.literal(true).optional(),
    bio: z.literal(true).optional(),
    picture: z.literal(true).optional(),
  })
  .strict();

export const AuthorMinAggregateInputObjectSchema = Schema;
