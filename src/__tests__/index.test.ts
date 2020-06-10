import { MoleculerDBGrapqlMixin } from '../index';

describe('obj', () => {
  const expectThis = MoleculerDBGrapqlMixin('foo', 'Foo', {});

  it('can instantiate', () => expect(expectThis).toBeInstanceOf(Object));
});
