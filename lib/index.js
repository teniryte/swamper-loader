'use strict';

module.exports = source => {
  const className = source.split('export default class ')[1].split(' ')[0];

  return `
    class EventEmitter {
      handlers = {};

      _on(name, handler, oneTime) {
        this.handlers[name] = this.handlers[name] || [];
        this.handlers[name].push({
          oneTime: !!oneTime,
          handler: handler,
        });
        return this;
      }

      _one(name, handler) {
        return this._on(name, handler, true);
      }

      _once(...args) {
        return this._one(...args);
      }

      _emit(name) {
        const args = Array.prototype.slice.call(arguments, 1),
          handlers = this.handlers[name] || [];
        handlers.forEach((ev, i) => {
          ev.handler.apply(this, args);
          if (ev.oneTime) {
            handlers.splice(i, 1);
          }
        });
        return this;
      }
    }

    class Worker extends EventEmitter {
      on (name, cb) {
        this._on(\`event:$\{name\}\`, (...args) => {
          cb(...args);
        });
      }

      emit(name, ...args) {
        this._emit('event', name, ...args);
      }

      async init() {}

      _getMethodsNames() {
        return Object
          .getOwnPropertyNames(${className}.prototype)
          .filter(name => !['constructor'].includes(name));
      }
    }

    ${source.replace(
      `export default class ${className} `,
      `export default class ${className} extends Worker `
    )}

    const worker = new ${className}();

    worker._on('event', (name, ...args) => {
      postMessage(JSON.stringify({
        type: 'event',
        name,
        args,
      }));
    });

    worker.on('rpc', async (req) => {
      try {
        const res = await worker[req.name].apply(worker, req.args);
        worker.emit('rpc', {
          success: true,
          rpcId: req.rpcId,
          result: res,
        });
      } catch(err) {
        worker.emit('rpc', {
          success: false,
          rpcId: req.rpcId,
          error: err.message,
        });
      }
    });

    worker.init();


    onmessage = function (event) {
      const req = JSON.parse(event.data);

      worker._req = req;

      if (req.type === 'event') {
        worker._emit(\`event:$\{req.name\}\`, ...req.args);
        return;
      }
    };
  `;
};
