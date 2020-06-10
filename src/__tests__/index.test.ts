import { MoleculerDBGraphQLMixin } from '../index';

describe('obj', () => {
  const expectThis = MoleculerDBGraphQLMixin('foo', 'Foo', {});

  it('can instantiate', () => expect(expectThis).toBeInstanceOf(Object));
});
