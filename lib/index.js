'use strict';

var root = typeof global !== 'undefined' ? global : window;



if (!root.__SYMBOL_PREFIX__) {
  if (process.env.NODE_ENV !== 'production') {
    root.__SYMBOL_PREFIX__ = Date.now().toString(36);
  } else {
    root.__SYMBOL_PREFIX__ = '0';
  }
}



var uSymbolFormat = /^usymbol-([a-zA-Z0-9_$]+)-([a-zA-Z0-9_$]+)$/;

var index = 0;


var saltCache = {};

var compileSalt = function (srcSalt) {
  srcSalt = String(srcSalt);

  if (saltCache[srcSalt] && saltCache.hasOwnProperty(srcSalt)) {
    return saltCache[srcSalt];
  }

  var salt = srcSalt.replace(/[^a-zA-Z0-9_$]+/g, '');

  if (process.env.NODE_ENV !== 'production') {
    if (!salt) {
      throw new Error('salt must be in correct format /^[a-zA-Z0-9_$]+$/');
    }
  }

  saltCache[srcSalt] = root.__SYMBOL_PREFIX__ + '$' + salt;

  return salt;
};



module.exports = function generateUSymbol (name, salt) {
  if (!salt && salt !== 0) {
    salt = root.__SYMBOL_PREFIX__ + '$' + String(++index);
  } else {
    salt = compileSalt(salt);
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!name) {
      throw new Error('symbol name is empty');
    }

    if (!/^[a-zA-Z0-9_$]+$/.test(name)) {
      throw new Error('symbol name "' + name + '" has invalid format');
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
