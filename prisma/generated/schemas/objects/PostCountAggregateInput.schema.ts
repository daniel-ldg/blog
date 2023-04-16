import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    authorId: z.literal(true).optional(),
    url: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    title: z.literal(true).optional(),
    introduction: z.literal(true).optional(),
    conclusion: z.literal(true).optional(),
    keywords: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const PostCountAggregateInputObjectSchema = Schema;
