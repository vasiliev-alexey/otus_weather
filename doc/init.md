1. инициация репозитория

```sh
git init
```

Создаем gitignore

```
touch .gitignore
```

Добавляем в игнор node_modules

```sh
node_modules/
```

2. инициируем npm

```sh
npm init -y
```

3. Устанавливаем Jest

```
npm install jest @types/jest -D
```

Инициируем и настраиваем jest

```sh
npx jest --init
```

Добавляем jest - babel

```
npm i --dev babel-jest @babel/core @babel/core @babel/preset-env
```

4. Устанавливаем Eslint

```
npm i eslint -D
npx eslint --init
```

5. Устанавливаем Prettier

```
npm i prettier -D
```

Ставим eslint-config-prettier

```sh
npm eslint-config-prettier -D
```

Добавляем в package.json алиасы команд

```json
    "lint": "prettier --check . && eslint .",
    "lint:fix": "prettier --write . && eslint . --fix",
```

6. Устанавливаем Husky и lint-staged

```
npx mrm lint-staged
```

7. Активируем проверки на CI\CD

```sh
mkdir -p .github/workflows
```

Устанавливаем workflow GHA-Yaml

```sh
wget https://raw.githubusercontent.com/otus-js-student/js--game-of-life/master/.github/workflows/sanity-check.yml -o .github/workflows/sanity-check.yml
```
