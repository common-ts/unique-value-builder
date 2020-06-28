export interface ValueGenerator<V> {
  generate(param?: any, ctx?: any): V;
}

export interface Generator<V> {
  generate(name: V, ctx?: any): V;
  array(name: V, ctx?: any): V[];
}
export interface Loader<V> {
  values(values: V[], ctx?: any): Promise<V[]>;
}
export interface UniqueValueBuilder<T, V> {
  build(model: T, name: string, ctx?: any): Promise<V>;
}

export class FieldGenerator implements Generator<string> {
  constructor() {
    this.removeUniCode = this.removeUniCode.bind(this);
    this.getDateYYMMDD = this.getDateYYMMDD.bind(this);
    this.generate = this.generate.bind(this);
    this.array = this.array.bind(this);
  }
  private _r1 = /\s/g;
  private _r2 = /[^\x00-\x7F]/g;
  private _u0 = /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g;
  private _u1 = /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g;
  private _u2 = /ì|í|ị|ỉ|ĩ/g;
  private _u3 = /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g;
  private _u4 = /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g;
  private _u5 = /ỳ|ý|ỵ|ỷ|ỹ/g;
  private _u6 = /đ/g;
  private _u7 = /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g;
  private _u8 = /-+-/g;
  private _u9 = /^\-+|\-+$/g;
  private removeUniCode(str: string): string {
    str = str.toLowerCase();
    str = str.replace(this._u0, 'a');
    str = str.replace(this._u1, 'e');
    str = str.replace(this._u2, 'i');
    str = str.replace(this._u3, 'o');
    str = str.replace(this._u4, 'u');
    str = str.replace(this._u5, 'y');
    str = str.replace(this._u6, 'd');
    str = str.replace(this._u7, '-');
    // Find and replace the special characters by -
    str = str.replace(this._u8, '-'); // Replace 2- to 1-
    str = str.replace(this._u9, '');
    // trim - at the beginning and the and of this string
    return str;
  }
  private getDateYYMMDD(): string { // format YYMMDD
    let newDateString = new Date().toISOString().split('T')[0];
    newDateString = newDateString.replace(new RegExp('-', 'g'), '');
    return newDateString.substring(2 , newDateString.length);
  }

  generate(name: string): string {
    let newName = name.trim();
    newName = newName.replace(this._r1, '-');
    newName = this.removeUniCode(newName);
    newName = newName.replace(this._r2, ''); // remove non-ascii character
    return newName;
  }
  array(name: string): string[] {
    const array = [];
    array[0] = name;
    for (let i = 1; i < 20; i++) {
      if (i <= 9) {
        array[i] = `${name}-${i}`;
      } else if (i === 10) {
        array[i] = `${name}-${this.getDateYYMMDD()}`;
      } else if (i >= 11 && i < 20) {
        array[i] = `${name}-${this.getDateYYMMDD()}-${(i) % 10}`;
      }
    }
    return array;
  }
}

export class DefaultUniqueValueBuilder<T> implements UniqueValueBuilder<T, string> {
  constructor(
    private generator: Generator<string>,
    private loader: Loader<string>,
    private max: number,
    private idGenerator: ValueGenerator<string>,
  ) {
    this.build = this.build.bind(this);
    this.findNotIn = this.findNotIn.bind(this);
  }
  private _r1 = /\s/g;
  private _r2 = new RegExp(`'`, 'g');

  async build(model: any, name: string, ctx?: any): Promise<string> {
    let finalUrlId = '';
    const limitPreUrlId = model[name];
    let limitPreUrlIdStr = limitPreUrlId.replace(this._r1, '');
    if (limitPreUrlIdStr.length === 0) {
      return '';
    }

    if (limitPreUrlIdStr.length > this.max) {
      limitPreUrlIdStr = limitPreUrlIdStr.substring(0, this.max);
    }

    const preUrlId = this.generator.generate(limitPreUrlIdStr, ctx);
    const array20ItemPattern = this.generator.array(preUrlId, ctx);
    const urlIds = await this.loader.values(array20ItemPattern, ctx);
    if (array20ItemPattern.length === 0) {
      finalUrlId = preUrlId;
    } else {
      const urlIdNeed = this.findNotIn(urlIds, array20ItemPattern);
      if (urlIdNeed === '') {
        const randomId = this.idGenerator.generate(ctx);
        finalUrlId = preUrlId + '-' + randomId;
      } else {
        finalUrlId = urlIdNeed;
      }
    }
    return finalUrlId;
  }
  private findNotIn(all: string[], itemsNotIn: string[]): string {
    const result = '';
    for (let i = 0; i < itemsNotIn.length; i++) {
      const arrayItem = itemsNotIn[i].replace(this._r2, '');
      if (all.indexOf(arrayItem) < 0 ) {
        return itemsNotIn[i];
      }
    }
    return result;
  }
}
