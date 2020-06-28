"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
Object.defineProperty(exports, "__esModule", { value: true });
var FieldGenerator = (function () {
  function FieldGenerator() {
    this._r1 = /\s/g;
    this._r2 = /[^\x00-\x7F]/g;
    this._u0 = /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g;
    this._u1 = /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g;
    this._u2 = /ì|í|ị|ỉ|ĩ/g;
    this._u3 = /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g;
    this._u4 = /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g;
    this._u5 = /ỳ|ý|ỵ|ỷ|ỹ/g;
    this._u6 = /đ/g;
    this._u7 = /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g;
    this._u8 = /-+-/g;
    this._u9 = /^\-+|\-+$/g;
    this.removeUniCode = this.removeUniCode.bind(this);
    this.getDateYYMMDD = this.getDateYYMMDD.bind(this);
    this.generate = this.generate.bind(this);
    this.array = this.array.bind(this);
  }
  FieldGenerator.prototype.removeUniCode = function (str) {
    str = str.toLowerCase();
    str = str.replace(this._u0, 'a');
    str = str.replace(this._u1, 'e');
    str = str.replace(this._u2, 'i');
    str = str.replace(this._u3, 'o');
    str = str.replace(this._u4, 'u');
    str = str.replace(this._u5, 'y');
    str = str.replace(this._u6, 'd');
    str = str.replace(this._u7, '-');
    str = str.replace(this._u8, '-');
    str = str.replace(this._u9, '');
    return str;
  };
  FieldGenerator.prototype.getDateYYMMDD = function () {
    var newDateString = new Date().toISOString().split('T')[0];
    newDateString = newDateString.replace(new RegExp('-', 'g'), '');
    return newDateString.substring(2, newDateString.length);
  };
  FieldGenerator.prototype.generate = function (name) {
    var newName = name.trim();
    newName = newName.replace(this._r1, '-');
    newName = this.removeUniCode(newName);
    newName = newName.replace(this._r2, '');
    return newName;
  };
  FieldGenerator.prototype.array = function (name) {
    var array = [];
    array[0] = name;
    for (var i = 1; i < 20; i++) {
      if (i <= 9) {
        array[i] = name + "-" + i;
      }
      else if (i === 10) {
        array[i] = name + "-" + this.getDateYYMMDD();
      }
      else if (i >= 11 && i < 20) {
        array[i] = name + "-" + this.getDateYYMMDD() + "-" + (i) % 10;
      }
    }
    return array;
  };
  return FieldGenerator;
}());
exports.FieldGenerator = FieldGenerator;
var DefaultUniqueValueBuilder = (function () {
  function DefaultUniqueValueBuilder(generator, loader, max, idGenerator) {
    this.generator = generator;
    this.loader = loader;
    this.max = max;
    this.idGenerator = idGenerator;
    this._r1 = /\s/g;
    this._r2 = new RegExp("'", 'g');
    this.build = this.build.bind(this);
    this.findNotIn = this.findNotIn.bind(this);
  }
  DefaultUniqueValueBuilder.prototype.build = function (model, name, ctx) {
    return __awaiter(this, void 0, void 0, function () {
      var finalUrlId, limitPreUrlId, limitPreUrlIdStr, preUrlId, array20ItemPattern, urlIds, urlIdNeed, randomId;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            finalUrlId = '';
            limitPreUrlId = model[name];
            limitPreUrlIdStr = limitPreUrlId.replace(this._r1, '');
            if (limitPreUrlIdStr.length === 0) {
              return [2, ''];
            }
            if (limitPreUrlIdStr.length > this.max) {
              limitPreUrlIdStr = limitPreUrlIdStr.substring(0, this.max);
            }
            preUrlId = this.generator.generate(limitPreUrlIdStr, ctx);
            array20ItemPattern = this.generator.array(preUrlId, ctx);
            return [4, this.loader.values(array20ItemPattern, ctx)];
          case 1:
            urlIds = _a.sent();
            if (array20ItemPattern.length === 0) {
              finalUrlId = preUrlId;
            }
            else {
              urlIdNeed = this.findNotIn(urlIds, array20ItemPattern);
              if (urlIdNeed === '') {
                randomId = this.idGenerator.generate(ctx);
                finalUrlId = preUrlId + '-' + randomId;
              }
              else {
                finalUrlId = urlIdNeed;
              }
            }
            return [2, finalUrlId];
        }
      });
    });
  };
  DefaultUniqueValueBuilder.prototype.findNotIn = function (all, itemsNotIn) {
    var result = '';
    for (var i = 0; i < itemsNotIn.length; i++) {
      var arrayItem = itemsNotIn[i].replace(this._r2, '');
      if (all.indexOf(arrayItem) < 0) {
        return itemsNotIn[i];
      }
    }
    return result;
  };
  return DefaultUniqueValueBuilder;
}());
exports.DefaultUniqueValueBuilder = DefaultUniqueValueBuilder;
