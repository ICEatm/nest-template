import { Injectable, Logger, Inject } from '@nestjs/common';
import DefaultConfig from '@config/default.config';
import { ConfigType } from '@nestjs/config';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Service responsible for logging messages to a file.
 */
@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);
  private readonly appendFileAsync = promisify(fs.appendFile);
  private logsPath: string;

  /**
   * Constructs a new LoggerService instance.
   * @param defaultConfig - Configuration object injected via Nest.js dependency injection.
   */
  constructor(
    @Inject(DefaultConfig.KEY)
    private readonly defaultConfig: ConfigType<typeof DefaultConfig>,
  ) {
    this.logsPath = this.defaultConfig.paths.logsPath;
    this.initializeLogsFolder();
  }

  /**
   * Writes a log message to the log file asynchronously.
   * @param message - The message to be logged.
   * @returns A promise that resolves when the log message is written successfully, or rejects if an error occurs.
   */
  async writeLogToFile(message: string): Promise<void> {
    if (!this.logsPath) {
      this.logger.error('Log file path is not configured');
      return;
    }

    try {
      await this.appendFileAsync(
        path.join(this.logsPath, 'access.log'),
        `${message}\n`,
      );
    } catch (error) {
      this.logger.error(`Error writing log message to file: ${error}`);
    }
  }

  /**
   * Initializes the logs folder if it doesn't exist.
   * This method is called during service construction.
   * @returns A promise that resolves when the logs folder is initialized, or rejects if an error occurs.
   */
  private async initializeLogsFolder(): Promise<void> {
    try {
      if (!(await this.directoryExists(this.logsPath))) {
        await this.createDirectory(this.logsPath);
        this.logger.log(`Logs folder created at ${this.logsPath}`);
      }
    } catch (error) {
      this.logger.error(`Error creating logs folder: ${error}`);
    }
  }

  /**
   * Checks if a directory exists.
   * @param dirPath - The path to the directory.
   * @returns A promise that resolves with a boolean indicating whether the directory exists or not.
   */
  private directoryExists(dirPath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(dirPath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }

  /**
   * Creates a directory.
   * @param dirPath - The path to the directory to be created.
   * @returns A promise that resolves when the directory is created successfully, or rejects if an error occurs.
   */
  private createDirectory(dirPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(dirPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
