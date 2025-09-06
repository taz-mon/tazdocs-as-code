# Configuring a linter for your doc reviews

Linting your documentation ensures consistent style, catches common writing errors, and maintains professional quality across all your content. By automating these checks, you can focus on creating great content while the linters handle grammar, style guide compliance, and formatting consistency.

## Step 1: Install Vale (Linux)

```bash
# Install Vale using snap (as mentioned in the tutorial).
# This assumes that you have snap installed on your system.
# Vale's official docs recommend snap for Linux installations
sudo snap install vale
```

## Step 2: Install textlint (Linux)

```bash
# Install textlint globally
npm install -g textlint

# Install some useful textlint plugins
# Note that you will see some warnings. These are just npm being verbose
# About outdated dependencies in the ecosystem. It is safe to proceed.
npm install -g textlint-rule-preset-smarthr
npm install -g textlint-rule-preset-ja-technical-writing
npm install -g textlint-rule-common-misspellings
npm install -g textlint-rule-write-good
npm install -g textlint-rule-alex
```

## Step 3: Set up Vale

Create a folder for linter configurations from which your project will perform reviews to spot errors and make suggestions:
```bash
# Create the styles directory in your project root
cd ~/projects/tazdocs-as-code
mkdir lint-styles
```

Download style guide against which your project will use:
```bash 
# Download Microsoft style guide
wget https://github.com/errata-ai/Microsoft/releases/download/v0.14.2/Microsoft.zip
unzip Microsoft.zip -d styles/
rm Microsoft.zip
```

Create `.vale.ini` in your project root:
```bash
# Using VS Code, in your project root create the file
code .vale.ini
```

In the new file, copy this content:

```ini
StylesPath = styles
MinAlertLevel = suggestion

[*.md]
BasedOnStyles = Vale, Microsoft
```
After you save the changes, your Vale liunter is ready to review your content!

## Step 4: Set up textlint

Create `.textlintrc` in your project root:

```bash
# Using VS Code, in your project root create the file
code .textlintrc
```

Add this configuration:
```json
{
  "filters": {},
  "rules": {
    "common-misspellings": true,
    "write-good": {
      "passive": false,
      "illusion": true,
      "so": true,
      "thereIs": true,
      "weasel": true,
   C   "adverb": true,
      "tooWordy": true,
      "cliches": true
    },
    "alex": {
      "allow": []
    }
  }
}
```

## Step 5: Test both linters

```bash
# Test Vale
vale docs/intro.md
```

Follow the output if it finds errors. If the file is clean, you see:
```code
✔ 0 errors, 0 warnings and 0 suggestions in stdin.
```

# Test textlint
```bash
# Test textlint
textlint docs/intro.md
```

Follow the output if it finds errors. If the file is clean, it just returns the prompt.

## Step 6: Update your GitHub Actions workflow

This step assumes you completed the [Step 8: Set Up a Documentation Workflow Using GitHub Actions] 
section in your project where GitHub Actions looks for automation workflows.  In this case, edit `.github/workflows/vale-linter.yml` to include both linters so this file will run your both linters automatically when you push code to GitHub:

```yaml
name: Documentation Linting

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - '*'
  workflow_dispatch:

jobs:
  lint-docs:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install textlint
        run: |
          npm install -g textlint
          npm install -g textlint-rule-common-misspellings
          npm install -g textlint-rule-write-good
          npm install -g textlint-rule-alex

      - name: Run textlint
        run: textlint docs/**/*.md

      - name: Vale Lint
        uses: errata-ai/vale-action@reviewdog
        with:
          files: .
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Step 7: Add npm scripts (optional)

Add these to your `package.json`:
```json
{
  "scripts": {
    "lint:vale": "vale docs/",
    "lint:textlint": "textlint docs/**/*.md",
    "lint:all": "npm run lint:vale && npm run lint:textlint"
  }
}
```

Now you can run:
```bash
npm run lint:all
```