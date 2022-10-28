import { initTRPC, TRPCError } from '@trpc/server';

// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.
const t = initTRPC.context().create()
;

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {

    return next({
      ctx: {
        // Infers the `session` as non-nullable
        session: ctx.session,
      },
    });
  });
  // Protected procedures for logged in users only
  export const protectedProcedure = t.procedure.use(isAuthed);