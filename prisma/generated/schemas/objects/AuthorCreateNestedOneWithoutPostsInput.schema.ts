import { z } from 'zod';
import { AuthorCreateWithoutPostsInputObjectSchema } from './AuthorCreateWithoutPostsInput.schema';
import { AuthorUncheckedCreateWithoutPostsInputObjectSchema } from './AuthorUncheckedCreateWithoutPostsInput.schema';
import { AuthorCreateOrConnectWithoutPostsInputObjectSchema } from './AuthorCreateOrConnectWithoutPostsInput.schema';
import { AuthorWhereUniqueInputObjectSchema } from './AuthorWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorCreateNestedOneWithoutPostsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => AuthorCreateWithoutPostsInputObjectSchema),
        z.lazy(() => AuthorUncheckedCreateWithoutPostsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => AuthorCreateOrConnectWithoutPostsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => AuthorWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const AuthorCreateNestedOneWithoutPostsInputObjectSchema = Schema;
