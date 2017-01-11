'use strict';

var global = (function () { return this; })();



if (!global.__SYMBOL_PREFIX__) {
  if (process.env.NODE_ENV !== 'production') {
    global.__SYMBOL_PREFIX__ = Date.now().toString(36);
  } else {
    global.__SYMBOL_PREFIX__ = '0';
  }
}



var uSymbolFormat = /^usymbol-([a-zA-Z0-9_$]+)-([a-zA-Z0-9_$]+)$/;

var index = 0;



module.exports = function generateUSymbol (name, salt) {
  if (!salt && salt !== 0) {
    salt = global.__SYMBOL_PREFIX__ + '$' + String(++index);
  } else {
    salt = String(salt).replace(/[^a-zA-Z0-9_$]+/, '');

    if (process.env.NODE_ENV !== 'production') {
      if (!salt) {
        throw new Error('salt must be in correct format /^[a-zA-Z0-9_$]+$/');
      }
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!name) {
      throw new Error('symbol name is undefined');
    }

    if (!/^[a-zA-Z0-9_$]+$/.test(name)) {
      throw new Error('symbol name has invalid format');
    }
  }

  return 'usymbol-' + salt + '-' + name;
};



module.exports.default = module.exports;



module.exports.parseNameFromUSymbol = function parseUSymbol (uSymbol) {
  return uSymbol.replace(uSymbolFormat, '$2');
};



module.exports.isUSymbol = function isUSymbol (uSymbol) {
  return uSymbolFormat.test(uSymbol);
};
