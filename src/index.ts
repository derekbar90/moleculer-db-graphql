import { camelCase, pascalCase } from 'change-case';
import { ServiceSchema } from 'moleculer';

export const MoleculerDBGrapqlMixin = (model: string, typeName: string, entityModel: {}): ServiceSchema => {
  return {
    name: model,
    actions: {
      count: {
        params: {
          search: { type: 'string', optional: true },
          searchFields: { type: 'string', optional: true },
          query: {
            type: 'object',
            optional: true,
            props: entityModel,
          },
        },
        graphql: {
          query: `count${pascalCase(typeName)}s(search: String, searchFields: String, query: ${pascalCase(
            typeName
          )}Input): Int`,
        },
      },
      find: {
        params: {
          limit: { type: 'number' },
          offset: { type: 'number', optional: true },
          sort: { type: 'string', optional: true },
          search: { type: 'string', optional: true },
          searchFields: { type: 'string', optional: true },
          query: {
            type: 'object',
            props: entityModel,
          },
        },
        graphql: {
          query: `${camelCase(
            typeName
          )}s(limit: Int!, offset: Int, sort: String, search: String, searchFields: String, query: ${pascalCase(
            typeName
          )}Input): [${pascalCase(typeName)}]`,
        },
      },
      get: {
        graphql: {
          query: `${camelCase(typeName)}(id: String!): [${pascalCase(typeName)}]`,
        },
      },
      create: {
        params: {
          [camelCase(typeName)]: {
            type: 'object',
            strict: true,
            props: entityModel,
          },
        },
        graphql: {
          mutation: `new${pascalCase(typeName)}(${camelCase(typeName)}: ${pascalCase(typeName)}Input!): ${pascalCase(
            typeName
          )}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async handler(ctx: any): Promise<any> {
          // eslint-disable-next-line no-underscore-dangle
          const response = await this._create(ctx, ctx.params[camelCase(typeName)]);
          return response;
        },
      },
      insert: {
        params: {
          [camelCase(typeName)]: {
            type: 'array',
            min: 1,
            items: {
              type: 'object',
              strict: true,
              props: entityModel,
            },
          },
        },
        graphql: {
          mutation: `new${pascalCase(typeName)}s(${camelCase(typeName)}: [${pascalCase(typeName)}Input]): [${pascalCase(
            typeName
          )}]`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async handler(ctx: any): Promise<any> {
          const input = ctx.params[camelCase(typeName)];
          // eslint-disable-next-line no-underscore-dangle
          const response = await this._insert(ctx, {
            entities: input,
          });
          return response;
        },
      },
      update: {
        graphql: {
          mutation: `update${pascalCase(typeName)}(${camelCase(typeName)}: Update${pascalCase(
            typeName
          )}Input): ${pascalCase(typeName)}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async handler(ctx: any): Promise<any> {
          const input = ctx.params[camelCase(typeName)];
          // eslint-disable-next-line no-underscore-dangle
          const response = await this._update(ctx, {
            ...input,
          });
          return response;
        },
      },
      remove: {
        graphql: {
          mutation: `delete${pascalCase(typeName)}(id: String!): ${pascalCase(typeName)}`,
        },
      },
    },
  };
};

export default MoleculerDBGrapqlMixin;
