
var usymbol = require('../index');

describe('usymbol', function () {
  it('should generate uniq symbol', function () {
    var s1 = usymbol('hello');
    var s2 = usymbol('hello');

    expect(s1).not.toEqual(s2);
  });

  it('should generate not uniq symbol', function () {
    var s1 = usymbol('hello', 'salt');
    var s2 = usymbol('hello', 'salt');

    expect(s1).toEqual(s2);
  });

  it('should generate symbol in special format', function () {
    var s1 = usymbol('hello', 'salt');

    expect(s1).toEqual('usymbol-salt-hello');
  });

  it('should parse name from symbol', function () {
    var s1 = usymbol('hello2', 'salt');

    expect(usymbol.parseNameFromUSymbol(s1)).toEqual('hello2');
  });

  it('should detect is it symbol', function () {
    var s1 = usymbol('hello', 'salt');

    expect(usymbol.isUSymbol(s1)).toBeTruthy();
    expect(usymbol.isUSymbol('usymbol-salt-hello')).toBeTruthy();
    expect(usymbol.isUSymbol('hello')).not.toBeTruthy();
  });
});
