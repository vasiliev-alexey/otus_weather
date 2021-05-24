class IterOption {
  constructor(private upperBound: number) {
    this.isFirst = true;
    this.isLast = false;
    this.index = 0;
  }

  public increment(): void {
    this.isFirst = false;
    this.index = this.index + 1;
    this.isLast = this.upperBound - 1 === this.index;
  }

  public index: number;
  public isLast: boolean;
  public isFirst: boolean;
}

export class TemplateEngine {
  public template(tpl: string, data: Record<string, unknown>): string {
    return this.templateInternal(tpl, data);
  }

  private templateInternal(
    tpl: string,
    data: any,
    iterOption?: IterOption
  ): string {
    let resultString: string = tpl;

    resultString = resultString.replace(
      /{{for (\w+)}}((\s|\S)+){{end for}}/gm,
      (_, colName, internalTemplate) => {
        return colName in data
          ? data[colName]
              .map((el: any, ind: number, arr: RegExpMatchArray) => {
                if (iterOption === undefined) {
                  iterOption = new IterOption(arr.length);
                } else {
                  iterOption.increment();
                }
                return this.templateInternal(internalTemplate, el, iterOption);
              })
              .join('')
          : '';
      }
    );

    resultString = resultString.replace(/{{loop.index}}/g, () => {
      return iterOption?.index.toString() ?? '';
    });

    resultString = resultString.replace(
      /{{if (\w+)}}((s|\S)+){{end if}}/gm,
      (_, condToken: string, innerTemplate) => {
        let rez = '';

        if (iterOption !== undefined && condToken in iterOption) {
          if (eval('iterOption[condToken]')) {
            rez = this.templateInternal(innerTemplate, data);
          }
        }

        rez +=
          condToken in data && data[condToken] !== undefined
            ? this.templateInternal(innerTemplate, data)
            : '';
        return rez;
      }
    );
    resultString = resultString.replace(/{{(\w+)}}/gm, (_, token) => {
      return token in data ? data[token] : '';
    });

    return resultString;
  }
}
