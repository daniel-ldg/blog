import { z } from 'zod';
import { AuthorCreateWithoutPostsInputObjectSchema } from './AuthorCreateWithoutPostsInput.schema';
import { AuthorUncheckedCreateWithoutPostsInputObjectSchema } from './AuthorUncheckedCreateWithoutPostsInput.schema';
import { AuthorCreateOrConnectWithoutPostsInputObjectSchema } from './AuthorCreateOrConnectWithoutPostsInput.schema';
import { AuthorUpsertWithoutPostsInputObjectSchema } from './AuthorUpsertWithoutPostsInput.schema';
import { AuthorWhereUniqueInputObjectSchema } from './AuthorWhereUniqueInput.schema';
import { AuthorUpdateWithoutPostsInputObjectSchema } from './AuthorUpdateWithoutPostsInput.schema';
import { AuthorUncheckedUpdateWithoutPostsInputObjectSchema } from './AuthorUncheckedUpdateWithoutPostsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorUpdateOneRequiredWithoutPostsNestedInput> =
  z
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
      upsert: z
        .lazy(() => AuthorUpsertWithoutPostsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => AuthorWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => AuthorUpdateWithoutPostsInputObjectSchema),
          z.lazy(() => AuthorUncheckedUpdateWithoutPostsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const AuthorUpdateOneRequiredWithoutPostsNestedInputObjectSchema =
  Schema;
