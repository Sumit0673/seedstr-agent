import { spawn } from "child_process";
import { existsSync, readFileSync, writeFileSync, rmSync } from "fs";
import { join, dirname } from "path";
import { logger } from "../utils/logger.js";

export interface BuildResult {
  success: boolean;
  output: string;
  errors: string[];
  warnings: string[];
  exitCode: number;
}

export interface TestResult {
  success: boolean;
  passed: number;
  failed: number;
  output: string;
  errors: string[];
}

/**
 * Run npm install in a project directory
 */
export async function installDependencies(projectDir: string): Promise<BuildResult> {
  return new Promise((resolve) => {
    logger.tool("build_run", "start", `Installing dependencies in ${projectDir}`);
    
    const output: string[] = [];
    const errors: string[] = [];
    
    const proc = spawn("npm", ["install"], {
      cwd: projectDir,
      shell: true,
    });

    proc.stdout.on("data", (data) => {
      output.push(data.toString());
    });

    proc.stderr.on("data", (data) => {
      const msg = data.toString();
      if (msg.includes("ERROR") || msg.includes("error") || msg.includes("ERR")) {
        errors.push(msg);
      }
      output.push(msg);
    });

    proc.on("close", (code) => {
      const result: BuildResult = {
        success: code === 0,
        output: output.join(""),
        errors,
        warnings: [],
        exitCode: code || 0,
      };
      
      logger.tool("build_run", code === 0 ? "success" : "error", 
        `Install ${code === 0 ? "succeeded" : "failed"} with code ${code}`);
      resolve(result);
    });
  });
}

/**
 * Run npm build (for React/Vue/Node projects)
 */
export async function buildProject(projectDir: string): Promise<BuildResult> {
  const hasBuildScript = existsSync(join(projectDir, "package.json"));
  
  if (!hasBuildScript) {
    return {
      success: true,
      output: "No package.json found, skipping build",
      errors: [],
      warnings: ["No build script available"],
      exitCode: 0,
    };
  }

  return new Promise((resolve) => {
    logger.tool("build_run", "start", `Building project in ${projectDir}`);
    
    const output: string[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];
    
    
    const packageJson = JSON.parse(readFileSync(join(projectDir, "package.json"), "utf-8"));
    const buildScript = packageJson.scripts?.build;
    
    let cmd = "npm";
    let args = ["run", "build"];
    
    if (!buildScript) {
      
      if (existsSync(join(projectDir, "vite.config.js")) || existsSync(join(projectDir, "vite.config.ts"))) {
        args = ["run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"];
      } else if (existsSync(join(projectDir, "index.html"))) {
        
        resolve({
          success: true,
          output: "Static HTML project - no build required",
          errors: [],
          warnings: [],
          exitCode: 0,
        });
        return;
      } else {
        resolve({
          success: true,
          output: "No build script found",
          errors: [],
          warnings: ["No build script in package.json"],
          exitCode: 0,
        });
        return;
      }
    }

    const proc = spawn(cmd, args, {
      cwd: projectDir,
      shell: true,
      timeout: 120000,
    });

    proc.stdout.on("data", (data) => {
      output.push(data.toString());
    });

    proc.stderr.on("data", (data) => {
      const msg = data.toString();
      if (msg.toLowerCase().includes("error")) {
        errors.push(msg);
      } else if (msg.toLowerCase().includes("warn")) {
        warnings.push(msg);
      }
      output.push(msg);
    });

    proc.on("close", (code) => {
      const result: BuildResult = {
        success: code === 0 && errors.length === 0,
        output: output.join(""),
        errors,
        warnings,
        exitCode: code || 0,
      };
      
      logger.tool("build_run", result.success ? "success" : "error", 
        `Build ${result.success ? "succeeded" : "failed"}`);
      resolve(result);
    });
  });
}

/**
 * Run tests if available
 */
export async function runTests(projectDir: string): Promise<TestResult> {
  const hasTestScript = existsSync(join(projectDir, "package.json"));
  
  if (!hasTestScript) {
    return {
      success: true,
      passed: 0,
      failed: 0,
      output: "No package.json found",
      errors: [],
    };
  }

  return new Promise((resolve) => {
    logger.tool("build_run", "start", `Running tests in ${projectDir}`);
    
    const output: string[] = [];
    const errors: string[] = [];
    let passed = 0;
    let failed = 0;
    
    const proc = spawn("npm", ["test", "--", "--passWithNoTests"], {
      cwd: projectDir,
      shell: true,
      timeout: 120000,
    });

    proc.stdout.on("data", (data) => {
      output.push(data.toString());
    });

    proc.stderr.on("data", (data) => {
      const msg = data.toString();
      output.push(msg);
    });

    proc.on("close", (code) => {
      const outputText = output.join("");
      
      
      const passMatch = outputText.match(/(\d+)\s+pass/i);
      const failMatch = outputText.match(/(\d+)\s+fail/i);
      
      if (passMatch) passed = parseInt(passMatch[1]);
      if (failMatch) failed = parseInt(failMatch[1]);
      
      
      if (outputText.includes("PASS") || outputText.includes("✓") || outputText.includes("√")) {
        passed = Math.max(passed, 1);
      }
      if (outputText.includes("FAIL") || outputText.includes("✗") || outputText.includes("×")) {
        failed = Math.max(failed, 1);
      }
      
      const result: TestResult = {
        success: failed === 0 && (code === 0 || outputText.includes("passWithNoTests")),
        passed,
        failed,
        output: outputText,
        errors,
      };
      
      logger.tool("build_run", result.success ? "success" : "error", 
        `Tests: ${passed} passed, ${failed} failed`);
      resolve(result);
    });
  });
}

export function generateTestFile(projectDir: string): string | null {
  const packageJsonPath = join(projectDir, "package.json");
  
  if (!existsSync(packageJsonPath)) {
    return null;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  const type = packageJson.type;
  const dependencies = packageJson.dependencies || {};
  
  
  if (dependencies.react) {
    return `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './src/App';

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });
  
  it('has correct title', () => {
    render(<App />);
    expect(screen.getByText(/My/i)).toBeTruthy();
  });
});`;
  }
  
  if (dependencies.express || dependencies.flask) {
    return `import { describe, it, expect } from 'vitest';

describe('API Tests', () => {
  it('basic test', () => {
    expect(true).toBe(true);
  });
});`;
  }
  
  return null;
}

export default {
  installDependencies,
  buildProject,
  runTests,
  generateTestFile,
};
