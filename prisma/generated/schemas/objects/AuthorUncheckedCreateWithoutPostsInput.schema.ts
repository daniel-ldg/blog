import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorUncheckedCreateWithoutPostsInput> = z
  .object({
    id: z.string().optional(),
    prompt: z.string(),
    url: z.string(),
    name: z.string(),
    degree: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    picture: z.string(),
  })
  .strict();

export const AuthorUncheckedCreateWithoutPostsInputObjectSchema = Schema;
