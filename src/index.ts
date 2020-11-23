import type { ElementHandle } from 'puppeteer';
import type { Options as FinderOptions } from '@medv/finder';
import fs from 'fs';
import path from 'path';

const code = fs.readFileSync(path.resolve(__dirname, 'bridge.js'));
const evaluator = eval(`(node, opts) => {
  ${code};
  try {
    const selector = finder(node, opts);
    return {
      error: null,
      selector,
    };
  } catch (e) {
    return {
      error: e.message,
      selector: null,
    };
  }
}`);

export type Options = Partial<
  Omit<FinderOptions, 'root' | 'idName' | 'tagName' | 'attr'>
>;

export const element2selector = async (
  element: ElementHandle,
  options?: Options,
): Promise<string> => {
  const result = (await element.evaluate(evaluator, options as any)) as
    | {
        error: string;
        selector: null;
      }
    | {
        error: null;
        selector: string;
      };

  if (result.error != null) {
    throw new Error(result.error);
  }

  return result.selector;
};
