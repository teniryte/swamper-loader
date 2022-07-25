'use strict';

module.exports = source => {
  const className = source.split('export class ')[1].split(' ')[0];

  return `
    import registerPromiseWorker from 'promise-worker/register';

    class Worker {
      constructor(req) {
        this._req = req;
        this._method = req.method;
        this._args = req.args;
      }
    }

    ${source.replace(
      `export class ${className} `,
      `export class ${className} extends Worker `
    )}

    const onMessage = async content => {
      const req = JSON.parse(content);
      const worker = new ${className}(req);
      if (req.method === '_methodsNames') {
        return {
          success: true,
          result: Object
            .getOwnPropertyNames(${className}.prototype)
            .filter(name => !['constructor'].includes(name)),
        };
      }
      try {
        const res = await worker[req.method].apply(worker, req.args);
        return {
          success: true,
          result: res,
        };
      } catch(err) {
        return {
          success: false,
          error: err.message,
        };
      }
    };

    registerPromiseWorker(onMessage);
  `;
};
