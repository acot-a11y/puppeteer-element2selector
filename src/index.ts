import { ElementHandle } from 'puppeteer';
import { Options as FinderOptions } from '@medv/finder';
import fs from 'fs';
import path from 'path';

const code = fs.readFileSync(path.resolve(__dirname, 'bridge.js'));
const evaluator = eval(`(node, opts) => {
  ${code};
  return finder(node, opts);
}`);

export type Options = Partial<
  Omit<FinderOptions, 'root' | 'idName' | 'tagName' | 'attr'>
>;

export const element2selector = async (
  element: ElementHandle,
  options?: Options,
): Promise<string> => {
  const selector = await element.evaluate(evaluator, options as any);

  return selector as string;
};
