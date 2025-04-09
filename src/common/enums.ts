import { asEnum } from 'as-enum';

export const TestEnumOptions = asEnum([
  ['state1Key', 'state1Value', 'state1Label', { color: 'black' }],
  ['state1Key', 'state1Value', 'state1Label', { color: 'black' }],
] as const);
export type TTestEnum = typeof TestEnumOptions._strict_v_type;

export enum TestEnum {
  state1Key = 'state1Value',
  state2Key = 'state2Value',
}
