import { TemplateEngine } from './templateEngine';

describe('specifiaction tests', () => {
  test('function spec', () => {
    expect(TemplateEngine).toBeInstanceOf(Function);
    expect(new TemplateEngine()).toBeInstanceOf(TemplateEngine);
  });
});

describe('test replacing  placeholders', () => {
  let generator: TemplateEngine;
  const data: { NAME: string } = {
    NAME: `${Math.random()}`,
  };

  beforeEach(() => {
    generator = new TemplateEngine();
  });

  test('replace placeholders for object', () => {
    expect(generator.template('Hi, {{NAME}}', data)).toBe(`Hi, ${data.NAME}`);
    expect(generator.template('Hi, {{NAME}} {{SURNAME}}~', data)).toBe(
      `Hi, ${data.NAME} ~`
    );
    expect(generator.template('Hi, {{NAME}}. Your {{NAME}}', data)).toBe(
      `Hi, ${data.NAME}. Your ${data.NAME}`
    );
  });

  test('replace placeholders for object multiline', () => {
    expect(
      generator.template(
        'Hi, {{NAME}} \n simple text \n replace it {{NAME}}',
        data
      )
    ).toBe(`Hi, ${data.NAME} \n simple text \n replace it ${data.NAME}`);
  });
});

describe('test loop directive', () => {
  let generator: TemplateEngine;
  const data: { NAME: string; items: { item: number }[] } = {
    NAME: `${Math.random()}`,
    items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }],
  };

  beforeEach(() => {
    generator = new TemplateEngine();
  });

  test('replace placeholders for object', () => {
    expect(
      generator.template(
        'Hi, {{NAME}}. My favorite number:' +
          ' {{for items}}{{item}}{{end for}}',
        data
      )
    ).toBe(`Hi, ${data.NAME}. My favorite number: 1234`);
  });
});

describe('test condition rules', () => {
  let generator: TemplateEngine;
  const data: { NAME: string; items: { item: number }[] } = {
    NAME: `${Math.random()}`,
    items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }],
  };

  beforeEach(() => {
    generator = new TemplateEngine();
  });

  test('condition test render', () => {
    expect(
      generator.template('{{if NAME}}<h3>{{NAME}}</h3>{{end if}}', data)
    ).toBe(`<h3>${data.NAME}</h3>`);
  });
});

describe('test iteration  variables', () => {
  let generator: TemplateEngine;
  const data: { NAME: string; items: { item: number }[] } = {
    NAME: `${Math.random()}`,
    items: [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }],
  };

  beforeEach(() => {
    generator = new TemplateEngine();
  });

  test('for iter object', () => {
    expect(
      generator.template(
        'Hi, {{NAME}}. My favorite number {{for items}}' +
          '{{if isFirst}}[{{end if}}{{item}}{{if isLast}}]{{end if}}{{end for}}',
        data
      )
    ).toBe(`Hi, ${data.NAME}. My favorite number [1234]`);
  });

  test('for index for  iter', () => {
    expect(
      generator.template(
        'Hi, {{NAME}}. My favorite number {{for items}}' +
          '{{loop.index}} {{item}}\n{{end for}}',
        data
      )
    ).toBe(`Hi, ${data.NAME}. My favorite number 0 1\n1 2\n2 3\n3 4\n`);
  });
});
