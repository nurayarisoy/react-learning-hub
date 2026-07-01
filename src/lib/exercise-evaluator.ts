import ts from "typescript";
import type { ExerciseValidationRule } from "@/types/learning";

interface ExerciseEvaluationResult {
  missingChecks: string[];
}

function traverse(node: ts.Node, visit: (current: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, (child) => traverse(child, visit));
}

function hasCallToIdentifier(sourceFile: ts.SourceFile, functionName: string): boolean {
  let found = false;

  traverse(sourceFile, (node) => {
    if (found) {
      return;
    }

    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      if (node.expression.text === functionName) {
        found = true;
      }
    }
  });

  return found;
}

function hasBinaryUpdateByOperator(node: ts.Node, operator: ts.SyntaxKind): boolean {
  let found = false;

  traverse(node, (current) => {
    if (found) {
      return;
    }

    if (!ts.isBinaryExpression(current)) {
      return;
    }

    if (current.operatorToken.kind !== operator) {
      return;
    }

    const right = current.right;

    if (ts.isNumericLiteral(right) && right.text === "1") {
      found = true;
    }
  });

  return found;
}

function hasSetterUpdateInNode(nodeRoot: ts.Node, setterName: string, direction: "inc" | "dec"): boolean {
  const operator = direction === "inc" ? ts.SyntaxKind.PlusToken : ts.SyntaxKind.MinusToken;
  let found = false;

  traverse(nodeRoot, (node) => {
    if (found) {
      return;
    }

    if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) {
      return;
    }

    if (node.expression.text !== setterName || node.arguments.length === 0) {
      return;
    }

    const argument = node.arguments[0];

    if (hasBinaryUpdateByOperator(argument, operator)) {
      found = true;
    }
  });

  return found;
}

function expressionHasSetterUpdate(
  expression: ts.Expression,
  setterName: string,
  direction: "inc" | "dec",
): boolean {
  if (ts.isArrowFunction(expression) || ts.isFunctionExpression(expression)) {
    return hasSetterUpdateInNode(expression.body, setterName, direction);
  }

  return hasSetterUpdateInNode(expression, setterName, direction);
}

function hasOnClickSetterUpdate(
  sourceFile: ts.SourceFile,
  setterName: string,
  direction: "inc" | "dec",
): boolean {
  let found = false;

  traverse(sourceFile, (node) => {
    if (found || !ts.isJsxAttribute(node)) {
      return;
    }

    const attributeName = ts.isIdentifier(node.name) ? node.name.text : node.name.name.text;

    if (attributeName !== "onClick") {
      return;
    }

    if (!node.initializer || !ts.isJsxExpression(node.initializer) || !node.initializer.expression) {
      return;
    }

    if (expressionHasSetterUpdate(node.initializer.expression, setterName, direction)) {
      found = true;
    }
  });

  return found;
}

function rulePasses(sourceFile: ts.SourceFile, rule: ExerciseValidationRule): boolean {
  if (rule.type === "usesHook") {
    return hasCallToIdentifier(sourceFile, rule.hookName);
  }

  if (rule.type === "callsFunction") {
    return hasCallToIdentifier(sourceFile, rule.functionName);
  }

  if (rule.type === "hasIncrementUpdate") {
    return hasSetterUpdateInNode(sourceFile, rule.setterName, "inc");
  }

  if (rule.type === "hasDecrementUpdate") {
    return hasSetterUpdateInNode(sourceFile, rule.setterName, "dec");
  }

  if (rule.type === "hasOnClickIncrement") {
    return hasOnClickSetterUpdate(sourceFile, rule.setterName, "inc");
  }

  return hasOnClickSetterUpdate(sourceFile, rule.setterName, "dec");
}

export function evaluateExerciseSolution(
  code: string,
  rules: ExerciseValidationRule[],
): ExerciseEvaluationResult {
  const sourceFile = ts.createSourceFile("exercise.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const missingChecks = rules
    .filter((rule) => !rulePasses(sourceFile, rule))
    .map((rule) => rule.label);

  return {
    missingChecks,
  };
}
